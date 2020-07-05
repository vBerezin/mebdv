import {documentReady} from "~common/scripts/utils/document-ready";
import {OwlCarousel} from "~blocks/owl-carousel";
import {App} from "~common/scripts/app";

class Instance {
  #prev;
  #next;
  #slider;
  #nextText;
  constructor(node) {
    this.el = node;
    this.#prev = this.el.querySelector('[data-rel="section.products.prev"]');
    this.#next = this.el.querySelector('[data-rel="section.products.next"]');
    this.#nextText = this.#next.querySelector('span');
    this.#slider = this.el.querySelector('[data-rel="section.products.slider"]');
    this.onchange = (event) => {
      const { item, page } = event;
      const count = item.count - item.index - page.size;
      this.#nextText.innerText = `Показать еще ${Math.min(count, page.size)}`;
      this.#prev.disabled = item.index === 0;
      this.#next.disabled = count === 0;
    };
    this.carousel = new OwlCarousel({
      node: this.#slider,
      options: {
        items: 4,
        slideBy: 4,
        dots: false,
        margin: 20,
        onResized: (event) => this.onchange(event),
        onTranslated: (event) => this.onchange(event),
        onInitialized: (event) => this.onchange(event),
        responsive: {
          [App.breakpoints.points.xl]: {
            items: 5,
            slideBy: 5,
          },
          [App.breakpoints.points.xxl]: {
            items: 6,
            slideBy: 6,
          }
        }
      }
    });
    this.carousel.init();
    this.#prev.addEventListener('click', () => {
      this.carousel.prev();
    });
    this.#next.addEventListener('click', () => {
      this.carousel.next();
    });
  }
}

function init() {
  const nodes = document.querySelectorAll('.js-section-products');
  if (!nodes || !nodes.length) return false;
  return nodes.forEach(node => new Instance(node));
}

documentReady(init);

export const SectionProducts = { init, Instance };
