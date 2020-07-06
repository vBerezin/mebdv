import { Header } from '~mobile/header';
import { MenuMobile } from '~mobile/menu-mobile';
import { Handlers } from '~common/scripts/utils/handlers';

class Menu {
  #active;
  constructor(node) {
    this.#active = false;
    this.el = node;
  }
  set active(state) {
    this.el.style.minHeight = state ? `${this.el.offsetHeight}px` : '';
    this.el.classList.toggle('menu-sticky--active', state);
    this.#active = state;
  }
  get active() {
    return this.#active;
  }
}

export const MenuSticky = (() => {
  const node = document.querySelector('.js-menu-sticky');
  const menu = new Menu(node);
  const handler = new Handlers.Click({
    'search.open': ({ event }) => {
      Header.search.toggle();
      event.preventDefault();
    },
    'menu.open': ({ event, target }) => {
      Header.menu.toggle();
      MenuMobile.state = JSON.parse(target.dataset.menuState);
      event.preventDefault();
    },
  });
  node.addEventListener('click', handler);
  menu.active = true;
  return menu;
})();
