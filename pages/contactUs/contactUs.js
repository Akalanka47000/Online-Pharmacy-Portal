function initMap() {
  const map = new google.maps.Map(document.getElementById("googleMap"), {
    center: { lat: 6.9128, lng: 79.8507 },
    zoom: 20,
  });
}

const handleSubmit = (e) => {
  e.preventDefault();
  renderLoadingOverlay(true);
  var data = new FormData();
  data.append("name", e.target.name.value);
  data.append("email", e.target.email.value);
  data.append("message", e.target.message.value);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      renderLoadingOverlay(false);
      const result = JSON.parse(this.responseText);
      if (result.success == true) {
        let timerInterval;
        Swal.fire({
          icon: "success",
          heightAuto: false,
          background: "#f5fdff",
          title: `<div style="font-size:23px">${result.message}</div>`,
          showConfirmButton: false,
          timer: 1500,
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then(() => {
          const form = document.getElementById("contactForm");
          form.reset();
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
  xmlhttp.open("POST", "contactUs.php", true);
  xmlhttp.send(data);
};

const initialize = () => {
  AOS.init({ offset: 0, duration: 1000 });
  renderLoadingOverlay(false);
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", handleSubmit);
};

if (document.readyState !== "loading") {
  initialize();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initialize();
  });
}
