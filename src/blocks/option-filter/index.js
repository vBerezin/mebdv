import './style.scss';

import { documentReady } from '~common/scripts/utils/document-ready';
import { App } from '~common/scripts/app';

class Instance {
  #active;
  constructor(node) {
    this.el = node;
    this.type = this.el.dataset.type;
    this.#active = this.el.querySelector(':checked');
    this.active = this.#active;
    this.el.addEventListener('change', (event) => {
      const { checked } = event.target;
      this.active = checked;
    });
  }
  set active(state) {
    this.el.classList.toggle('is-active', state);
    this.#active = state;
    if (this.type === 'removable' && !state) {
      this.el.parentNode.removeChild(this.el);
    }
  }
  get active() {
    return this.#active;
  }
}

function init(context) {
  try {
    const nodes = context.querySelectorAll('.js-option-filter');
    if (!nodes || !nodes.length) return false;
    return nodes.forEach(node => new Instance(node));
  } catch (e) {
    App.debug(e);
  }
}

documentReady(init);

export const OptionFilter = { init, Instance };
