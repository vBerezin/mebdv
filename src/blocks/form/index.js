import {App} from "~common/scripts/app";
import {documentReady} from "~common/scripts/utils/document-ready";
import { SliderRange } from '~blocks/slider-range';

class Instance {
  #form;
  #success;
  constructor(node) {
    this.el = node;
    this.#form = this.el.querySelector('form');
    this.#success = this.el.querySelector('[data-rel="form.success"]');
    this.#form.addEventListener('submit', () => {
      this.#form.parentNode.removeChild(this.#form);
      this.#success.style.display = '';
      App.stream.trigger('form.submit', {
        form: this.#form
      });
    });
  }
}

function init(context) {
  try {
    const nodes = context.querySelectorAll('.js-form');
    if (!nodes || !nodes.length) return false;
    return nodes.forEach(node => new Instance(node));
  } catch (e) {
    App.debug(e);
  }
}

documentReady(init);

export const Form = { init, Instance };
