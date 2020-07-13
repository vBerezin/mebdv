import './style.scss';
import {App} from "~common/scripts/app";
import {documentReady} from "~common/scripts/utils/document-ready";
import {FormAjax} from "~blocks/form-ajax";

class Instance {
  #loading;
  constructor(node) {
    this.el = node;
    this.#loading = false;
    this.form = new FormAjax.Instance(this.el);
    this.form.onsubmit = () => App.stream.trigger('cart.change');
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
