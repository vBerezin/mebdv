import './style.scss';

import { App } from '~common/scripts/app';
import { documentReady } from '~common/scripts/utils/document-ready';
import 'webpack-jquery-ui/slider';
import 'jquery-ui-touch-punch';

class Instance {
  #values;
  #slider;
  #onchange;
  #onslide;
  constructor(node) {
    this.el = node;
    this.#slider = this.el.querySelector('[data-rel="slider.range.slider"]');
    this.min = +this.el.dataset.min;
    this.max = +this.el.dataset.max;
    this.step = +this.el.dataset.step;
    this.#onchange = new Set();
    this.#onslide = new Set();

    $(this.#slider).slider({
      range: true,
      min: this.min,
      max: this.max,
      orientation: 'horizontal',
      create: ( event, ui ) => {
        this.#values = ui.values;
        this.trigger('change');
      },
      change: ( event, ui ) => {
        this.#values = ui.values;
        this.trigger('change');
      },
      slide: ( event, ui ) => {
        this.#values = ui.values;
        this.trigger('slide');
      }
    });
  }
  set onchange(callback) {
    this.#onchange.add(callback);
  }
  set onslide(callback) {
    this.#onslide.add(callback);
  }
  set values(values) {
    const val = values.map((value) => {
      const number = this.filter(value);
      if (number > this.max) return this.max;
      if (number < this.min) return this.min;
      return number;
    });
    $(this.#slider).slider( 'option', 'values', val);
    this.#values = val;
  }
  get values() {
    return this.#values;
  }
  trigger(name) {
    if (name === 'change') {
      Array.from(this.#onchange).forEach((callback) => {
        callback(this.#values);
      });
    }
    if (name === 'slide') {
      Array.from(this.#onslide).forEach((callback) => {
        callback(this.#values);
      });
    }
    return this;
  }
  filter(value) {
    const string = value.toString().replace(/\D/mg,'');
    return parseInt(string);
  }
}

function init(context) {
  try {
    const nodes = context.querySelectorAll('.js-slider-range');
    if (!nodes || !nodes.length) return false;
    return nodes.forEach(node => new Instance(node));
  } catch (e) {
    App.debug(e);
  }
}

documentReady(init);

export const SliderRange = { init, Instance };
