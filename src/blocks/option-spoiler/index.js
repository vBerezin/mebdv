import './style.scss';

import { documentReady } from '~common/scripts/utils/document-ready';
import { App } from '~common/scripts/app';
import { Handlers } from '~common/scripts/utils/handlers';

class Instance {
  #active;
  #values;
  #inputs;
  constructor(node) {
    this.el = node;
    this.separator = this.el.dataset.separator || ', ';
    this.form = this.el.closest('form');
    this.#active = this.el.classList.contains('is-active');
    this.#values = this.el.querySelector('[data-rel="option.spoiler.values"]');
    this.#inputs = this.el.querySelectorAll('input');
    this.active = this.#active;
    this.el.addEventListener('change', () => this.onChange());
    if (this.form) {
      this.form.addEventListener('reset', () => this.onChange());
    }
    this.el.addEventListener('click', new Handlers.Click({
      'option.spoiler.toggle': () => {
        this.active = !this.active;
      }
    }));
    this.active = this.#active;
    this.onChange();
  }
  onChange() {
    this.#values.innerHTML = this.getValuesText();
  }
  getValuesText() {
    let inputs = [];
    let groups = null;
    Array.from(this.#inputs).forEach((input) => {
      const { type, checked, title, value, dataset: { group } } = input;
      if (checked) {
        inputs.push(`<span>${input.title}</span>`);
      }
      if (type === 'text') {
        const text = `<span>${title} <strong>${value}</strong></span>`;
        if (group) {
          groups = groups || {};
          groups[group] ? groups[group].push(text) : groups[group] = [text];
        } else {
          inputs.push(text);
        }
      }
    });
    if (groups) {
      inputs = inputs.concat(Object.values(groups).map(group => group.join(' ')));
    }
    return inputs.length ? inputs.join(this.separator) : 'Не выбрано';
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
