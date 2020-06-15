export class ColorItem {
  #active;
  #primary;
  constructor(node) {
    this.el = node;
  }
  set active(state) {
    this.el.classList.toggle('is-active', state);
    this.#active = state;
  }
  set primary(state) {
    this.el.classList.toggle('color-item--orange', state);
    this.#primary = state;
  }
}
