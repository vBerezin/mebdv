import './style.scss';
import {App} from "~common/scripts/app";
import {documentReady} from "~common/scripts/utils/document-ready";
import {appPreloader} from "~blocks/app-preloader";

class Instance {
  #loading;
  constructor(node) {
    this.el = node;
    this.#loading = false;
    this.el.addEventListener('submit', (event) => this.submit(event));
  }
  async submit(event) {
    if (this.#loading) return false;
    this.#loading = true;
    event.preventDefault();
    const form = event.target;
    const { url } = form.dataset;
    appPreloader.show();
    try {
      const response = await fetch(url, {
        method: 'GET'
      });
      const html = await response.text();
      form.outerHTML = html;
      this.el.classList.add('is-checked');
      App.stream.trigger('cart.change', { event });
    } catch (e) {
      App.debug(e);
    }
    this.#loading = false;
    appPreloader.hide();
  }
}

function init(context) {
  try {
    const nodes = context.querySelectorAll('.js-product-panel');
    if (!nodes || !nodes.length) return false;
    return nodes.forEach(node => new Instance(node));
  } catch (e) {
    App.debug(e);
  }
}

documentReady(init);

export const ProductPanel = { init, Instance };
