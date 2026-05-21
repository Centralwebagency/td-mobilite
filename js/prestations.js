// =============================================================================
// prestations.js — Accordéons page prestations
//
// Principe :
//   - Le CSS gère tout le visuel via max-height + classe .open
//   - Le JS gère uniquement les états aria et le toggle de .open
//   - Un seul accordéon ouvert à la fois (comportement exclusif)
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {

  const container = document.querySelector('[data-accordion]');
  if (!container) return;

  const items = Array.from(container.querySelectorAll('.accordion'));

  // Ferme un accordéon donné
  const close = (btn, panel) => {
    btn.setAttribute('aria-expanded', 'false');
    panel.classList.remove('open');
    panel.style.maxHeight = '0';
    // On remet hidden après la transition pour l'accessibilité
    panel.addEventListener('transitionend', () => {
      if (!panel.classList.contains('open')) {
        panel.hidden = true;
      }
    }, { once: true });
  };

  // Ouvre un accordéon donné
  const open = (btn, panel) => {
    panel.hidden = false;
    // Le requestAnimationFrame garantit que hidden=false est rendu
    // avant qu'on applique max-height, sinon la transition ne se déclenche pas
    requestAnimationFrame(() => {
      btn.setAttribute('aria-expanded', 'true');
      panel.classList.add('open');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    });
  };

  items.forEach(item => {
    const btn   = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');

    if (!btn || !panel) return;

    // État initial : tout fermé
    panel.style.maxHeight = '0';

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Ferme tous les autres
      items.forEach(other => {
        if (other === item) return;
        const b = other.querySelector('.accordion-trigger');
        const p = other.querySelector('.accordion-panel');
        if (b && p && b.getAttribute('aria-expanded') === 'true') {
          close(b, p);
        }
      });

      // Toggle l'élément courant
      if (isOpen) {
        close(btn, panel);
      } else {
        open(btn, panel);
      }
    });
  });

});