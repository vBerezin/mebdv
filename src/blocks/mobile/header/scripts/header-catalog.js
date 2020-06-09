export class HeaderCatalog {
  #active;
  constructor(header, callback) {
    this.#active = false;
    this.el = header;
    this.callback = callback;
  }
  close() {
    this.active = false;
  }
  open() {
    this.active = true;
  }
  toggle() {
    this.active = !this.#active;
  }
  set active(state) {
    this.el.classList.toggle('header--catalog-active', state);
    this.callback(state);
    this.#active = state;
  }
  get active() {
    return this.#active;
  }
}
