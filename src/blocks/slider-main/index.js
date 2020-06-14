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
    },
  });
  carousel.init();
})();
