import { Handlers } from '~common/scripts/utils/handlers';
import { App } from '~common/scripts/app';
import { ColorItem } from '~blocks/color-item';
import { ColorPreview } from '~blocks-mobile/color-preview';

// TODO: ajax search

class Form {
  constructor(node) {
    this.el = node;
    this.selected = null;
    this.el.addEventListener('click', new Handlers.Click({
      'form.colors.option': ({ event, target }) => {
        const { image, title } = target.dataset;
        ColorPreview.image = image;
        ColorPreview.title = title;
        ColorPreview.open();
        this.selected = new ColorItem(target);
      }
    }));
    const base = this.el.querySelector('[data-rel="form.colors.base"]');
    const partner = this.el.querySelector('[data-rel="form.colors.partner"]');
    this.base = base ? new ColorItem(base) : null;
    this.partner = base ? new ColorItem(partner) : null;
  }
}

export const FormColors = (() => {
  const node = document.querySelector('.js-form-colors');
  if (!node) return false;
  const form = new Form(node);
  App.stream.on('color.preview.select.base', () => {
    if (form.base) {
      form.base.active = false;
    }
    form.selected.active = true;
    form.selected.primary = true;
    form.base = form.selected;
  });
  App.stream.on('color.preview.select.partner', () => {
    if (form.partner) {
      form.partner.active = false;
    }
    form.selected.active = true;
    form.selected.primary = false;
    form.partner = form.selected;
  });
  return form;
})();
