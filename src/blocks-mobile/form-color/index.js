import { App } from '~common/scripts/app';

class Form {
  #nodes;
  constructor(node) {
    this.el = node;
    this.#nodes = {
      base: {
        title: this.el.querySelector('[data-rel="form.color.base.title"]'),
        image: this.el.querySelector('[data-rel="form.color.base.image"]'),
      },
      partner: {
        title: this.el.querySelector('[data-rel="form.color.partner.title"]'),
        image: this.el.querySelector('[data-rel="form.color.partner.image"]'),
      },
    };
    this.value = {
      base: {
        title: this.#nodes.base.title.innerText,
        image: this.#nodes.base.image.src,
      },
      partner: {
        title: this.#nodes.partner.title.innerText,
        image: this.#nodes.partner.image.src,
      },
    };
    this.el.addEventListener('submit', (event) => {
      event.preventDefault();
      App.stream.trigger('form.color.submit', this.value);
    });
  }
}

export const FormColor = (() => {
  const node = document.querySelector('.js-form-color');
  if (!node) return false;
  return new Form(node);
})();
