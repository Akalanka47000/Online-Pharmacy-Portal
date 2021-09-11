if (document.readyState !== "loading") {
    initialize();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      initialize();
    });
  }
  