// Header
const header = document.querySelector('.header');
const menuButton = document.querySelector('.header__menu-button');
const navLinks = document.querySelectorAll('.header__nav a');

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


// Works
const works = document.querySelector('.works');

if (works) {
  const tabs = works.querySelectorAll('.works__tab');
  const items = Array.from(works.querySelectorAll('.works__item'));
  const cards = Array.from(works.querySelectorAll('.works__card'));
  const moreButton = works.querySelector('.works__more');
  const modal = works.querySelector('.works-modal');
  const modalImage = works.querySelector('.works-modal__figure img');
  const modalTitle = works.querySelector('.works-modal__figure strong');
  const modalDesc = works.querySelector('.works-modal__figure span');
  const modalClose = works.querySelector('.works-modal__close');
  const modalDim = works.querySelector('.works-modal__dim');
  const modalPrev = works.querySelector('.works-modal__arrow--prev');
  const modalNext = works.querySelector('.works-modal__arrow--next');

  let currentFilter = 'all';
  let visibleItems = [];
  let modalItems = [];
  let currentIndex = 0;
  let showCount = window.innerWidth <= 768 ? 6 : 8;

  const getShowStep = () => {
    return window.innerWidth <= 768 ? 6 : 8;
  };

  const updateItems = () => {
    showCount = getShowStep();

    visibleItems = items.filter((item) => {
      return currentFilter === 'all' || item.dataset.category === currentFilter;
    });

    items.forEach((item) => {
      const isMatched = currentFilter === 'all' || item.dataset.category === currentFilter;

      item.classList.toggle('is-hidden', !isMatched);
      item.classList.remove('is-more-hidden');
    });

    visibleItems.forEach((item, index) => {
      item.classList.toggle('is-more-hidden', index >= showCount);
    });

    moreButton.classList.toggle('is-hidden', visibleItems.length <= showCount);
  };

  const showMoreItems = () => {
    showCount += getShowStep();

    visibleItems.forEach((item, index) => {
      item.classList.toggle('is-more-hidden', index >= showCount);
    });

    moreButton.classList.toggle('is-hidden', visibleItems.length <= showCount);
  };

  const renderModal = () => {
    const item = modalItems[currentIndex];
    const card = item.querySelector('.works__card');
    const image = card.querySelector('img');

    modalImage.src = card.dataset.image;
    modalImage.alt = image.alt;
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
  };

  const openModal = (item) => {
    modalItems = visibleItems.filter((visibleItem) => {
      return !visibleItem.classList.contains('is-more-hidden');
    });

    currentIndex = modalItems.indexOf(item);

    renderModal();
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const moveModal = (direction) => {
    currentIndex += direction;

    if (currentIndex < 0) {
      currentIndex = modalItems.length - 1;
    }

    if (currentIndex >= modalItems.length) {
      currentIndex = 0;
    }

    renderModal();
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((item) => item.classList.remove('is-active'));
      tab.classList.add('is-active');

      currentFilter = tab.dataset.filter;
      updateItems();
    });
  });

  items.forEach((item) => {
    const card = item.querySelector('.works__card');

    card.addEventListener('click', () => {
      openModal(item);
    });
  });

  moreButton.addEventListener('click', showMoreItems);

  modalClose.addEventListener('click', closeModal);
  modalDim.addEventListener('click', closeModal);

  modalPrev.addEventListener('click', () => {
    moveModal(-1);
  });

  modalNext.addEventListener('click', () => {
    moveModal(1);
  });

  window.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('is-active')) return;

    if (event.key === 'Escape') {
      closeModal();
    }

    if (event.key === 'ArrowLeft') {
      moveModal(-1);
    }

    if (event.key === 'ArrowRight') {
      moveModal(1);
    }
  });

  updateItems();
}