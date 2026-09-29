(function () {
  "use strict";

  const toggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const navbar = document.querySelector(".navbar");
  const title = document.getElementById("menu-title");
  const description = document.getElementById("menu-description");
  const links = Array.from(mobileMenu.querySelectorAll("[data-menu]"));

  // The assignment asks for exactly one tall section. Mobile choices reuse it.
  const dishes = {
    chicken: [
      "Our chicken selection brings together familiar flavors and careful preparation. Each plate begins with tender chicken, thoughtfully seasoned and cooked until it is ready to serve.",
      "Choose a simple grilled favorite, a gently spiced option, or a comforting dish to share. Fresh ingredients and balanced sides make the menu welcoming for a quick lunch or a relaxed dinner.",
      "We believe good food should be easy to enjoy. Take a moment to explore the menu, find a favorite, and come back whenever you are ready for another meal at Food, LLC."
    ],
    beef: [
      "Our beef dishes focus on generous flavor and a satisfying meal. We season each serving with care and pair it with simple sides that let the ingredients shine.",
      "From a hearty lunch to an unhurried dinner, these choices are designed to feel both familiar and special. Explore the selection and enjoy a meal made for sharing.",
      "At Food, LLC, every dish is an invitation to sit down, slow down, and enjoy good company around the table."
    ],
    sushi: [
      "Our sushi selection celebrates fresh ingredients, clean flavors, and careful presentation. Each bite brings together a thoughtful balance of texture and taste.",
      "Choose a lighter meal or make it part of a larger gathering. The menu offers approachable favorites for anyone curious to try something new.",
      "Good food is better together. Find a favorite, share a plate, and enjoy your time at Food, LLC."
    ]
  };

  function setMenuOpen(isOpen) {
    mobileMenu.classList.toggle("in", isOpen);
    toggle.classList.toggle("collapsed", !isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  }

  toggle.addEventListener("click", function () {
    setMenuOpen(!mobileMenu.classList.contains("in"));
  });

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      const key = link.getAttribute("data-menu");
      const paragraphs = dishes[key];

      if (paragraphs) {
        title.textContent = link.textContent;
        description.replaceChildren(...paragraphs.map(function (copy) {
          const paragraph = document.createElement("p");
          paragraph.textContent = copy;
          return paragraph;
        }));

        links.forEach(function (item) {
          if (item === link) {
            item.setAttribute("aria-current", "true");
          } else {
            item.removeAttribute("aria-current");
          }
        });
      }

      setMenuOpen(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && mobileMenu.classList.contains("in")) {
      setMenuOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (!navbar.contains(event.target) && mobileMenu.classList.contains("in")) {
      setMenuOpen(false);
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
      setMenuOpen(false);
    }
  });
}());
