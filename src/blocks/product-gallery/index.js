import { OwlCarousel } from '~blocks/owl-carousel';
import { Handlers } from '~common/scripts/utils/handlers';

(() => {
  const section = document.querySelector('.js-product-gallery');
  if (!section) return false;
  const slider = section.querySelector('[data-rel="product.gallery.slider"]');
  const thumbs = section.querySelector('[data-rel="product.gallery.thumbs"]');
  function onChange(event) {
    Array.from(thumbs.children).forEach((item) => {
      const active = event.item.index === +item.dataset.index;
      item.classList.toggle('is-active', active);
    });
  }
  const carousel = new OwlCarousel({
    node: slider,
    options: {
      items: 1,
      margin: 20,
      nav: true,
      dots: false,
      onInitialized: onChange,
      onTranslated: onChange,
    }
  });
  const handler = new Handlers.Click({
    'product.gallery.to': ({ event, target }) => {
      const { index } = target.dataset;
      event.preventDefault();
      return carousel.to(index);
    },
  });
  thumbs.addEventListener('click', handler);
  carousel.init();
})();
