import { MenuApp } from '~blocks/menu-app';

export const MenuMobile = (() => {
  const node = document.querySelector('.js-menu-mobile');
  return new MenuApp({
    node,
    data: JSON.parse(node.dataset.menu),
  });
})();
