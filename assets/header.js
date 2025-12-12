// Inject NAVIGATION HTML
document.addEventListener("DOMContentLoaded", () => {

  const navHTML = `
<nav class="navbar">
  <div class="nav-container">
    <a href="/" class="nav-logo">FreePropertySG</a>
    <span class="menu-toggle">☰</span>
    <ul class="nav-menu">
      <li><a href="/">HOME</a></li>
      <li><a href="/about">ABOUT</a></li>
      <li><a href="/listings">LISTINGS</a></li>
      <li><a href="/blog">BLOG</a></li>
      <li><a href="/contact">CONTACT</a></li>
    </ul>
  </div>
</nav>
  `;

  // Insert into page
  document.getElementById("site-nav").innerHTML = navHTML;

  /* ACTIVE LINK SCRIPT (with trailing slash fix) */
  const links = document.querySelectorAll(".nav-menu a");
  let current = window.location.pathname;

  // Normalize trailing slash except /
  if (current.length > 1 && current.endsWith("/")) {
    current = current.slice(0, -1);
  }

  links.forEach(link => {
    let href = link.getAttribute("href");

    // Normalize href too
    if (href.length > 1 && href.endsWith("/")) {
      href = href.slice(0, -1);
    }

    if (href === current) {
      link.classList.add("active");
    }
  });

  /* MOBILE MENU TOGGLE */
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-menu");
  if (toggle) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  }
});