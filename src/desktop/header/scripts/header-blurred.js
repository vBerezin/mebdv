export class HeaderBlurred {
  #active;
  constructor(node) {
    this.el = node;
    this.active = window.CSS.supports(`
      (backdrop-filter:blur())
      or
      (-webkit-backdrop-filter:blur())
    `);
  }
  set active(state) {
    this.el.classList.toggle('header--blurred', state);
    this.#active = state;
  }
}
