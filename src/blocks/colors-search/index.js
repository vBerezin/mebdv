import './style.scss';

import { Handlers } from '~common/scripts/utils/handlers';
import { App } from '~common/scripts/app';
import { ColorItem } from '~blocks/color-item';
import { ColorPreview } from '~blocks/color-preview';

class Form {
  #base;
  #partner;
  constructor(node) {
    this.el = node;
    this.selected = null;
    this.el.addEventListener('click', new Handlers.Click({
      'colors.search.color': ({ event, target }) => {
        const { image, title } = target.dataset;
        ColorPreview.image = image;
        ColorPreview.title = title;
        ColorPreview.open();
        if (this.selected) {
          this.selected.checked = false;
        }
        this.selected = new ColorItem(target);
        this.selected.checked = true;
      }
    }));
    this.el.addEventListener('change', ({ target }) => {
      App.stream.trigger('change', target);
    });
    this.#base = this.el.querySelector('[data-rel="colors.search.base"]');
    this.#partner = this.el.querySelector('[data-rel="colors.search.partner"]');
    this.base = this.#base ? new ColorItem(this.#base) : null;
    this.partner = this.#partner ? new ColorItem(this.#partner) : null;
  }
}

export const FormColors = (() => {
  const node = document.querySelector('.js-colors-search');
  if (!node) return false;
  const form = new Form(node);
  App.stream.on('color.preview.select.base', () => {
    if (form.base) {
      form.base.active = false;
    }
    form.selected.active = true;
    form.selected.primary = true;
    form.selected.checked = false;
    form.base = form.selected;
  });
  App.stream.on('color.preview.select.partner', () => {
    if (form.partner) {
      form.partner.active = false;
    }
    form.selected.active = true;
    form.selected.primary = false;
    form.selected.checked = false;
    form.partner = form.selected;
  });
  return form;
})();
