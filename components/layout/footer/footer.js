const renderFooterLinks = () => {
  const management = document.getElementById("managementLink");
  const userRole = window.localStorage.getItem("userRole");

  if (userRole == "Admin" || userRole == "Pharmacist") {
    management.innerHTML = "Management";
  }
};

const initFooter = () => {
  renderFooterLinks();
};

if (document.readyState !== "loading") {
  initFooter();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initFooter();
  });
}
