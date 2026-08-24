document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. MENU MOBILE ACCESSIBLE
     ========================================================================== */
  const menuToggle = document.querySelector('.menu-toggle');
  const primaryNav = document.getElementById('primary-nav');

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      primaryNav.classList.toggle('is-open');
    });

    // Fermeture lors du clic sur un lien
    primaryNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('is-open');
      });
    });
  }

  /* ==========================================================================
     2. GESTION DES TACHES ET ÉLÉMENTS COLORÉS (.color-mark)
     ========================================================================== */
  const colors = [
    'var(--blue)',
    'var(--green)',
    'var(--purple)',
    'var(--orange)',
    'var(--red)'
  ];

  const colorMarks = document.querySelectorAll('.color-mark');
  colorMarks.forEach((mark, index) => {
    const assignedColor = colors[index % colors.length];
    
    if (mark.tagName.toLowerCase() === 'path') {
      mark.style.fill = assignedColor;
    } else {
      mark.style.backgroundColor = assignedColor;
    }

    // Légère rotation aléatoire pour l'effet collage découpage
    const randomRotation = (Math.random() * 8 - 4).toFixed(1);
    mark.style.transform = `${mark.style.transform || ''} rotate(${randomRotation}deg)`;
  });

  /* ==========================================================================
     3. REVEAL AUTOMATIQUE AU SCROLL (INTERSECTION OBSERVER)
     ========================================================================== */
  const observerOptions = {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const targetsToAnimate = document.querySelectorAll(`
    .hero-type,
    .hero-signature,
    .program-intro,
    .program-card,
    .edition-card,
    .feature-card,
    .partner-list span,
    .contact-copy,
    .contact-form
  `);

  targetsToAnimate.forEach((el, index) => {
    el.classList.add('reveal');
    if (el.classList.contains('program-card') || el.classList.contains('edition-card')) {
      el.style.transitionDelay = `${(index % 3) * 0.12}s`;
    }
    revealObserver.observe(el);
  });

  /* ==========================================================================
     4. PARALLAXE SOURIS (HERO STROKES)
     ========================================================================== */
  const hero = document.querySelector('.hero');
  const heroStrokes = document.querySelectorAll('.brush-stroke');

  if (hero && window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      heroStrokes.forEach((stroke, i) => {
        const depth = (i + 1) * 0.015;
        const moveX = (clientX - centerX) * depth;
        const moveY = (clientY - centerY) * depth;
        stroke.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    });
  }

  /* ==========================================================================
     5. INTERACTION MINI-GALERIE D'ÉDITION AU SURVOL
     ========================================================================== */
  const editionCards = document.querySelectorAll('.edition-card');
  editionCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const memories = card.querySelectorAll('.memory');
      memories.forEach(mem => {
        const randomX = (Math.random() * 12 - 6).toFixed(1);
        const randomY = (Math.random() * 12 - 6).toFixed(1);
        mem.style.transform = `translate(${randomX}px, ${randomY}px) scale(1.1)`;
      });
    });

    card.addEventListener('mouseleave', () => {
      const memories = card.querySelectorAll('.memory');
      memories.forEach(mem => {
        mem.style.transform = 'none';
      });
    });
  });

  /* ==========================================================================
     6. FORMULAIRE DE CONTACT INTERACTIF
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = contactForm.querySelector('button');
      const originalText = btn.innerHTML;
      
      btn.disabled = true;
      btn.innerHTML = 'Envoi en cours...';

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        formMessage.style.color = 'var(--blue)';
        formMessage.textContent = 'Merci ! Votre message a bien été envoyé.';
        contactForm.reset();
      }, 1000);
    });
  }
});
