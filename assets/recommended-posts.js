document.addEventListener("DOMContentLoaded", () => {

  // Only activate on blog post pages
  if (!window.location.pathname.startsWith("/blog/")) return;

  /* ---------------------------------------
     1. Inject CSS dynamically
  ---------------------------------------- */
  const css = `
    .recommended-posts-section {
      margin-top: 2rem;
      margin-bottom: 2rem;
      padding: 0 !important;
    }
    .recommended-posts-section h2 {
      font-size: 1.6rem;
      margin-bottom: 1rem;
      margin-top: 0;
      color: #212529;
      font-weight: 700;
    }
    .recommended-posts-container {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
    .reco-post-link {
      text-decoration: none;
      color: #000;
      padding: 0.2rem 0;
      display: block;
      transition: color 0.2s ease;
    }
    .reco-post-link:hover {
      color: #ff6a00;
    }
  `;

  const styleTag = document.createElement("style");
  styleTag.textContent = css;
  document.head.appendChild(styleTag);

  /* ---------------------------------------
     2. Build Recommended Posts HTML
  ---------------------------------------- */
  const recommendedHTML = `
    <section class="recommended-posts-section">
      <h2>Recommended Posts</h2>
      <div id="recommendedContainer" class="recommended-posts-container"></div>
    </section>
  `;

  /* ---------------------------------------
     3. Insert inside placeholder if exists
  ---------------------------------------- */
  const placeholder = document.getElementById("recommended-posts");

  if (placeholder) {
    placeholder.insertAdjacentHTML("beforeend", recommendedHTML);
  } else {
    const footer = document.querySelector("#site-footer");
    if (footer) {
      footer.insertAdjacentHTML("beforebegin", recommendedHTML);
    } else {
      document.body.insertAdjacentHTML("beforeend", recommendedHTML);
    }
  }

  /* ---------------------------------------
     4. Fetch blog index & auto-generate list
  ---------------------------------------- */
  (async function () {
    try {
      // FIXED — fetch from the correct domain
      const res = await fetch("https://freepropertysg.com/blog/");
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");

      // Extract blog links
      const posts = [...doc.querySelectorAll("a[href^='/blog/']")].map(a => ({
        title: a.textContent.trim(),
        url: ("https://freepropertysg.com" + a.getAttribute("href")).replace(/\/$/, "")
      }));

      const currentURL = window.location.href.replace(/\/$/, "");

      // Remove current page + duplicates
      const unique = posts
        .filter(p => p.url !== currentURL)
        .filter((v, i, self) => i === self.findIndex(t => t.url === v.url));

      // Select 3 random recommended posts
      const selected = unique.sort(() => Math.random() - 0.5).slice(0, 3);

      const box = document.getElementById("recommendedContainer");
      if (!box) return;

      selected.forEach(post => {
        box.insertAdjacentHTML(
          "beforeend",
          `<a href="${post.url}" class="reco-post-link">${post.title}</a>`
        );
      });

    } catch (err) {
      console.error("Recommended Posts Error:", err);
    }
  })();

});
