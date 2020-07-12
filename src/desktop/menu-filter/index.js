import './style.scss';

import { App } from '~common/scripts/app';
import { documentReady } from '~common/scripts/utils/document-ready';
import {Handlers} from "~common/scripts/utils/handlers";

class ProtoItem {
  constructor() {
    this.instances.push(this);
  }
}

ProtoItem.prototype.instances = [];

class Item extends ProtoItem {
  #opened;
  #inputs;
  #state;
  constructor(node) {
    super();
    this.el = node;
    this.#state = new WeakMap();
    this.#inputs = this.el.querySelectorAll('input');
    this.opened = this.el.classList.contains('is-opened');
    this.el.addEventListener('click', (event) => {
      event.stopPropagation();
      ProtoItem.prototype.instances.forEach(instance => {
        if (instance !== this) {
          instance.close();
        }
      });
    });
    this.el.addEventListener('click', new Handlers.Click({
      'menu.filter.item.toggle': ({ event }) => {
        event.preventDefault();
        return this.toggle();
      }
    }));
    this.el.addEventListener('change', () => {
      this.active = this.isChanged();
    });
    Array.from(this.#inputs).forEach((input) => {
      const { value, checked } = input;
      this.#state.set(input, { value, checked });
    });
  }
  set active(state) {
    this.el.classList.toggle('is-active', state);
  }
  set opened(state) {
    this.el.classList.toggle('is-opened', state);
    this.#opened = state;
  }
  get opened() {
    return this.#opened;
  }
  close() {
    this.opened = false;
  }
  open() {
    this.opened = true;
  }
  toggle() {
    this.opened = !this.opened;
  }
  isChanged() {
    return Array.from(this.#inputs).some((input) => {
      const { value, checked } = input;
      const initial = this.#state.get(input);
      return value !== initial.value || checked !== initial.checked;
    });
  }
}

class Instance {
  constructor(node) {
    this.el = node;
    const items = this.el.querySelectorAll('[data-rel="menu.filter.item"]');
    this.items = Array.from(items).map((item) => new Item(item));
  }
}

document.addEventListener('click', () => {
  ProtoItem.prototype.instances.forEach(instance => instance.close());
});

function init(context) {
  try {
    const node = context.querySelector('.js-menu-filter');
    if (!node) return false;
    return new Instance(node);
  } catch (e) {
    App.debug(e);
  }
}

documentReady(init);

export const MenuFilter = { init, Instance };
