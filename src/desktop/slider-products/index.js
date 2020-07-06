import {documentReady} from "~common/scripts/utils/document-ready";
import { Animate} from "~common/scripts/utils/animate";

class Proto {
  constructor() {
    this.instances.push(this);
  }
}

Proto.prototype.instances = [];

class Instance extends Proto {
  #prev;
  #next;
  #body;
  #slides;
  #scrollSize;
  constructor(node) {
    super();
    this.el = node;
    this.#prev = this.el.querySelector('[data-rel="slider.products.prev"]');
    this.#next = this.el.querySelector('[data-rel="slider.products.next"]');
    this.#body = this.el.querySelector('[data-rel="slider.products.body"]');
    this.#slides = Array.from(this.#body.children);
    this.#scrollSize = this.#slides[0].offsetWidth;
    this.#body.addEventListener('scroll', () =>this.onScroll());
    this.#prev.addEventListener('click', () => this.prev());
    this.#next.addEventListener('click', () => this.next());
    this.init();
    this.onScroll();
  }
  init() {
    this.ratio = this.#body.offsetWidth / this.#body.scrollWidth;
    this.active = this.ratio < 1;
  }
  onScroll() {
    const { scrollLeft, scrollWidth, offsetWidth } = this.#body;
    this.#prev.disabled = scrollLeft === 0;
    this.#next.disabled = scrollLeft === scrollWidth - offsetWidth;
  }
  prev() {
    this.#body.scrollLeft -= this.#scrollSize;
  }
  next() {
    this.#body.scrollLeft += this.#scrollSize;
  }
  set active(state) {
    this.el.classList.toggle('is-active', state);
    this.#prev.disabled = !state;
    this.#next.disabled = !state;
  }
}

window.addEventListener('resize', () => {
  Instance.prototype.instances.forEach(instance => instance.init());
});

function init() {
  const nodes = document.querySelectorAll('.js-slider-products');
  if (!nodes || !nodes.length) return false;
  return nodes.forEach(node => new Instance(node));
}

documentReady(init);

export const SliderProducts = { init, Instance };
