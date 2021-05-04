'use strict';

function onSwitchButtonChange() {
  if (this.checked) {
    document.documentElement.dataset.theme = 'dark';
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.dataset.theme = 'light';
    localStorage.setItem('theme', 'light');
  }
}

const toggleSwitch = document.querySelector('.switch__field');
toggleSwitch.addEventListener('change', onSwitchButtonChange);

const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.documentElement.dataset.theme = currentTheme;

  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
  }
}

const chooseFavoriteRange = document.querySelector('.choose-favorite__range');
const chooseFavoriteOutput = document.querySelector('.choose-favorite__output-number');
const chooseFavoriteItems = document.querySelectorAll('.choose-favorite__item');
const btnLeft = document.querySelector('.choose-favorite__btn--left');
const btnRight = document.querySelector('.choose-favorite__btn--right');
const chooseFavoriteCarousel = document.querySelector('.choose-favorite__list');
const worldMapPins = document.querySelectorAll('.world-map__pin');
const btnWatch = document.querySelector('.choose-favorite__btn');
let rangeValue = +chooseFavoriteRange.value;
let currentPosition = 0;

let chooseFavoriteItem = document.querySelector('.choose-favorite__item:not(.choose-favorite__item--active)');
let chooseFavoriteCarouselWidth = chooseFavoriteCarousel.offsetWidth;
let itemWidth = chooseFavoriteItem.offsetWidth;
let slidesVisible = Math.floor(chooseFavoriteCarouselWidth / itemWidth);

window.addEventListener('resize', () => {
  chooseFavoriteItem = document.querySelector('.choose-favorite__item:not(.choose-favorite__item--active)');
  chooseFavoriteCarouselWidth = chooseFavoriteCarousel.offsetWidth;
  itemWidth = chooseFavoriteItem.offsetWidth;
  slidesVisible = Math.floor(chooseFavoriteCarouselWidth / itemWidth);

  if (slidesVisible === chooseFavoriteItems.length) {
    chooseFavoriteItems.forEach(item => {
      item.style.transform = `translateX(0px)`;
    })
  } else if (rangeValue > slidesVisible - 1) {
    currentPosition = -itemWidth * (rangeValue - slidesVisible);
    chooseFavoriteItems.forEach(item => {
      item.style.transform = `translateX(${currentPosition}px)`;
    })
  }
});

function onChooseFavoriteRangeInput(evt) {
  if (evt.target.value > rangeValue) {
    setPosition(currentPosition - itemWidth, true);
  } else {
    setPosition(currentPosition + itemWidth, false);
  }

  rangeValue = +chooseFavoriteRange.value;
  toggleActive();
  toggleMapPin();
  setUrl();
}

function setPosition(position, flag) {
  if (flag) {
    rangeValue += 1;

    if (rangeValue > chooseFavoriteItems.length) {
      rangeValue = 1;
      currentPosition = 0;
      chooseFavoriteItems.forEach(item => {
        item.style.transform = `translateX(${currentPosition}px)`;
      })

      return false;
    }

    if (rangeValue <= slidesVisible || currentPosition < -itemWidth * (chooseFavoriteItems.length - slidesVisible - 1)) {
      return false;
    }
  } else {
    rangeValue -= 1;

    if (rangeValue < 1) {
      rangeValue = chooseFavoriteItems.length;

      currentPosition = -itemWidth * (rangeValue - slidesVisible);

      chooseFavoriteItems.forEach(item => {
        item.style.transform = `translateX(${currentPosition}px)`;
      })

      return false;
    }

    if (rangeValue > chooseFavoriteItems.length - slidesVisible || !currentPosition) {
      return false;
    }
  }

  currentPosition = position;
  chooseFavoriteItems.forEach(item => {
    item.style.transform = `translateX(${position}px)`;
  })
}

function toggleActive() {
  chooseFavoriteItems.forEach(item => {
    item.classList.remove('choose-favorite__item--active');
  })

  chooseFavoriteItems[rangeValue - 1].classList.add('choose-favorite__item--active');
  chooseFavoriteRange.value = rangeValue;
  chooseFavoriteOutput.textContent = `0${rangeValue}`;
}


function toggleMapPin() {
  worldMapPins.forEach(item => {
    item.classList.remove('world-map__pin--active');
  })

  if (worldMapPins[rangeValue - 1]) {
    worldMapPins[rangeValue - 1].classList.add('world-map__pin--active');
  }
}

function setUrl() {
  let src;

  if (worldMapPins[rangeValue - 1]) {
    let animal = worldMapPins[rangeValue - 1].dataset.src;
    src = `../zoos/${animal}.html`
  } else {
    src = '#';
  }

  btnWatch.href = src;
}

function onBtnLeftClick() {
  setPosition(currentPosition + itemWidth, false);
  toggleActive();
  toggleMapPin();
  setUrl();
}

function onBtnRightClick() {
  setPosition(currentPosition - itemWidth, true);
  toggleActive();
  toggleMapPin();
  setUrl();
}

chooseFavoriteRange.addEventListener('input', onChooseFavoriteRangeInput);
btnLeft.addEventListener('click', onBtnLeftClick);
btnRight.addEventListener('click', onBtnRightClick);

chooseFavoriteItems.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const node = evt.target.parentElement;
    rangeValue = [...node.children].indexOf(evt.target) + 1;
    toggleActive();
    toggleMapPin();
    setUrl();
  });
})

worldMapPins.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const node = evt.target.parentElement;
    rangeValue = [...node.children].indexOf(evt.target) + 1;
    toggleMapPin();
    toggleActive();
    setUrl();

    currentPosition = 0;

    chooseFavoriteItems.forEach(item => {
      item.style.transform = `translateX(0px)`;
    })
  });
});
