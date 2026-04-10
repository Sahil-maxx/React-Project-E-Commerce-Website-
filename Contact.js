const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // simple frontend validation
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formMsg.textContent = "Please fill in all fields.";
    formMsg.style.color = "red";
    return;
  }

  // simulate submission
  formMsg.textContent = "Thank you! Your message has been sent successfully.";
  formMsg.style.color = "green";

  // reset form
  form.reset();

  setTimeout(() => (formMsg.textContent = ""), 4000);
});
