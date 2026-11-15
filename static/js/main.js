// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
}

// FAQ accordion
document.querySelectorAll(".faq-q").forEach((btn) => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    const open = answer.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
});

// Contact form: client-side validation + submit to Flask API
const form = document.getElementById("leadForm");
if (form) {
  const status = document.getElementById("formStatus");
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  const setError = (field, text) => {
    form.querySelector(`[data-error-for="${field}"]`).textContent = text;
  };

  const validate = (data) => {
    const errors = {};
    if (data.name.length < 2) errors.name = "Please enter your name.";
    if (!emailPattern.test(data.email)) errors.email = "Please enter a valid email.";
    if (data.message.length < 5) errors.message = "Message must be at least 5 characters.";
    return errors;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "";
    status.className = "status";

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    ["name", "email", "message"].forEach((f) => setError(f, ""));
    const errors = validate(data);
    if (Object.keys(errors).length) {
      Object.entries(errors).forEach(([f, t]) => setError(f, t));
      return;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        status.textContent = result.message;
        status.classList.add("ok");
        form.reset();
      } else {
        if (result.errors) Object.entries(result.errors).forEach(([f, t]) => setError(f, t));
        status.textContent = result.error || "Please fix the errors above.";
        status.classList.add("fail");
      }
    } catch (err) {
      status.textContent = "Network error. Please try again.";
      status.classList.add("fail");
    }
  });
}
