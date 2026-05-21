document.addEventListener('DOMContentLoaded', () => {

  // ===========================================================================
  // ANNÉE DYNAMIQUE — Footer
  // Remplit tous les éléments [data-year] avec l'année en cours
  // ===========================================================================

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });


  // ===========================================================================
  // HEADER SCROLLÉ
  // Ajoute .site-header--scrolled dès que l'utilisateur scrolle de plus de 40px.
  // Le CSS gère ensuite le fond sombre + backdrop-blur.
  // ===========================================================================

  const header = document.getElementById('site-header');

  if (header) {
    const onScroll = () => {
      header.classList.toggle('site-header--scrolled', window.scrollY > 40);
    };

    // Vérification immédiate au chargement (cas d'un rechargement en milieu de page)
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }


  // ===========================================================================
  // MENU BURGER — Mobile
  //
  // Classes gérées :
  //   - .is-open sur #menu        → déclenche l'animation clip-path CSS
  //   - aria-expanded sur .nav-toggle → accessibilité + animation burger → croix
  //   - .no-scroll sur body       → bloque le scroll de la page derrière l'overlay
  // ===========================================================================

  const btn  = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');

  if (btn && menu) {

    const setMenuOpen = (open) => {
      menu.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('no-scroll', open);
    };

    // Ouverture / fermeture au clic sur le burger
    btn.addEventListener('click', () => {
      const isCurrentlyOpen = menu.classList.contains('is-open');
      setMenuOpen(!isCurrentlyOpen);
    });

    // Fermeture automatique au clic sur un lien du menu
    menu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') setMenuOpen(false);
    });

    // Fermeture sur touche Échap (accessibilité clavier)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        setMenuOpen(false);
        // Remet le focus sur le burger après fermeture
        btn.focus();
      }
    });

    // Fermeture si clic en dehors du menu (sur l'overlay)
    document.addEventListener('click', (e) => {
      if (
        menu.classList.contains('is-open') &&
        !menu.contains(e.target) &&
        !btn.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    });
  }

});



