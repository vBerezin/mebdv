import { App } from '~common/scripts/app';
import { documentReady } from '~common/scripts/utils/document-ready';

class Instance {
  #value;
  constructor(node) {
    this.el = node;
    this.symbol = '₽';
    this.el.addEventListener('focus', () => this.onFocus());
    this.el.addEventListener('focusout', () => this.onChange());
    this.el.addEventListener('keyup', () => this.onInput());
    this.el.addEventListener('change', () => this.onChange());
    this.value = this.el.value;
    this.onChange();
  }
  onFocus() {
    this.value = this.el.value;
  }
  onChange() {
    this.#value = this.validate(this.el.value);
    this.el.value = `${this.#value} ${this.symbol}`;
  }
  onInput() {
    this.value = this.el.value;
  }
  set value(value) {
    this.#value = this.validate(value);
    this.el.value = this.#value;
  }
  get value() {
    return this.#value;
  }
  validate(value) {
    const string = value.replace(/\D/mg,'');
    const number = parseInt(string);
    return number ? number.toLocaleString() : 0;
  }
}

function init(context) {
  try {
    const nodes = context.querySelectorAll('.js-input-price');
    if (!nodes || !nodes.length) return false;
    return nodes.forEach(node => new Instance(node));
  } catch (e) {
    App.debug(e);
  }
}

documentReady(init);

export const InputPrice = { init, Instance };
