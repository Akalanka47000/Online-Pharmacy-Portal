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
