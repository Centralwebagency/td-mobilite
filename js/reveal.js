// js/reveal.js
document.addEventListener("DOMContentLoaded", () => {
  // active le mode JS pour le CSS (.js .reveal)
  document.documentElement.classList.add("js");

  const reveals = Array.from(document.querySelectorAll(".reveal"));
  if (!reveals.length) return;

  // Si IntersectionObserver n'existe pas: rendre tout visible et sortir
  if (!("IntersectionObserver" in window)) {
    reveals.forEach(el => el.classList.add("visible"));
    return;
  }

  // Rendre immédiatement visible ce qui est déjà à l'écran (pas de flash)
  const revealIfInView = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    reveals.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) el.classList.add("visible");
    });
  };
  revealIfInView();

  // Observer: ajoute visible à l'entrée, l'enlève à la sortie (up & down)
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -6% 0px"
  });

  reveals.forEach(el => io.observe(el));

  // Recalage si resize/orientation
  window.addEventListener("resize", revealIfInView);
  window.addEventListener("orientationchange", revealIfInView);
});




