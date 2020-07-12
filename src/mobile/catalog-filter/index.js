import './style.scss';

import { App } from '~common/scripts/app';
import { documentReady } from '~common/scripts/utils/document-ready';

class Instance {
  #toggle;
  #options;
  #count;
  constructor(node) {
    this.el = node;
    this.#count = this.el.querySelector('[data-rel="catalog.filter.count"]');
    this.#toggle = this.el.querySelector('[data-rel="catalog.filter.toggle"]');
    this.spoilerActive = false;
    this.el.addEventListener('change', (event) => {
      const { target } = event;
      this.init();
      App.stream.trigger('catalog.filter.change', { target });
    });
    this.#toggle.addEventListener('click', (event) => {
      event.preventDefault();
      return this.spoilerActive ? this.spoilerClose() : this.spoilerOpen();
    });
    this.init();
  }
  init() {
    this.#options = this.el.querySelectorAll('[data-rel="catalog.filter.current"]');
    this.options = Array.from(this.#options);
    this.spoilerSize = +this.#toggle.dataset.count;
    this.spoilerActive = this.options.length - this.spoilerSize > 0;
    this.#count.innerHTML = this.options.length;
    this.#toggle.style.display = this.spoilerActive ? '' : 'none';
    return this.spoilerActive ? this.spoilerClose() : this.spoilerOpen();
  }
  spoilerOpen() {
    this.options.forEach((node) => {
      node.style.display = '';
    });
    this.#toggle.innerHTML = 'Свернуть';
    this.spoilerActive = true;
  }
  spoilerClose() {
    this.options.forEach((node, index) => {
      node.style.display = index + 1 > this.spoilerSize ? 'none' : '';
    });
    this.spoilerActive = false;
    this.#toggle.innerHTML = `Показать еще (${this.options.length - this.spoilerSize})`;
  }
}

function init(context) {
  try {
    const node = context.querySelector('.js-catalog-filter');
    if (!node) return false;
    return new Instance(node);
  } catch (e) {
    App.debug(e);
  }
}

documentReady(init);

export const CatalogFilter = { init, Instance };
