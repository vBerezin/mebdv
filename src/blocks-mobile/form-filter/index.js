import { App } from '~common/scripts/app';
import { documentReady } from '~common/scripts/utils/document-ready';

class Instance {
  constructor(node) {
    this.el = node;
    this.el.addEventListener('change', ({ target }) => {
      App.stream.trigger('form.filter.change', { target });
    });
    this.el.addEventListener('reset', () => {
      App.stream.trigger('form.filter.reset', new FormData(this.el));
    });
    this.el.addEventListener('submit', (event) => {
      event.preventDefault();
      App.stream.trigger('form.filter.submit', new FormData(this.el));
    });

  }
}

function init(context) {
  try {
    const node = context.querySelector('.js-form-filter');
    if (!node) return false;
    return new Instance(node);
  } catch (e) {
    App.debug(e);
  }
}

documentReady(init);

export const FormFilter = { init, Instance };
