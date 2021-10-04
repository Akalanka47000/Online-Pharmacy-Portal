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
  const management = document.getElementById("btnManagement");
  const loggedIn = window.localStorage.getItem("loggedIn") == "true";
  const userRole = window.localStorage.getItem("userRole");
  if (loggedIn) {
    login.innerHTML =
      "<div class='button btnNav' onClick='logOut()'>Sign Out</div>";
  } else {
    login.innerHTML =
      "<a href='/Online-Pharmacy-Portal/pages/auth/login/login.html'><div class='button btnNav'>Log In</div></a>";
  }
  if (userRole == "Admin" || userRole == "Pharmacist") {
    management.innerHTML =
      '<a href="/Online-Pharmacy-Portal/pages/admin/users/users.html"> <div class="button btnNav">Management</div></a>';
  }
};

const logOut = () => {
  window.localStorage.setItem("loggedIn", "false");
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
