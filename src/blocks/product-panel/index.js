import './style.scss';
import {App} from "~common/scripts/app";
import {documentReady} from "~common/scripts/utils/document-ready";
import {FormAjax} from "~blocks/form-ajax";
import {Handlers} from "~common/scripts/utils/handlers";

class Instance {
  #loading;
  #slides;
  constructor(node) {
    this.el = node;
    this.#loading = false;
    this.#slides = this.el.querySelectorAll('[data-rel="product.panel.slide"]');
    this.slides = this.#slides ? Array.from(this.#slides) : null;
    this.form = new FormAjax.Instance(this.el);
    this.form.onsubmit = () => App.stream.trigger('cart.change');
    this.el.addEventListener('click', new Handlers.Click({
      'product.panel.thumb': ({ target, event }) => {
        event.preventDefault();
        const { index } = target.dataset;
        return this.toSlide(index);
      }
    }));
  }
  toSlide(target) {
    if (!this.slides) return false;
    this.slides.forEach((slide) => {
      const { index } = slide.dataset;
      slide.classList.toggle('is-active', index === target);
    });
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
