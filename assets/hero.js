document.addEventListener("DOMContentLoaded", () => {
  const heroContainer = document.getElementById("hero"); 
  if (!heroContainer) return;

  heroContainer.innerHTML = `
    <header class="hero">
      <h1>Free Classified Listings in Singapore</h1>
      <p>Post anything for free — property, jobs, services, items for sale & more.</p>
      <p><strong>Email us to post your listing for free: info@postfreesg.com</strong></p>
    </header>
  `;
});
