import { MenuCatalogSticky } from './scripts/menu-catalog-sticky';

export const MenuCatalog = (() => {
  const menu = document.querySelector('.js-menu-catalog');
  const sticky = new MenuCatalogSticky(menu);
  sticky.active = true;
  return { sticky };
})();
