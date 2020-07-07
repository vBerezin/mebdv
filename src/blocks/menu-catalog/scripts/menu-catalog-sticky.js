export class MenuCatalogSticky {
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
    parent.style.top = state ? `${this.el.offsetTop}px` : '';
    parent.style.minWidth = state ? `${this.el.offsetWidth}px` : '';
    this.el.classList.toggle('menu-catalog--sticky', state);
    this.#active = state;
  }
  get active() {
    return this.#active;
  }
}
