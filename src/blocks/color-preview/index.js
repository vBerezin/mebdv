import './style.scss';

import { Handlers } from '~common/scripts/utils/handlers';
import { App } from '~common/scripts/app';

class Preview {
  #active;
  #titleEl;
  #imageEl;
  constructor(node) {
    this.el = node;
    this.#active = false;
    this.#titleEl = this.el.querySelector('[data-rel="color.preview.title"]');
    this.#imageEl = this.el.querySelector('[data-rel="color.preview.image"]');
    this.image = this.#imageEl.src;
    this.title = this.#titleEl.innerText;
    this.el.addEventListener('click', new Handlers.Click({
      'color.preview.close': ({ event }) => {
        event.preventDefault();
        return this.close();
      },
      'color.preview.select.base': ({ event }) => {
        App.stream.trigger('color.preview.select.base',{
          title: this.title,
          image: this.image,
        });
        event.preventDefault();
        return this.close();
      },
      'color.preview.select.partner': ({ event }) => {
        App.stream.trigger('color.preview.select.partner',{
          title: this.title,
          image: this.image,
        });
        event.preventDefault();
        return this.close();
      },
    }));
  }
  close() {
    this.active = false;
    return this;
  }
  open() {
    this.active = true;
    return this;
  }
  set title(value) {
    this.#titleEl.innerHTML = value;
  }
  get title() {
    return this.#titleEl.innerText;
  }
  set image(src) {
    this.#imageEl.src = src;
  }
  get image() {
    return this.#imageEl.src;
  }
  set active(state) {
    this.el.classList.toggle('is-active', state);
    this.#active = state;
  }
  get active() {
    return this.#active;
  }
}

export const ColorPreview = (() => {
  const node = document.querySelector('.js-color-preview');
  if (!node) return false;
  return new Preview(node);
})();
