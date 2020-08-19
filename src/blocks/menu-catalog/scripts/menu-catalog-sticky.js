import { Header} from '~desktop/header';
import { App} from '~common/scripts/app';

export class MenuCatalogSticky {
  #active;
  constructor(node) {
    this.#active = false;
    this.el = node;
    window.addEventListener('resize', () => {
      this.active = this.#active;
    });
    App.breakpoints.on(
      ['xl', 'xxl'],
      () => {
        this.el.style.top = Header.sticky.active ? `${Header.sticky.el.offsetHeight}px` : '';
      },
      () => {
        this.el.style.top = '';
      }
    )
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
    this.el.classList.toggle('menu-catalog--sticky', state);
    this.#active = state;
  }
  get active() {
    return this.#active;
  }
}
