// Header Scroll
const header = document.querySelector('.header');
const activeClass = 'active';

const scrollHeader = () => {
  const scrollY = window.scrollY;
  if (scrollY >= 1) header.classList.add(activeClass);
  else header.classList.remove(activeClass);
};

const addEventOnScrollHeader = () => {
  window.addEventListener('scroll', scrollHeader);
};

addEventOnScrollHeader();

// Menu
const menu = document.querySelector('.menu');
const menuButton = document.querySelector('.open-menu');

const toggleMenu = () => {
  menu.classList.toggle(activeClass);
};

const addMenuEvents = () => {
  menuButton.addEventListener('click', toggleMenu);
};

addMenuEvents();

// Smooth Window
const internalLinks = Array.from(document.querySelectorAll('a[href^="#"]'));

const getMenuHeight = () => {
  const menu = document.querySelector('.header');
  const menuDimensions = menu.getBoundingClientRect();
  return menuDimensions.height;
};

const getTopFromElement = (event) => {
  const element = event.currentTarget;
  const id = element.getAttribute('href');
  const to = document.querySelector(id).offsetTop;
  const menuHeight = getMenuHeight() + 20;
  return to - menuHeight;
};

const scrollToPosition = (to) => {
  smoothScrollTo(0, to);
};

const scrollTo = (event) => {
  event.preventDefault();
  const topItem = getTopFromElement(event);
  scrollToPosition(topItem);
  toggleMenu();
};

const addSmoothScrollEvent = () => {
  internalLinks.forEach((link) => link.addEventListener('click', scrollTo));
};

/*
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
}

addSmoothScrollEvent();
