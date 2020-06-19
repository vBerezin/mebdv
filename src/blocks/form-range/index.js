import {App} from "~common/scripts/app";
import {documentReady} from "~common/scripts/utils/document-ready";
import { SliderRange } from '~blocks/slider-range';

class Instance {
  #values;
  #slider;
  #from;
  #to;
  constructor(node) {
    this.el = node;
    this.#slider = this.el.querySelector('[data-rel="form.range.slider"]');
    this.#from = this.el.querySelector('[data-rel="form.range.from"]');
    this.#to = this.el.querySelector('[data-rel="form.range.to"]');
    this.slider = new SliderRange.Instance(this.#slider);
    this.#values = [this.#from.value, this.#to.value];
    this.slider.values = this.#values;
    this.slider.onslide = (values) => {
      this.values = values;
      this.#from.dispatchEvent(new Event('change', {
        bubbles: true,
      }));
      this.#to.dispatchEvent(new Event('change', {
        bubbles: true,
      }));
    };
    this.#from.addEventListener('change', () => this.onChange());
    this.#to.addEventListener('change', () => this.onChange());
    this.#from.addEventListener('keyup', () => this.onInput());
    this.#to.addEventListener('keyup', () => this.onInput());
  }
  onInput() {
    this.#from.value = this.filter(this.#from.value);
    this.#to.value = this.filter(this.#to.value);
  }
  onChange() {
    this.#values = [this.#from.value, this.#to.value];
    this.slider.values = this.#values;
  }
  set values(values) {
    this.#from.value = values[0];
    this.#to.value = values[1];
    this.#values = values;
  }
  get values() {
    return this.#values;
  }
  filter(value) {
    const string = value.toString().replace(/\D/mg,'');
    return parseInt(string);
  }
}

function init(context) {
  try {
    const nodes = context.querySelectorAll('.js-form-range');
    if (!nodes || !nodes.length) return false;
    return nodes.forEach(node => new Instance(node));
  } catch (e) {
    App.debug(e);
  }
}

documentReady(init);

export const FormRange = { init, Instance };
