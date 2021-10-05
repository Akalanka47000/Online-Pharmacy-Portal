function checkPassword() {
  if (
    document.getElementById("pwd").value !=
    document.getElementById("reenterpwd").value
  ) {
    Swal.fire({
      icon: "warning",
      title: '<div style="font-size: 23px">Password Mismatch</div>',
      timer: 1500,
      showConfirmButton: false,
      background: "#f5fdff",
    });
    return false;
  } else {
    return true;
  }
}

const handleSubmit = (e) => {
  e.preventDefault();
  const passwordsMatch = checkPassword();
  if (passwordsMatch) {
    var data = new FormData();
    data.append("function", "registerUser");
    data.append("email", e.target.email.value);
    data.append("username", e.target.username.value);
    data.append("address", e.target.address.value);
    data.append("password", e.target.pwd.value);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const result = JSON.parse(this.responseText);
        if (result.success == true) {
          window.localStorage.setItem("loggedIn", "true");
          window.localStorage.setItem("userRole", "User");
          window.localStorage.setItem("email", e.target.email.value);
          let timerInterval;
          Swal.fire({
            icon: "success",
            heightAuto: false,
            background: "#f5fdff",
            title: `<div style="font-size:23px">Account created Successfully</div>`,
            showConfirmButton: false,
            timer: 1500,
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then(() => {
            window.location.href = "/Online-Pharmacy-Portal/index.html";
          });
        } else {
          let errorMessage;
          if (result.message.includes("Duplicate entry")) {
            errorMessage = "A user with that email already exists";
          } else {
            errorMessage = result.message;
          }

          Swal.fire({
            icon: "warning",
            heightAuto: false,
            background: "#f5fdff",
            title: `<div style="font-size:23px">${errorMessage}</div>`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    };
    xmlhttp.open("POST", "register.php", true);
    xmlhttp.send(data);
  }
};

const initialize = () => {
  AOS.init({ offset: 0, duration: 1000 });
  const form = document.getElementById("registrationForm");
  form.addEventListener("submit", handleSubmit);
};

if (document.readyState !== "loading") {
  initialize();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initialize();
  });
}
