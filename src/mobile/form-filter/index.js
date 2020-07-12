import './style.scss';

import { App } from '~common/scripts/app';
import { documentReady } from '~common/scripts/utils/document-ready';
import {Handlers} from "~common/scripts/utils/handlers";

class Instance {
  #inputs;
  constructor(node) {
    this.el = node;
    this.state = new WeakMap();
    this.#inputs = this.el.querySelectorAll('input');
    this.el.addEventListener('change', ({ target }) => {
      App.stream.trigger('form.filter.change', { target });
    });
    this.el.addEventListener('submit', (event) => {
      event.preventDefault();
      App.stream.trigger('form.filter.submit', new FormData(this.el));
    });
    this.el.addEventListener('reset', () => {
      App.stream.trigger('form.filter.reset', new FormData(this.el));
    });
    this.el.addEventListener('click', new Handlers.Click({
      'form.filter.reset': ({event}) => {
        event.preventDefault();
        this.reset(this.state);
        this.el.reset();
      }
    }));
    Array.from(this.#inputs).forEach((input) => {
      const { value, checked } = input;
      this.state.set(input, { value, checked });
    });
  }
  reset(state) {
    Array.from(this.#inputs).forEach((input) => {
      if (state.has(input)) {
        const { value, checked } = state.get(input);
        input.value = value;
        input.checked = checked;
        input.dispatchEvent(new Event('change', { bubbles: true }))
      }
    });
  }
}

function init(context) {
  try {
    const node = context.querySelector('.js-form-filter');
    if (!node) return false;
    return new Instance(node);
  } catch (e) {
    App.debug(e);
  }
}

documentReady(init);

export const FormFilter = { init, Instance };
