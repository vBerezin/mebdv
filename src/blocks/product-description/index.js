import './style.scss';

import { App } from '~common/scripts/app';
import { documentReady } from '~common/scripts/utils/document-ready';
import {Handlers} from "~common/scripts/utils/handlers";

class Instance {
  #active;
  constructor(node) {
    this.el = node;
    this.#active = this.el.classList.contains('is-active');
    this.active = this.#active;
    this.el.addEventListener('click', new Handlers.Click({
      'product.description.toggle': ({ event, target }) => {
        event.preventDefault();
        this.toggle();
        target.innerHTML = this.active ? 'Скрыть описание' : 'Показать описание';
      }
    }));
  }
  open() {
    this.active = true;
  }
  close() {
    this.active = false;
  }
  toggle() {
    this.active = !this.active;
  }
  set active(state) {
    this.el.classList.toggle('is-active', state);
    this.#active = state;
  }
  get active() {
    return this.#active;
  }
}

function init(context) {
  try {
    const nodes = context.querySelectorAll('.js-product-description');
    if (!nodes || !nodes.length) return false;
    return nodes.forEach(node => new Instance(node));
  } catch (e) {
    App.debug(e);
  }
}

documentReady(init);

export const ProductDescription = { init, Instance };
