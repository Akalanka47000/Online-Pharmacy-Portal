let open = false;

const toggleMobileNav = () => {
  open = !open;
  if (open) {
    document.getElementById("mobileNav").className = "mobileNavbar column";
  } else {
    document.getElementById("mobileNav").className =
      "mobileNavbar column navbarClosed";
  }
};

const renderNavbarButtons = () => {
  const login = document.getElementById("btnLogin");
  const loginMobile = document.getElementById("btnLoginMobile");

  const management = document.getElementById("btnManagement");
  const managementMobile = document.getElementById("btnManagementMobile");

  const loggedIn = window.localStorage.getItem("loggedIn") == "true";
  const userRole = window.localStorage.getItem("userRole");

  if (loggedIn) {
    login.innerHTML =
      "<div class='button btnNav' onClick='logOut()'>Sign Out</div>";

    loginMobile.innerHTML =
      '<div class="button btnMobile" onClick="logOut()">Sign Out</div>';
  } else {
    login.innerHTML =
      "<a href='/Online-Pharmacy-Portal/pages/auth/login/login.html'><div class='button btnNav'>Log In</div></a>";

    loginMobile.innerHTML =
      "<a href='/Online-Pharmacy-Portal/pages/auth/login/login.html'><div class='button btnMobile' >Log In</div></a>";
  }
  if (userRole == "Admin" || userRole == "Pharmacist") {
    management.innerHTML =
      '<a href="/Online-Pharmacy-Portal/pages/admin/users/users.html"> <div class="button btnNav">Management</div></a>';

    managementMobile.innerHTML =
      '<a href="/Online-Pharmacy-Portal/pages/admin/users/users.html"> <div class="button btnMobile">Management</div></a>';
  }
};

const logOut = () => {
  window.localStorage.clear();
  window.location.href = "/Online-Pharmacy-Portal/index.html";
};

const initNavbar = () => {
  renderNavbarButtons();
};

if (document.readyState !== "loading") {
  initNavbar();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initNavbar();
  });
}
