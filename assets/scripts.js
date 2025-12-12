/**********************
 * GOOGLE ANALYTICS (FreePropertySG)
 **********************/

// Load Google Analytics library
const gaScript = document.createElement("script");
gaScript.async = true;
gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-XT4T2JTLW6";
document.head.appendChild(gaScript);

// Initialize Analytics after load
gaScript.onload = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }

  gtag('js', new Date());
  gtag('config', 'G-XT4T2JTLW6');
};
