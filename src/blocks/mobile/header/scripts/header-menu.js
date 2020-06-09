export class HeaderMenu {
  #active;
  constructor(header, callback) {
    this.#active = false;
    this.el = header;
    this.callback = callback;
  }
  close() {
    this.active = false;
    return this;
  }
  open() {
    this.active = true;
    return this;
  }
  toggle() {
    this.active = !this.#active;
    return this.active;
  }
  set active(state) {
    this.el.classList.toggle('header--menu-active', state);
    this.callback(state);
    this.#active = state;
  }
  get active() {
    return this.#active;
  }
}
