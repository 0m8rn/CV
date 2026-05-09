/* main.js */
document.addEventListener("DOMContentLoaded", () => {
  window.LosiosParticles?.initParticles();
  window.LosiosHero3D?.initHero3D();
  window.LosiosScroll?.initScrollEffects();
  window.LosiosTerminal?.initTerminal();

  const nav = document.getElementById("main-nav");
  const navScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 50);
  window.addEventListener("scroll", navScroll);
  navScroll();

  requestAnimationFrame(() => {
    document.body.style.opacity = "1";
  });
});
