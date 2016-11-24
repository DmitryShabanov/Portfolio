const works = document.getElementsByClassName('work');
const zoomButtons = document.getElementsByClassName('work__zoom');
const zoomBackground = document.getElementsByClassName('portfolio__full-background');
const zoomImage = document.getElementsByClassName('portfolio__full-image');
const zoomDecreaseButton = document.getElementsByClassName('portfolio__close-button');

function watch() {
  clear();
  this.clicked = true;
  for (let i = 0; i < zoomButtons.length; i++) {
    if (zoomButtons[i].clicked === true) {
      zoomIncrease(i);
      return;
    }
  }
}

function zoomIncrease(workNumber) {
  zoomImage[0].classList.remove('portfolio__zoomDecrease');
  zoomImage[0].classList.add('portfolio__zoomIncrease');
  zoomBackground[0].classList.remove('portfolio__zoomBgDecrease');
  zoomBackground[0].classList.add('portfolio__zoomBgIncrease');

  zoomImage[0].style.backgroundImage = works[workNumber].style.backgroundImage;
  zoomImage[0].style.display = 'block';
  zoomBackground[0].style.display = 'block';

  zoomBackground[0].addEventListener('click', zoomDecrease);
}

function zoomDecrease() {
  zoomImage[0].classList.remove('portfolio__zoomIncrease');
  zoomImage[0].classList.add('portfolio__zoomDecrease');
  zoomBackground[0].classList.remove('portfolio__zoomBgIncrease');
  zoomBackground[0].classList.add('portfolio__zoomBgDecrease');

  setTimeout(() => {
    zoomImage[0].style.display = 'none';
    zoomBackground[0].style.display = 'none';
  }, 400);
}

function clear() {
  for (let i = 0; i < zoomButtons.length; i++) {
    zoomButtons[i].clicked = false;
  }
}

function addListeners() {
  for (let i = 0; i < zoomButtons.length; i++) {
    zoomButtons[i].addEventListener('click', watch);
  }
}

addListeners();
