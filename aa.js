const container = document.querySelector(".container");
const containerCarousel = container.querySelector(".container-carousel");
const carousel = container.querySelector(".carousel");
const carouselItems = carousel.querySelectorAll(".carousel-item");
const hand = document.getElementById('hand');

// Initialize variables
let lastMoveTo = 0;
let moveTo = 0;

const createCarousel = () => {
  const carouselProps = onResize();
  const length = carouselItems.length; // Number of items
  const degrees = 360 / length; // Degrees per item
  const gap = 20; // Space between items
  const tz = distanceZ(carouselProps.w, length, gap);

  container.style.width = tz * 2 + gap * length + "px";
  container.style.height = calculateHeight(tz) + "px";

  carouselItems.forEach((item, i) => {
    const degreesByItem = degrees * i + "deg";
    item.style.setProperty("--rotatey", degreesByItem);
    item.style.setProperty("--tz", tz + "px");
  });
};

// Smooth animation function
const lerp = (a, b, n) => {
  return n * (a - b) + b;
};

// Distance Z function
const distanceZ = (widthElement, length, gap) => {
  return widthElement / 2 / Math.tan(Math.PI / length) + gap; // Distance Z of items
};

// Calculate container height using field of view and perspective distance
const calculateHeight = (z) => {
  const t = Math.atan((90 * Math.PI) / 180 / 2);
  return t * 2 * z;
};

// Calculate carousel field of view
const calculateFov = () => {
  const perspective = window.getComputedStyle(containerCarousel).perspective.split("px")[0];
  const length = Math.sqrt(carousel.offsetWidth * carousel.offsetWidth) + Math.sqrt(carousel.offsetHeight * carousel.offsetHeight);
  return 2 * Math.atan(length / (2 * perspective)) * (180 / Math.PI);
};

const updateCarousel = () => {
  moveTo += 0.2; // Adjust the speed of rotation here

  // Normalize rotation
  if (moveTo >= 360) {
    moveTo -= 360;
  }

  lastMoveTo = lerp(moveTo, lastMoveTo, 0.05);
  carousel.style.setProperty("--rotatey", lastMoveTo + "deg");

  requestAnimationFrame(updateCarousel);
};

const onResize = () => {
  return {
    w: carousel.offsetWidth,
    h: carousel.offsetHeight,
  };
};

const initCarousel = () => {
  updateCarousel();
  createCarousel();
};

initCarousel();
