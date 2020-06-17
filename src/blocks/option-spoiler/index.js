import { documentReady } from '~common/scripts/utils/document-ready';
import { App } from '~common/scripts/app';

class Instance {
  #active;
  constructor(node) {
    this.el = node;
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
  }
  get active() {
    return this.#active;
  }
}

function init(context) {
  try {
    const nodes = context.querySelectorAll('.js-option-spoiler');
    if (!nodes || !nodes.length) return false;
    return nodes.forEach(node => new Instance(node));
  } catch (e) {
    App.debug(e);
  }
}

documentReady(init);

export const OptionSpoiler = { init, Instance };
