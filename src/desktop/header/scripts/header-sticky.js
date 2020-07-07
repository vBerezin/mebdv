export class HeaderSticky {
  #active;
  constructor(node) {
    this.#active = false;
    this.el = node;
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
    const parent = this.el.parentNode;
    parent.style.minHeight = state ? `${this.el.offsetHeight}px` : '';
    this.el.classList.toggle('header--sticky', state);
    this.#active = state;
  }
  get active() {
    return this.#active;
  }
}