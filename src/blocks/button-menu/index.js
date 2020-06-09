export class ButtonMenu {
  #active;
  constructor(node) {
    this.el = node;
    this.#active = false;
  }
  set active(state) {
    this.el.classList.toggle('is-active', state);
    this.el.classList.toggle('icon-box--blue', state);
    this.el.classList.toggle('icon-box--white', !state);
    this.#active = state;
  }
  get active() {
    return this.#active;
  }
}
