// Thumbnail image change functionality
const mainImage = document.getElementById("mainImage");
const thumbs = document.querySelectorAll(".thumb");

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    document.querySelector(".thumb.active").classList.remove("active");
    thumb.classList.add("active");
    mainImage.src = thumb.src;
  });
});

// Size selection
const sizeButtons = document.querySelectorAll(".size-btn");
sizeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".size-btn.active").classList.remove("active");
    btn.classList.add("active");
  });
});

// Color selection
const colorCircles = document.querySelectorAll(".color-circle");
colorCircles.forEach((circle) => {
  circle.addEventListener("click", () => {
    document.querySelector(".color-circle.active").classList.remove("active");
    circle.classList.add("active");
  });
});
