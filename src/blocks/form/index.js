import {App} from "~common/scripts/app";
import {documentReady} from "~common/scripts/utils/document-ready";
import './style.scss';

class Instance {
  #form;
  #success;
  constructor(node) {
    this.el = node;
    this.#form = this.el.querySelector('form');
    this.#success = this.el.querySelector('[data-rel="form.success"]');
    this.#form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.#form.parentNode.removeChild(this.#form);
      this.#success.style.display = '';
      App.stream.trigger('form.submit', {
        event,
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
