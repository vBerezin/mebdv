import { MenuApp } from '~blocks/menu-app';

(() => {
  const menus = document.querySelectorAll('.js-menu-mobile');
  return menus.forEach((node) => {
    new MenuApp({
      node,
      data: JSON.parse(node.dataset.menu),
    });
  });
})();
