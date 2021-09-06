let index = 0;
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(showSlides, 4000);
});

function showSlides() {
  index++;
  document.getElementsByClassName(
    "slideshow"
  )[0].style.transform = `translateX(${index * -100}vw)`;
  if (index > 1) {
    index = -1;
  }
  setTimeout(showSlides, 4000);
}
