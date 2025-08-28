document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('[data-accordion]');
  if (!container) return;

  const accordions = container.querySelectorAll('.accordion');

  accordions.forEach(acc => {
    const btn = acc.querySelector('.accordion-trigger');
    const panel = acc.querySelector('.accordion-panel');

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Ferme tous les autres (option : commente ce bloc si tu veux multi-ouvert)
      accordions.forEach(a => {
        if (a !== acc) {
          const b = a.querySelector('.accordion-trigger');
          const p = a.querySelector('.accordion-panel');
          b.setAttribute('aria-expanded', 'false');
          p.hidden = true;
          p.classList.remove('open');
          p.style.maxHeight = '0px';
          p.style.paddingBottom = '';
          p.style.paddingTop = '';
        }
      });

      // Toggle courant
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (isOpen) {
        panel.style.maxHeight = '0px';
        panel.style.paddingTop = '';
        panel.style.paddingBottom = '';
        panel.addEventListener('transitionend', () => { panel.hidden = true; }, { once: true });
        panel.classList.remove('open');
      } else {
        panel.hidden = false;
        panel.classList.add('open');
        // calcule la hauteur réelle
        panel.style.maxHeight = panel.scrollHeight + 'px';
        panel.style.paddingTop = '.5rem';
        panel.style.paddingBottom = '1rem';
      }
    });
  });
});
