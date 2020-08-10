import { Header} from '~desktop/header';

export class MenuCatalogSticky {
  #active;
  constructor(node) {
    this.#active = false;
    this.el = node;
    window.addEventListener('resize', () => {
      this.active = this.#active;
    });
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
    parent.style.minWidth = state ? `${this.el.offsetWidth}px` : '';
    this.el.style.top = state && Header.sticky.active ? `${Header.sticky.el.offsetHeight}px` : '';
    this.el.classList.toggle('menu-catalog--sticky', state);
    this.#active = state;
  }
  get active() {
    return this.#active;
  }
}
