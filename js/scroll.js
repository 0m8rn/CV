/* scroll.js */
window.LosiosScroll = (() => {
  function initScrollEffects() {
    revealOnScroll();
    runStatCounters();
    initNavActive();
    initSmoothNav();
    initRoleTypewriter();
  }

  function revealOnScroll() {
    const targets = document.querySelectorAll(".timeline-block, .skill-card, .project-card");
    targets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const idx = [...targets].indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 40}ms`;
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        io.unobserve(entry.target);
      });
    }, { threshold: 0.2 });
    targets.forEach((el) => io.observe(el));
  }

  function animateValue(el, end, duration, suffix = "") {
    const start = performance.now();
    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      const v = Math.floor(eased * end);
      el.textContent = `${v}${suffix}`;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function runStatCounters() {
    setTimeout(() => {
      document.querySelectorAll(".stat-number").forEach((el) => {
        const target = Number(el.dataset.target || 0);
        const suffix = el.dataset.suffix || "";
        if (target === 0) {
          el.textContent = "0";
          return;
        }
        if (target === 1000) return animateValue(el, 1000, 1500, "+");
        if (target === 80) return animateValue(el, 80, 1000, "%");
        if (target === 5) return animateValue(el, 5, 800, "+");
        return animateValue(el, target, 1000, suffix);
      });
    }, 1000);
  }

  function initNavActive() {
    const sections = [...document.querySelectorAll("section[id]")];
    const links = [...document.querySelectorAll(".nav-links a")];
    function setActive() {
      const mark = window.scrollY + 130;
      let id = sections[0]?.id;
      sections.forEach((sec) => {
        if (mark >= sec.offsetTop) id = sec.id;
      });
      links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === `#${id}`));
    }
    window.addEventListener("scroll", setActive);
    setActive();
  }

  function initSmoothNav() {
    document.querySelectorAll(".nav-links a, .hero-cta a").forEach((a) => {
      a.addEventListener("click", (e) => {
        const target = document.querySelector(a.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        const nav = document.getElementById("main-nav");
        const y = target.getBoundingClientRect().top + window.scrollY - (nav?.offsetHeight || 70);
        window.scrollTo({ top: y, behavior: "smooth" });
      });
    });
  }

  function initRoleTypewriter() {
    const el = document.getElementById("role-typewriter");
    if (!el) return;
    const roles = ["Developer.", "Builder.", "Entrepreneur.", "Automator."];
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;

    function tick() {
      const current = roles[roleIdx];
      el.textContent = `${current.slice(0, charIdx)}|`;
      if (!deleting) {
        charIdx += 1;
        if (charIdx > current.length) {
          deleting = true;
          return setTimeout(tick, 2000);
        }
      } else {
        charIdx -= 1;
        if (charIdx < 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          return setTimeout(tick, 300);
        }
      }
      setTimeout(tick, deleting ? 45 : 80);
    }
    tick();
  }

  return { initScrollEffects };
})();
