let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("googleMap"), {
    center: { lat: 6.9128, lng: 79.8507 },
    zoom: 20,
  });
}

const initialize = () => {
  AOS.init({ offset: 0, duration: 1000 });
};

if (document.readyState !== "loading") {
  initialize();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initialize();
  });
}
