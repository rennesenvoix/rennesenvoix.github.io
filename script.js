document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================
     CONFIGURATION
  ========================================================== */

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const hasFinePointer = window.matchMedia(
    "(pointer: fine)"
  ).matches;


  /* ==========================================================
     MENU MOBILE
  ========================================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      const isOpen =
        navLinks.classList.toggle("active");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });


    document.querySelectorAll(
      ".nav-links a"
    ).forEach((link) => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* ==========================================================
     APPARITION DES ÉLÉMENTS AU SCROLL
  ========================================================== */

  const revealElements = document.querySelectorAll(
    ".event-card, " +
    ".gallery-item, " +
    ".about-content, " +
    ".about-art, " +
    ".contact-form, " +
    ".section-heading"
  );


  if (!prefersReducedMotion && revealElements.length) {

    const revealStyle =
      document.createElement("style");

    revealStyle.textContent = `

      .scroll-reveal {
        opacity: 0;
        transform: translateY(35px);
        transition:
          opacity .8s ease,
          transform .9s cubic-bezier(.2,.8,.2,1);
      }

      .scroll-reveal.is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      .event-card.scroll-reveal:nth-child(2) {
        transition-delay: .08s;
      }

      .event-card.scroll-reveal:nth-child(3) {
        transition-delay: .16s;
      }

      .gallery-item.scroll-reveal:nth-child(2) {
        transition-delay: .05s;
      }

      .gallery-item.scroll-reveal:nth-child(3) {
        transition-delay: .1s;
      }

      .gallery-item.scroll-reveal:nth-child(4) {
        transition-delay: .15s;
      }

      .gallery-item.scroll-reveal:nth-child(5) {
        transition-delay: .2s;
      }

      .gallery-item.scroll-reveal:nth-child(6) {
        transition-delay: .25s;
      }

      .gallery-item.scroll-reveal:nth-child(7) {
        transition-delay: .3s;
      }

      .gallery-item.scroll-reveal:nth-child(8) {
        transition-delay: .35s;
      }

    `;

    document.head.appendChild(
      revealStyle
    );


    revealElements.forEach((element) => {

      element.classList.add(
        "scroll-reveal"
      );

    });


    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -50px 0px"
        }
      );


    revealElements.forEach((element) => {

      revealObserver.observe(
        element
      );

    });

  } else {

    revealElements.forEach((element) => {

      element.classList.add(
        "is-visible"
      );

    });

  }


  /* ==========================================================
     SI PAS DE SOURIS FINE :
     ON ARRÊTE ICI POUR ÉVITER DES EFFETS INUTILES
  ========================================================== */

  if (!hasFinePointer || prefersReducedMotion) {
    return;
  }


  /* ==========================================================
     HERO
  ========================================================== */

  const hero =
    document.querySelector(".hero");

  const heroContent =
    document.querySelector(".hero-content");


  /* ==========================================================
     TRAITS DE PINCEAU ET TRAITS DE CRAYON
  ========================================================== */

  const brushStrokes =
    document.querySelectorAll(
      ".hero-strokes .brush-stroke"
    );

  const pencilLines =
    document.querySelectorAll(
      ".hero-strokes .pencil-line"
    );


  /*
   * Chaque trait dispose de sa propre amplitude.
   *
   * Plus l'amplitude est grande,
   * plus le trait suit le mouvement de la souris.
   */

  const brushAmplitudes = [
    48,
    25,
    36,
    62,
    30,
    54,
    72,
    22
  ];


  const brushDirections = [
    { x: -1, y: 1 },
    { x: 1, y: -0.7 },
    { x: -0.7, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: -0.5 },
    { x: 0.8, y: 1 },
    { x: -0.6, y: 1 },
    { x: 1, y: -1 }
  ];


  const strokeObjects = [];


  brushStrokes.forEach(
    (element, index) => {

      strokeObjects.push({

        element,

        x: 0,
        y: 0,

        targetX: 0,
        targetY: 0,

        amplitude:
          brushAmplitudes[index] || 35,

        direction:
          brushDirections[index] || {
            x: 1,
            y: 1
          },

        /*
         * Chaque élément possède une inertie différente.
         */

        easing:
          0.025 +
          Math.random() * 0.025

      });

    }
  );


  /*
   * Les traits de crayon sont plus discrets.
   */

  const pencilAmplitudes = [
    18,
    12,
    26
  ];


  const pencilDirections = [
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: 0.7, y: -1 }
  ];


  pencilLines.forEach(
    (element, index) => {

      strokeObjects.push({

        element,

        x: 0,
        y: 0,

        targetX: 0,
        targetY: 0,

        amplitude:
          pencilAmplitudes[index] || 15,

        direction:
          pencilDirections[index] || {
            x: 1,
            y: 1
          },

        easing:
          0.018 +
          Math.random() * 0.012

      });

    }
  );


  /*
   * Position actuelle du curseur
   * dans le hero.
   */

  let heroMouseX = 0;
  let heroMouseY = 0;


  /*
   * Position globale de la souris.
   * Utilisée par les autres effets.
   */

  let globalMouseX =
    window.innerWidth / 2;

  let globalMouseY =
    window.innerHeight / 2;


  /* ==========================================================
     MOUVEMENT DES TRAITS
  ========================================================== */

  if (hero) {

    hero.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          hero.getBoundingClientRect();


        /*
         * Coordonnées normalisées :
         *
         * gauche = -0.5
         * centre = 0
         * droite = +0.5
         */

        heroMouseX =
          (event.clientX - rect.left) /
          rect.width -
          0.5;


        heroMouseY =
          (event.clientY - rect.top) /
          rect.height -
          0.5;


        strokeObjects.forEach(
          (stroke) => {

            stroke.targetX =
              heroMouseX *
              stroke.amplitude *
              stroke.direction.x;


            stroke.targetY =
              heroMouseY *
              stroke.amplitude *
              stroke.direction.y;

          }
        );

      }
    );


    /*
     * Lorsque la souris quitte le hero,
     * les traits reviennent doucement
     * vers leur position originale.
     */

    hero.addEventListener(
      "mouseleave",
      () => {

        heroMouseX = 0;
        heroMouseY = 0;


        strokeObjects.forEach(
          (stroke) => {

            stroke.targetX = 0;
            stroke.targetY = 0;

          }
        );

      }
    );

  }


  /* ==========================================================
     PARALLAXE DU CONTENU HERO
  ========================================================== */

  let contentX = 0;
  let contentY = 0;

  let contentTargetX = 0;
  let contentTargetY = 0;


  if (hero && heroContent) {

    hero.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          hero.getBoundingClientRect();


        const x =
          (event.clientX - rect.left) /
          rect.width -
          0.5;


        const y =
          (event.clientY - rect.top) /
          rect.height -
          0.5;


        /*
         * Le contenu se déplace légèrement
         * dans le sens inverse des pinceaux.
         */

        contentTargetX =
          x * -7;


        contentTargetY =
          y * -5;

      }
    );


    hero.addEventListener(
      "mouseleave",
      () => {

        contentTargetX = 0;
        contentTargetY = 0;

      }
    );

  }


  /* ==========================================================
     BOUCLE D'ANIMATION PRINCIPALE
  ========================================================== */

  function animateHero() {

    /*
     * Animation des traits.
     */

    strokeObjects.forEach(
      (stroke) => {

        stroke.x +=
          (
            stroke.targetX -
            stroke.x
          ) *
          stroke.easing;


        stroke.y +=
          (
            stroke.targetY -
            stroke.y
          ) *
          stroke.easing;


        stroke.element.style.translate =
          `${stroke.x}px ${stroke.y}px`;

      }
    );


    /*
     * Animation du contenu.
     */

    if (heroContent) {

      contentX +=
        (
          contentTargetX -
          contentX
        ) * 0.045;


      contentY +=
        (
          contentTargetY -
          contentY
        ) * 0.045;


      heroContent.style.transform =
        `translate3d(
          ${contentX}px,
          ${contentY}px,
          0
        )`;

    }


    requestAnimationFrame(
      animateHero
    );

  }


  animateHero();


  /* ==========================================================
     SOURIS GLOBALE
  ========================================================== */

  document.addEventListener(
    "mousemove",
    (event) => {

      globalMouseX =
        event.clientX;

      globalMouseY =
        event.clientY;

    }
  );


  /* ==========================================================
     EFFET MAGNÉTIQUE DES BOUTONS
  ========================================================== */

  const magneticButtons =
    document.querySelectorAll(
      ".btn"
    );


  magneticButtons.forEach(
    (button) => {

      button.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            button.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left -
            rect.width / 2;


          const y =
            event.clientY -
            rect.top -
            rect.height / 2;


          /*
           * Effet magnétique légèrement amplifié.
           */

          const magneticX =
            x * 0.16;


          const magneticY =
            y * 0.16;


          button.style.transform =
            `
            translate(
              ${magneticX}px,
              ${magneticY}px
            )
            scale(1.055)
            `;

        }
      );


      button.addEventListener(
        "mouseleave",
        () => {

          button.style.transform =
            "";

        }
      );

    }
  );


  /* ==========================================================
     TILT DES CARTES
  ========================================================== */

  const tiltElements =
    document.querySelectorAll(
      ".event-card, .gallery-item"
    );


  tiltElements.forEach(
    (card) => {

      card.style.transformStyle =
        "preserve-3d";


      card.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            card.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left;


          const y =
            event.clientY -
            rect.top;


          const centerX =
            rect.width / 2;


          const centerY =
            rect.height / 2;


          /*
           * Inclinaison volontairement légère.
           */

          const rotateX =
            ((y - centerY) /
              centerY) *
            -2.2;


          const rotateY =
            ((x - centerX) /
              centerX) *
            2.2;


          card.style.transform =
            `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-4px)
            scale(1.012)
            `;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform =
            "";

        }
      );

    }
  );


  /* ==========================================================
     ÉLÉMENTS ABSTRAITS DES SECTIONS
  ========================================================== */

  const abstractElements =
    document.querySelectorAll(
      ".about-art, .contact-decoration"
    );


  let abstractFrame = null;


  function updateAbstractElements() {

    abstractElements.forEach(
      (element, index) => {

        const strength =
          index % 2 === 0
            ? 16
            : 24;


        const x =
          (
            globalMouseX /
            window.innerWidth -
            0.5
          ) *
          strength;


        const y =
          (
            globalMouseY /
            window.innerHeight -
            0.5
          ) *
          strength;


        element.style.transform =
          `translate3d(
            ${x}px,
            ${y}px,
            0
          )`;

      }
    );


    abstractFrame = null;

  }


  document.addEventListener(
    "mousemove",
    () => {

      if (!abstractFrame) {

        abstractFrame =
          requestAnimationFrame(
            updateAbstractElements
          );

      }

    }
  );


  /* ==========================================================
     ÉCLABOUSSURES ORGANIQUES
  ========================================================== */

  let lastSplashTime = 0;


  document.addEventListener(
    "mousemove",
    (event) => {

      const now =
        performance.now();


      /*
       * Limite le nombre d'éclaboussures
       * pour garder l'effet élégant.
       */

      if (
        now - lastSplashTime <
        115
      ) {
        return;
      }


      /*
       * On ne crée les éclaboussures
       * que dans le hero.
       */

      const element =
        document.elementFromPoint(
          event.clientX,
          event.clientY
        );


      if (
        !element ||
        !element.closest(".hero")
      ) {
        return;
      }


      lastSplashTime =
        now;


      createOrganicSplash(
        event.clientX,
        event.clientY
      );

    }
  );


  function createOrganicSplash(
    x,
    y
  ) {

    const splash =
      document.createElement("span");


    splash.className =
      "cursor-splash";


    /*
     * Palette du festival.
     */

    const colors = [
      "#145cff",
      "#35d66f",
      "#8d43ff",
      "#ff762e"
    ];


    const color =
      colors[
        Math.floor(
          Math.random() *
          colors.length
        )
      ];


    /*
     * Dimensions très variables.
     */

    const width =
      7 +
      Math.random() *
      25;


    const height =
      3 +
      Math.random() *
      15;


    /*
     * Direction aléatoire.
     */

    const angle =
      Math.random() *
      Math.PI *
      2;


    const distance =
      18 +
      Math.random() *
      48;


    /*
     * Rotation très irrégulière.
     */

    const rotation =
      Math.random() *
      180 -
      90;


    const rotationEnd =
      rotation +
      (
        Math.random() *
        260 -
        130
      );


    splash.style.left =
      `${x}px`;


    splash.style.top =
      `${y}px`;


    splash.style.width =
      `${width}px`;


    splash.style.height =
      `${height}px`;


    splash.style.background =
      color;


    splash.style.setProperty(
      "--dx",
      `${Math.cos(angle) * distance}px`
    );


    splash.style.setProperty(
      "--dy",
      `${Math.sin(angle) * distance}px`
    );


    splash.style.setProperty(
      "--r",
      `${rotation}deg`
    );


    splash.style.setProperty(
      "--r2",
      `${rotationEnd}deg`
    );


    document.body.appendChild(
      splash
    );


    /*
     * Nettoyage.
     */

    window.setTimeout(
      () => {

        splash.remove();

      },
      800
    );

  }


  /* ==========================================================
     HOVER DES LIENS
  ========================================================== */

  const interactiveLinks =
    document.querySelectorAll(
      "a, button"
    );


  interactiveLinks.forEach(
    (element) => {

      element.addEventListener(
        "mouseenter",
        () => {

          element.classList.add(
            "is-hovered"
          );

        }
      );


      element.addEventListener(
        "mouseleave",
        () => {

          element.classList.remove(
            "is-hovered"
          );

        }
      );

    }
  );


  /* ==========================================================
     EFFET SUR LE LOGO
  ========================================================== */

  const logo =
    document.querySelector(".logo");


  if (logo) {

    logo.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          logo.getBoundingClientRect();


        const x =
          event.clientX -
          rect.left -
          rect.width / 2;


        const y =
          event.clientY -
          rect.top -
          rect.height / 2;


        logo.style.transform =
          `
          translate(
            ${x * 0.06}px,
            ${y * 0.06}px
          )
          `;

      }
    );


    logo.addEventListener(
      "mouseleave",
      () => {

        logo.style.transform =
          "";

      }
    );

  }


  /* ==========================================================
     NETTOYAGE SI LA FENÊTRE EST REDIMENSIONNÉE
  ========================================================== */

  window.addEventListener(
    "resize",
    () => {

      /*
       * On remet les positions cibles
       * des traits à zéro pour éviter
       * un saut lors du changement de taille.
       */

      strokeObjects.forEach(
        (stroke) => {

          stroke.targetX = 0;
          stroke.targetY = 0;

        }
      );

    }
  );

});document.addEventListener("DOMContentLoaded", () => {

  // ==========================================================
  // MENU MOBILE
  // ==========================================================

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      const isOpen = navLinks.classList.contains("active");

      menuToggle.setAttribute("aria-expanded", isOpen);
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }


  // ==========================================================
  // FORMULAIRE DE CONTACT
  // ==========================================================

  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm && formMessage) {

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const message = document.getElementById("message")?.value.trim();

      if (!name || !email || !message) {
        formMessage.textContent =
          "Merci de remplir tous les champs.";

        formMessage.style.color = "#ff4d00";
        return;
      }

      formMessage.textContent =
        "Merci ! Votre message a bien été envoyé.";

      formMessage.style.color = "#168a43";

      contactForm.reset();
    });
  }


  // ==========================================================
  // ANIMATIONS D'APPARITION AU SCROLL
  // ==========================================================

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
      threshold: 0.12
    }
  );


  revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
      "translateY(25px)";

    element.style.transition =
      "opacity 0.7s ease, transform 0.7s cubic-bezier(.2,.8,.2,1)";

    revealObserver.observe(element);

  });


  // ==========================================================
  // STYLE POUR LES ANIMATIONS
  // ==========================================================

  const revealStyle = document.createElement("style");

  revealStyle.textContent = `
    .is-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;

  document.head.appendChild(revealStyle);


  // ==========================================================
  // EFFETS DE CURSEUR
  // ==========================================================

  const supportsPointer =
    window.matchMedia("(pointer: fine)").matches;

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (!supportsPointer || reducedMotion) {
    return;
  }


  // ==========================================================
  // 1. CURSEUR PERSONNALISÉ
  // ==========================================================

  const cursor = document.createElement("div");
  const cursorDot = document.createElement("div");

  cursor.className = "custom-cursor";
  cursorDot.className = "custom-cursor-dot";

  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);


  const cursorStyle = document.createElement("style");

  cursorStyle.textContent = `
    .custom-cursor {
      position: fixed;
      z-index: 9999;
      width: 34px;
      height: 34px;
      border: 1.5px solid #000;
      border-radius: 50%;
      pointer-events: none;
      transform: translate3d(-50%, -50%, 0);
      transition:
        width .25s ease,
        height .25s ease,
        background .25s ease,
        border-color .25s ease;
      mix-blend-mode: difference;
    }

    .custom-cursor-dot {
      position: fixed;
      z-index: 10000;
      width: 5px;
      height: 5px;
      background: #000;
      border-radius: 50%;
      pointer-events: none;
      transform: translate3d(-50%, -50%, 0);
    }

    .custom-cursor.cursor-hover {
      width: 60px;
      height: 60px;
      background: rgba(255,255,255,.18);
      border-color: #fff;
    }

    @media (pointer: coarse) {
      .custom-cursor,
      .custom-cursor-dot {
        display: none;
      }
    }
  `;

  document.head.appendChild(cursorStyle);


  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let cursorX = mouseX;
  let cursorY = mouseY;

  document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

  });


  function animateCursor() {

    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();


  // ==========================================================
  // 2. ELEMENTS COLORÉS DU HERO
  // ==========================================================

  const hero = document.querySelector(".hero");

  const brushes = document.querySelectorAll(
    ".hero .brush"
  );


  if (hero && brushes.length) {

    const brushData = [];


    brushes.forEach((brush, index) => {

      const baseTransform =
        getComputedStyle(brush).transform;

      brushData.push({

        element: brush,

        x: 0,
        y: 0,

        targetX: 0,
        targetY: 0,

        strength:
          [18, 11, 24, 8][index] || 12,

        rotation:
          [1.2, -0.8, 1.8, -1][index] || 1

      });

      brush.style.willChange =
        "transform";

      brush.dataset.baseTransform =
        baseTransform;

    });


    hero.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          hero.getBoundingClientRect();

        const relativeX =
          (event.clientX - rect.left) /
          rect.width;

        const relativeY =
          (event.clientY - rect.top) /
          rect.height;

        const centerX =
          relativeX - 0.5;

        const centerY =
          relativeY - 0.5;


        brushData.forEach((item, index) => {

          item.targetX =
            centerX *
            item.strength *
            (index % 2 === 0 ? 1 : -1);

          item.targetY =
            centerY *
            item.strength;

        });

      }
    );


    function animateBrushes() {

      brushData.forEach((item) => {

        item.x +=
          (item.targetX - item.x) * 0.055;

        item.y +=
          (item.targetY - item.y) * 0.055;


        item.element.style.transform =
          `translate3d(
            ${item.x}px,
            ${item.y}px,
            0
          ) rotate(${item.rotation}deg)`;

      });


      requestAnimationFrame(
        animateBrushes
      );
    }


    animateBrushes();

  }


  // ==========================================================
  // 3. PARALLAXE DU HERO
  // ==========================================================

  const heroContent =
    document.querySelector(".hero-content");

  if (hero && heroContent) {

    let contentTargetX = 0;
    let contentTargetY = 0;

    let contentX = 0;
    let contentY = 0;


    hero.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          hero.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width - 0.5;

        const y =
          (event.clientY - rect.top) /
          rect.height - 0.5;

        contentTargetX = x * -7;
        contentTargetY = y * -5;

      }
    );


    function animateHeroContent() {

      contentX +=
        (contentTargetX - contentX) * 0.045;

      contentY +=
        (contentTargetY - contentY) * 0.045;


      heroContent.style.transform =
        `translate3d(
          ${contentX}px,
          ${contentY}px,
          0
        )`;


      requestAnimationFrame(
        animateHeroContent
      );
    }


    animateHeroContent();

  }


  // ==========================================================
  // 4. EFFET DE PARALLAXE DES ILLUSTRATIONS
  // ==========================================================

  const abstractElements = document.querySelectorAll(
    ".about-art, .contact-decoration"
  );


  abstractElements.forEach((element) => {

    element.style.willChange =
      "transform";

  });


  document.addEventListener(
    "mousemove",
    (event) => {

      const x =
        (event.clientX /
          window.innerWidth - 0.5);

      const y =
        (event.clientY /
          window.innerHeight - 0.5);


      abstractElements.forEach(
        (element, index) => {

          const strength =
            index % 2 === 0
              ? 10
              : 18;

          element.style.transform =
            `translate3d(
              ${x * strength}px,
              ${y * strength}px,
              0
            )`;

        }
      );

    }
  );


  // ==========================================================
  // 5. LES CARTES RÉAGISSENT AU CURSEUR
  // ==========================================================

  const cards =
    document.querySelectorAll(
      ".event-card, .gallery-item"
    );


  cards.forEach((card) => {

    card.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;

        const rotateX =
          ((y - centerY) / centerY) * -2;

        const rotateY =
          ((x - centerX) / centerX) * 2;


        card.style.transform =
          `
          perspective(800px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-3px)
          scale(1.01)
          `;
      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform =
          "";

      }
    );

  });


  // ==========================================================
  // 6. EFFET MAGNÉTIQUE SUR LES BOUTONS
  // ==========================================================

  const magneticButtons =
    document.querySelectorAll(
      ".btn"
    );


  magneticButtons.forEach((button) => {

    button.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          button.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;


        button.style.transform =
          `translate(
            ${x * 0.10}px,
            ${y * 0.10}px
          ) scale(1.04)`;

      }
    );


    button.addEventListener(
      "mouseleave",
      () => {

        button.style.transform =
          "";

      }
    );

  });


  // ==========================================================
  // 7. PETITES ÉCLABOUSSURES QUI SUIVENT LE CURSEUR
  // ==========================================================

  let lastSplashTime = 0;

  document.addEventListener(
    "mousemove",
    (event) => {

      const now =
        Date.now();

      if (now - lastSplashTime < 180) {
        return;
      }

      lastSplashTime = now;


      // Seulement dans le hero
      const currentElement =
        document.elementFromPoint(
          event.clientX,
          event.clientY
        );

      if (!currentElement) {
        return;
      }


      const insideHero =
        currentElement.closest(".hero");

      if (!insideHero) {
        return;
      }


      createSplash(
        event.clientX,
        event.clientY
      );

    }
  );


  function createSplash(x, y) {

    const splash =
      document.createElement("span");

    splash.className =
      "cursor-splash";


    const colors = [
      "#145cff",
      "#35d66f",
      "#8d43ff",
      "#ff762e"
    ];


    const color =
      colors[
        Math.floor(
          Math.random() *
          colors.length
        )
      ];


    const size =
      Math.random() * 8 + 5;

    const angle =
      Math.random() * Math.PI * 2;

    const distance =
      Math.random() * 20 + 10;


    splash.style.width =
      `${size}px`;

    splash.style.height =
      `${size}px`;

    splash.style.background =
      color;

    splash.style.left =
      `${x}px`;

    splash.style.top =
      `${y}px`;

    splash.style.setProperty(
      "--dx",
      `${Math.cos(angle) * distance}px`
    );

    splash.style.setProperty(
      "--dy",
      `${Math.sin(angle) * distance}px`
    );


    document.body.appendChild(
      splash
    );


    setTimeout(() => {
      splash.remove();
    }, 650);

  }


  // ==========================================================
  // 8. LIENS / BOUTONS : CURSEUR PLUS GRAND
  // ==========================================================

  const interactiveElements =
    document.querySelectorAll(
      "a, button, input, textarea, .event-card, .gallery-item"
    );


  interactiveElements.forEach((element) => {

    element.addEventListener(
      "mouseenter",
      () => {

        cursor.classList.add(
          "cursor-hover"
        );

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        cursor.classList.remove(
          "cursor-hover"
        );

      }
    );

  });


  // ==========================================================
  // 9. EFFET DE TENSION SUR LE LOGO
  // ==========================================================

  const logo =
    document.querySelector(".logo");


  if (logo) {

    logo.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          logo.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;


        logo.style.transform =
          `translate(
            ${x * 0.04}px,
            ${y * 0.04}px
          )`;

      }
    );


    logo.addEventListener(
      "mouseleave",
      () => {

        logo.style.transform =
          "";

      }
    );

  }

});
