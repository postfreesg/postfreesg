document.addEventListener("DOMContentLoaded", () => {
  const heroContainer = document.getElementById("hero"); // <-- FIXED
  if (!heroContainer) return;

  heroContainer.innerHTML = `
    <header class="hero">
      <h1>Free Property Listings in Singapore</h1>
      <p>Browse free HDB, Condo, and Landed listings — no agent fees, no listing fees.</p>
      <p><strong>Email us to list your property for free: info@freepropertysg.com</strong></p>
    </header>
  `;
});
