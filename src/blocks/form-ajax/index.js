import {App} from '~common/scripts/app';
import {documentReady} from '~common/scripts/utils/document-ready';
import {appPreloader} from '~blocks/app-preloader';
import {Stream} from '~common/scripts/utils/stream';

class Instance {
  #loading;
  #stream;
  constructor(node) {
    this.el = node;
    this.#loading = false;
    this.#stream = new Stream();
    this.el.addEventListener('submit', (event) => this.submit(event));
  }
  set onsubmit(callback) {
    this.#stream.on('submit', () => callback());
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
      form.outerHTML = await response.text();
      this.#stream.trigger('submit');
    } catch (e) {
      App.debug(e);
    }
    this.#loading = false;
    appPreloader.hide();
  }
}

function init(context) {
  try {
    const nodes = context.querySelectorAll('.js-form-ajax');
    if (!nodes || !nodes.length) return false;
    return nodes.forEach(node => new Instance(node));
  } catch (e) {
    App.debug(e);
  }
}

documentReady(init);

export const FormAjax = { init, Instance };
