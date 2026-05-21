// =============================================================================
// reveal.js — Animation d'apparition au scroll
//
// Comportement :
//   - Les éléments .reveal apparaissent en fondu/montée quand ils entrent
//     dans le viewport (classe .visible ajoutée une seule fois)
//   - Une fois visible, l'élément ne disparaît plus (pas de re-animation
//     au scroll vers le haut, qui serait perturbant)
//   - Fallback immédiat si IntersectionObserver n'est pas supporté
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {

  // Indique au CSS que JS est actif (permet de masquer .reveal par défaut
  // uniquement quand JS est disponible)
  document.documentElement.classList.add('js');

  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if (!reveals.length) return;

  // Fallback navigateurs anciens : tout visible immédiatement
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('visible'));
    return;
  }

  // Rend immédiatement visible ce qui est déjà dans le viewport au chargement
  // (évite le flash blanc sur les sections above-the-fold)
  const revealIfInView = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    reveals.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        el.classList.add('visible');
      }
    });
  };
  revealIfInView();

  // Observer : .visible n'est JAMAIS retiré
  // → pas de re-animation intempestive en scrollant vers le haut
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // On arrête d'observer l'élément une fois qu'il est apparu
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -5% 0px'
  });

  reveals.forEach(el => {
    // Ne pas observer les éléments déjà visibles (above the fold)
    if (!el.classList.contains('visible')) {
      observer.observe(el);
    }
  });

  // Recalage au redimensionnement et changement d'orientation
  window.addEventListener('resize', revealIfInView, { passive: true });
  window.addEventListener('orientationchange', revealIfInView, { passive: true });

});


