import { OwlCarousel } from "~blocks/owl-carousel";

(() => {
  const node = document.querySelector('.js-slider-main');
  if (!node) return false;
  const carousel = new OwlCarousel({
    node: node,
    options: {
      items: 2,
      autoWidth: true,
      dots: true,
      nav: false,
      margin: 0,
      responsive: {
        [App.breakpoints.points.sm]: {
          center: true,
          nav: true,
          dots: false,
          loop: true,
        }
      },
      onInitialized() {
        const cloned = node.querySelectorAll('.cloned img[data-src]');
        if (cloned.length) {
          cloned.forEach((clone) => {
            clone.src = clone.dataset.src;
          });
        }
      },
    },
  });
  carousel.init();
})();
