export class Counter {
  #val;
  constructor(node) {
    this.el = node;
    this.buttons = {
      plus: this.el.querySelector('[data-rel="counter.plus"]'),
      minus: this.el.querySelector('[data-rel="counter.minus"]'),
    };
    this.input = this.el.querySelector('[data-rel="counter.input"]');
    this.step = +this.input.step || 1;
    this.min = +this.input.min || 1;
    this.max = +this.input.max || Infinity;
    this.value = +this.input.value;
    this.input.addEventListener('keyup', () => {
      this.value = this.input.value;
    });
    this.buttons.plus.addEventListener('click', (event) => {
      this.plus();
      event.preventDefault();
    });
    this.buttons.minus.addEventListener('click', (event) => {
      this.minus();
      event.preventDefault();
    });
  }
  set value(value) {
    this.#val = this.validate(value);
    this.input.value = this.#val;
  }
  get value() {
    return this.#val;
  }
  plus() {
    this.value = this.#val + this.step;
  }
  minus() {
    this.value = this.#val - this.step;
  }
  validate(value) {
    const val = this.filter(value);
    this.buttons.plus.disabled = val > this.max - this.step;
    this.buttons.minus.disabled = val < this.min + this.step;
    if (val > this.max) return this.max;
    if (val < this.min) return this.min;
    return val;
  }
  filter(value) {
    return +value.toString().replace(/\D/,'');
  }
}
