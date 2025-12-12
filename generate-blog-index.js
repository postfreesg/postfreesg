const fs = require("fs");

const BLOG_DIR = "./blog";
const INDEX_FILE = "./blog/index.html";

if (!fs.existsSync(BLOG_DIR)) {
  throw new Error("blog folder not found");
}

if (!fs.existsSync(INDEX_FILE)) {
  throw new Error("blog/index.html not found");
}

const html = fs.readFileSync(INDEX_FILE, "utf8");

const posts = fs.readdirSync(BLOG_DIR)
  .filter(f => f.endsWith(".html") && f !== "index.html")
  .sort();

const list = posts.map(file => {
  const slug = file.replace(".html", "");
  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());

  return `  <li><a href="https://postfreesg.com/blog/${file}">${title}</a></li>`;
}).join("\n");

const updated = html.replace(
  /<!-- BLOG-LIST-START -->[\s\S]*?<!-- BLOG-LIST-END -->/,
  `<!-- BLOG-LIST-START -->\n<ul class="blog-list">\n${list}\n</ul>\n<!-- BLOG-LIST-END -->`
);

fs.writeFileSync(INDEX_FILE, updated);
