/* main.js */
document.addEventListener("DOMContentLoaded", () => {
  // Touch detection
  const isTouch = ("ontouchstart" in window) || navigator.maxTouchPoints > 0;
  if (isTouch) {
    document.documentElement.classList.replace("no-touch", "touch");
  }
  window._losiosIsTouch = isTouch;

  window.LosiosParticles?.initParticles();
  window.LosiosHero3D?.initHero3D();
  window.LosiosScroll?.initScrollEffects();
  window.LosiosTerminal?.initTerminal();

  // Hamburger nav
  (function initHamburger() {
    const hamburger = document.querySelector(".nav-hamburger");
    if (!hamburger) return;

    // Build drawer dynamically
    const drawer = document.createElement("nav");
    drawer.className = "nav-drawer";
    drawer.innerHTML = `
      <div class="nav-drawer-header">
        <button class="nav-drawer-close" aria-label="Close menu">✕</button>
      </div>
      <a href="#skills">[skills]</a>
      <a href="#experience">[experience]</a>
      <a href="#projects">[projects]</a>
      <a href="#contact">[contact]</a>
    `;
    document.body.appendChild(drawer);

    function openDrawer() {
      drawer.classList.add("open");
      hamburger.setAttribute("aria-expanded", "true");
      hamburger.textContent = "✕";
    }
    function closeDrawer() {
      drawer.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.textContent = "☰";
    }

    hamburger.addEventListener("click", () => {
      drawer.classList.contains("open") ? closeDrawer() : openDrawer();
    });
    drawer.querySelector(".nav-drawer-close").addEventListener("click", closeDrawer);

    // Close on link tap + smooth scroll
    drawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (e) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          e.preventDefault();
          closeDrawer();
          const nav = document.getElementById("main-nav");
          const y = target.getBoundingClientRect().top + window.scrollY - (nav?.offsetHeight || 60);
          setTimeout(() => window.scrollTo({ top: y, behavior: "smooth" }), 200);
        }
      });
    });

    // ESC closes drawer
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrawer();
    });
  })();

  const nav = document.getElementById("main-nav");
  const navScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 50);
  window.addEventListener("scroll", navScroll);
  navScroll();

  requestAnimationFrame(() => {
    document.body.style.opacity = "1";
  });
});
