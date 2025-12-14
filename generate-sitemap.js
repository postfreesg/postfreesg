const fs = require("fs");

const SITE_URL = "https://postfreesg.com";
const BLOG_DIR = "./blog";

function lastmod(path) {
  return fs.statSync(path).mtime.toISOString().split("T")[0];
}

function urlBlock(loc, priority, changefreq, lastmod) {
  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

let urls = [];

// === STATIC PAGES ===
urls.push(
  urlBlock(`${SITE_URL}/`, "1.0", "weekly", "2025-01-01"),
  urlBlock(`${SITE_URL}/about/`, "0.6", "monthly", "2025-01-01"),
  urlBlock(`${SITE_URL}/listings/`, "0.9", "daily", "2025-01-01"),
  urlBlock(`${SITE_URL}/blog/`, "0.7", "weekly", "2025-01-01"),
  urlBlock(`${SITE_URL}/contact/`, "0.5", "monthly", "2025-01-01")
);

// === BLOG POSTS ===
fs.readdirSync(BLOG_DIR).forEach(file => {
  if (file.endsWith(".html") && file !== "index.html") {
    const slug = file.replace(".html", "");
    const filePath = `${BLOG_DIR}/${file}`;
    urls.push(
      urlBlock(
        `${SITE_URL}/blog/${slug}`,
        "0.6",
        "monthly",
        lastmod(filePath)
      )
    );
  }
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>`;

fs.writeFileSync("sitemap.xml", sitemap);