// Contact form validation
const form = document.getElementById("contactForm");
const success = document.getElementById("success");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const digitsOnly = /^\d+$/;

function showError(fieldId, errId, message) {
  const field = document.getElementById(fieldId);
  document.getElementById(errId).textContent = message;
  field.classList.toggle("invalid", message !== "");
  return message === "";
}

function validate() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  const results = [
    showError("name", "nameErr", name === "" ? "Enter your name." : ""),
    showError("email", "emailErr",
      email === "" ? "Enter your email address." :
      !emailPattern.test(email) ? "Enter a valid email, like name@example.com." : ""),
    showError("phone", "phoneErr",
      phone === "" ? "Enter your phone number." :
      !digitsOnly.test(phone) ? "Use digits only, with no spaces, dashes or + sign." : ""),
    showError("message", "messageErr", message === "" ? "Enter a message." : "")
  ];

  return results.every(Boolean);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  success.textContent = "";
  if (validate()) {
    success.textContent = "Message sent. Thank you for reaching out.";
    form.reset();
  }
});
