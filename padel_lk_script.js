const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

const WAITLIST_ENDPOINT = "https://script.google.com/macros/s/AKfycbx2oYWKkJxCuNvO3pnuXcnI-HYMjEUmlYOhnSEaZXoFUIpjCxmwZXMlDdtrPW7Bv6P1/exec";
const CONTACT_ENDPOINT = "https://script.google.com/macros/s/AKfycbxGJ3adt8pxhSR8U44_-hc3Reipdt8Xfspl88MSw7QCw8Ab522LvnDknxt319glNn2f/exec";

const waitlistForm = document.getElementById("waitlistForm");
const contactForm = document.getElementById("contactForm");

const setStatus = (form, message, state) => {
  const status = form.querySelector(".form-status");
  if (!status) return;
  status.textContent = message;
  status.dataset.state = state || "";
};

const submitForm = async (form, endpoint) => {
  if (!form || !endpoint || endpoint.startsWith("PASTE_")) return;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector("button[type='submit']");
    if (submitButton) submitButton.disabled = true;
    setStatus(form, "Submitting...", "loading");

    try {
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        body: new FormData(form),
      });

      setStatus(form, "Thanks! We'll be in touch soon.", "success");
      form.reset();
    } catch (error) {
      setStatus(form, "Something went wrong. Please try again.", "error");
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
};

submitForm(waitlistForm, WAITLIST_ENDPOINT);
submitForm(contactForm, CONTACT_ENDPOINT);

const revealItems = document.querySelectorAll(".reveal");
if (revealItems.length > 0 && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
