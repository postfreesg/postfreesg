const fs = require("fs");
const path = require("path");

const SITE_URL = "https://postfreesg.com";
const BLOG_DIR = "./blog";

// Get last modified date of a file (YYYY-MM-DD)
function getLastMod(filePath) {
  const stats = fs.statSync(filePath);
  return stats.mtime.toISOString().split("T")[0];
}

// Generate sitemap <url> block
function urlBlock(loc, lastmod, priority, changefreq) {
  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

let urls = [];

/* =========================
   STATIC PAGES
   ========================= */

// Map URL → actual file path
const staticPages = [
  { url: "/", file: "./index.html", priority: "1.0", freq: "weekly" },
  { url: "/about/", file: "./about.html", priority: "0.6", freq: "monthly" },
  { url: "/listings/", file: "./listings.html", priority: "0.9", freq: "daily" },
  { url: "/blog/", file: "./blog/index.html", priority: "0.7", freq: "weekly" },
  { url: "/contact/", file: "./contact.html", priority: "0.5", freq: "monthly" }
];

staticPages.forEach(page => {
  if (fs.existsSync(page.file)) {
    urls.push(
      urlBlock(
        `${SITE_URL}${page.url}`,
        getLastMod(page.file),
        page.priority,
        page.freq
      )
    );
  }
});

/* =========================
   BLOG POSTS
   ========================= */

fs.readdirSync(BLOG_DIR).forEach(file => {
  if (file.endsWith(".html") && file !== "index.html") {
    const slug = file.replace(".html", "");
    const filePath = path.join(BLOG_DIR, file);

    urls.push(
      urlBlock(
        `${SITE_URL}/blog/${slug}`,
        getLastMod(filePath),
        "0.6",
        "monthly"
      )
    );
  }
});

/* =========================
   WRITE SITEMAP
   ========================= */

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>`;

fs.writeFileSync("sitemap.xml", sitemap, "utf8");

console.log("✅ sitemap.xml generated successfully");
