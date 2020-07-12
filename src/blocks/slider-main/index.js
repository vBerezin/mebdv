import './style.scss';

import { OwlCarousel } from "~blocks/owl-carousel";
import {Handlers} from "~common/scripts/utils/handlers";

(() => {
  const node = document.querySelector('.js-slider-main');
  if (!node) return false;
  const slider = node.querySelector('[data-rel="slider.main.carousel"]');
  const carousel = new OwlCarousel({
    node: slider,
    options: {
      items: 2,
      autoWidth: true,
      dots: true,
      nav: false,
      margin: 0,
      responsive: {
        [App.breakpoints.points.md]: {
          autoWidth: false,
          items: 1,
          dots: true,
          loop: true,
        },
        [App.breakpoints.points.lg]: {
          center: true,
          items: 2,
          dots: false,
          autoWidth: true,
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
  node.addEventListener('click', new Handlers.Click({
    'slider.main.prev': carousel.prev,
    'slider.main.next': carousel.next,
  }));
  carousel.init();
})();
