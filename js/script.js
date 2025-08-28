document.addEventListener('DOMContentLoaded', () => {
  const nav  = document.querySelector('.main-nav');
  const btn  = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');

  if (!nav || !btn || !menu) return;

  const openMenu = (open) => {
    nav.classList.toggle('is-open', open);
    menu.classList.toggle('show', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('no-scroll', open);
  };

  btn.addEventListener('click', () => openMenu(!nav.classList.contains('is-open')));

  // Fermer au clic sur un lien
  menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') openMenu(false);
  });

  // Fermer sur Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') openMenu(false);
  });
});




