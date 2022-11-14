(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');
  const navLinks = document.querySelectorAll('nav a');
  const modalBtn = document.querySelectorAll('[data-modal-open]');

  const toggleMenu = () => {
    const isMenuOpen = openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');

    const scrollLockMethod = !isMenuOpen ? 'disableBodyScroll' : 'enableBodyScroll';
    bodyScrollLock[scrollLockMethod](document.body);
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  navLinks.forEach(el =>
    el.addEventListener('click', e => {
      e.preventDefault();
      let targetElement = el.getAttribute('href');
      document.querySelector(targetElement).scrollIntoView({
        behavior: 'smooth',
      });

      window.innerWidth < 1314 ? toggleMenu() : '';
    }),
  );
  modalBtn.forEach(el =>
    el.addEventListener('click', () => {
      mobileMenu.classList.contains('is-open') ? toggleMenu() : '';
    }),
  );

  // Close the mobile menu on wider screens if the device orientation changes
  window.matchMedia('(min-width: 1354px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    bodyScrollLock.enableBodyScroll(document.body);
  });
})();
