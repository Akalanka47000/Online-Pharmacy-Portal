function initMap() {
  const map = new google.maps.Map(document.getElementById("googleMap"), {
    center: { lat: 6.9128, lng: 79.8507 },
    zoom: 20,
  });
}

const handleSubmit = (e) => {
  e.preventDefault();
  let timerInterval;
  Swal.fire({
    icon: "success",
    heightAuto: false,
    background: "#f5fdff",
    title: `<div style="font-size:23px">Message sent successfully</div>`,
    showConfirmButton: false,
    timer: 1500,
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then(() => {
    const form = document.getElementById("contactForm");
    form.reset();
  });
};

const initialize = () => {
  AOS.init({ offset: 0, duration: 1000 });
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
