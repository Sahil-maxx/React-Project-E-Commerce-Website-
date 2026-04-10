const readMoreLinks = document.querySelectorAll(".read-more");

readMoreLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    alert("This feature will soon open a full blog page!");
  });
});
