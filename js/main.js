const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.site-header__menu-button');
const navLinks = document.querySelectorAll('.site-header__nav a');

menuButton.addEventListener('click', function () {
  header.classList.toggle('is-open');

  const isOpen = header.classList.contains('is-open');
  menuButton.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
});

navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    header.classList.remove('is-open');
    menuButton.setAttribute('aria-label', '메뉴 열기');
  });
});
