import { Scrollbar } from '~blocks/scrollbar';
import {documentReady} from "~common/scripts/utils/document-ready";


class Instance {
  #container;
  #scrollbar;
  constructor(node) {
    this.el = node;
    this.#container = this.el.querySelector('[data-rel="slider.products.container"]');
    this.#scrollbar = this.el.querySelector('[data-rel="slider.products.scrollbar"]');
    this.scrollbar = new Scrollbar({ node: this.#scrollbar, container: this.#container });
  }
}

function init() {
  const nodes = document.querySelectorAll('.js-slider-products');
  if (!nodes || !nodes.length) return false;
  return nodes.forEach(node => new  Instance(node));
}

documentReady(init);

export const SliderProducts = { init, Instance };
