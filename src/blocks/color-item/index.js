export class ColorItem {
  #active;
  #primary;
  #checked;
  constructor(node) {
    this.el = node;
  }
  set active(state) {
    this.el.classList.toggle('is-active', state);
    this.#active = state;
  }
  set checked(state) {
    this.el.classList.toggle('is-checked', state);
    this.#checked = state;
  }
  set primary(state) {
    this.el.classList.toggle('color-item--orange', state);
    this.#primary = state;
  }
}
