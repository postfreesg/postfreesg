document.addEventListener("DOMContentLoaded", () => {

  const footerHTML = `
<footer style="text-align:center; font-size:0.9rem;">
  <p style="margin:0.2rem 0;">
    © <span id="copyYear"></span> FreePropertySG — Singapore’s Free Property Portal 
  </p>
  
  <p style="margin:0.2rem 0;">
    <em id="lastUpdated"></em>

    <script data-exec>
    (function() {
      const now = new Date();
      const year = now.getFullYear();

      const copyEl = document.getElementById("copyYear");
      const siteEl = document.getElementById("siteYear");
      if (copyEl) copyEl.textContent = year;
      if (siteEl) siteEl.textContent = year;

      const day = now.getDate();
      const months = [
        "January","February","March","April","May","June","July",
        "August","September","October","November","December"
      ];
      const formattedDate = \`\${day} \${months[now.getMonth()]} \${year}\`;

      const updatedEl = document.getElementById("lastUpdated");
      if (updatedEl) updatedEl.textContent = \`Last updated: \${formattedDate}\`;
    })();
    </script>

    <img alt="" style="display:none"
      src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
      onload="document.querySelectorAll('script[data-exec]:not([data-ran])').forEach(s=>{
        let n=document.createElement('script');
        n.text=s.textContent;
        document.body.appendChild(n);
        s.dataset.ran=1;
      });">
  </p>
</footer>
  `;

  document.getElementById("site-footer").innerHTML = footerHTML;

});
