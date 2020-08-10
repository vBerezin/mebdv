import './style.scss';

import { Menu } from './scripts/menu';
import { MenuCatalogSticky } from './scripts/menu-catalog-sticky';

export const MenuCatalog = (() => {
  const node = document.querySelector('.js-menu-catalog');
  const sticky = new MenuCatalogSticky(node);
  const menu = new Menu(node);
  sticky.active = true;
  return { sticky, menu };
})();
