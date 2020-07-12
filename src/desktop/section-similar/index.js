import './style.scss';

import {documentReady} from "~common/scripts/utils/document-ready";

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
    this.#prev = this.el.querySelector('[data-rel="section.similar.prev"]');
    this.#next = this.el.querySelector('[data-rel="section.similar.next"]');
    this.#body = this.el.querySelector('[data-rel="section.similar.body"]');
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
    this.#prev.disabled = scrollLeft <= 0;
    this.#next.disabled = scrollLeft >= scrollWidth - offsetWidth;
  }
  prev() {
    this.#body.scrollBy(-this.#scrollSize, 0);
  }
  next() {
    this.#body.scrollBy(this.#scrollSize, 0);
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
  const nodes = document.querySelectorAll('.js-section-similar');
  if (!nodes || !nodes.length) return false;
  return nodes.forEach(node => new Instance(node));
}

documentReady(init);

export const SectionSimilar = { init, Instance };
