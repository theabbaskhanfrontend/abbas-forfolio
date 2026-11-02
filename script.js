// ```javascript
// // Mobile navigation menu
// const menuToggle = document.querySelector("#menuToggle");
// const navLinks = document.querySelector("#navLinks");

// if (menuToggle && navLinks) {
//   menuToggle.addEventListener("click", () => {
//     navLinks.classList.toggle("open");

//     const isOpen = navLinks.classList.contains("open");
//     menuToggle.setAttribute("aria-expanded", String(isOpen));
//     menuToggle.textContent = isOpen ? "✕" : "☰";
//   });

//   navLinks.querySelectorAll("a").forEach((link) => {
//     link.addEventListener("click", () => {
//       navLinks.classList.remove("open");
//       menuToggle.setAttribute("aria-expanded", "false");
//       menuToggle.textContent = "☰";
//     });
//   });
// }

// // Reveal content when it enters the screen
// const revealItems = document.querySelectorAll(".reveal");

// if ("IntersectionObserver" in window) {
//   const revealObserver = new IntersectionObserver((entries, observer) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("visible");
//         observer.unobserve(entry.target);
//       }
//     });
//   }, { threshold: 0.12 });

//   revealItems.forEach((item) => revealObserver.observe(item));
// } else {
//   revealItems.forEach((item) => item.classList.add("visible"));
// }

// // Update footer year automatically
// const year = document.querySelector("#year");

// if (year) {
//   year.textContent = new Date().getFullYear();
// }
// ```
document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation menu
  const menuToggle = document.querySelector("#menuToggle");
  const navLinks = document.querySelector("#navLinks");

  if (menuToggle && navLinks) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "✕" : "☰";
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });

    // Close menu with Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      }
    });
  }

  // Scroll reveal animation
  const revealItems = document.querySelectorAll(".reveal");

  // Keep content visible if animations are unsupported
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach((item) => {
      item.classList.add("visible");
    });
  }

  // Update footer year automatically
  const year = document.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Smooth scrolling for internal navigation links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        });
      }
    });
  });
});