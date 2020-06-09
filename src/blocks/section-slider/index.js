import { OwlCarousel } from "~blocks/owl-carousel";

(() => {
  const section = document.querySelector('.js-section-slider');
  const slider = section.querySelector('[data-rel="section.slider.carousel"]');
  const carousel = new OwlCarousel({
    node: slider,
    options: {
      items: 2,
      autoWidth: true,
      dots: true,
      nav: false,
    },
  });
  carousel.init();
})();
