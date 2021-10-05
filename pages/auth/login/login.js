const handleSubmit = (e) => {
  e.preventDefault();
  var data = new FormData();
  data.append("function", "loginUser");
  data.append("email", e.target.email.value);
  data.append("password", e.target.pwd.value);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const result = JSON.parse(this.responseText);
      if (result.success == true) {
        window.localStorage.setItem("loggedIn", "true");
        window.localStorage.setItem("userRole", result.userRole);
        window.localStorage.setItem("email", e.target.email.value);
        let timerInterval;
        Swal.fire({
          icon: "success",
          heightAuto: false,
          background: "#f5fdff",
          title: `<div style="font-size:23px">Logged in Successfully</div>`,
          showConfirmButton: false,
          timer: 1500,
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then(() => {
          window.location.href = "/Online-Pharmacy-Portal/index.html";
        });
      } else {
        Swal.fire({
          icon: "warning",
          heightAuto: false,
          background: "#f5fdff",
          title: `<div style="font-size:23px">${result.message}</div>`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  xmlhttp.open("POST", "login.php", true);
  xmlhttp.send(data);
};

const initialize = () => {
  AOS.init({ offset: 0, duration: 1000 });
  const form = document.getElementById("loginForm");
  form.addEventListener("submit", handleSubmit);
};

if (document.readyState !== "loading") {
  initialize();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initialize();
  });
}
