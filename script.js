// =========================
// Navigation mobile
// =========================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  const isOpen = navLinks.classList.contains("active");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// Fermer le menu après sélection d'une section
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// =========================
// Formulaire de contact
// =========================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formMessage.textContent = "Merci de remplir tous les champs.";
    formMessage.style.color = "#ff4d00";
    return;
  }

  formMessage.textContent =
    "Merci ! Votre message a bien été préparé. Nous reviendrons vers vous rapidement.";
  formMessage.style.color = "#168a43";

  contactForm.reset();
});

// =========================
// Animation légère au scroll
// =========================

const revealElements = document.querySelectorAll(
  ".event-card, .gallery-item, .about-content, .contact-form"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealElements.forEach((element) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(25px)";
  element.style.transition =
    "opacity 0.7s ease, transform 0.7s cubic-bezier(.2,.8,.2,1)";

  revealObserver.observe(element);
});

// Ajouter les styles de révélation dynamiquement
const revealStyle = document.createElement("style");

revealStyle.textContent = `
  .is-visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;

document.head.appendChild(revealStyle);

// =========================
// Parallax très subtil des
// éléments abstraits du hero
// =========================

const hero = document.querySelector(".hero");
const brushes = document.querySelectorAll(".brush");

if (hero && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  hero.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;

    brushes.forEach((brush, index) => {
      const strength = (index + 1) * 3;

      brush.style.marginLeft = `${x * strength}px`;
      brush.style.marginTop = `${y * strength}px`;
    });
  });
}

// =========================
// Mise à jour de l'année
// =========================

const yearElements = document.querySelectorAll("[data-year]");

yearElements.forEach((element) => {
  element.textContent = new Date().getFullYear();
});
