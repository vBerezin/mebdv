import { ButtonMenu } from '~blocks/button-menu';
import { MenuSticky } from '~blocks/mobile/menu-sticky';
import { HeaderMenu } from './scripts/header-menu';
import { HeaderCatalog } from './scripts/header-catalog';
import { HeaderSearch } from './scripts/header-search';

export const Header = (() => {
  const header = document.querySelector('.js-header');
  const button = header.querySelector('[data-rel="header.toggle"]');
  const overlay = header.querySelector('[data-rel="header.overlay"]');
  const toggle = new ButtonMenu(button);
  let current = null;

  function callback(state) {
    document.body.style.overflow = state ? 'hidden' : '';
    header.style.minHeight = state ? `${header.offsetHeight}px` : '';
    if (state && current) {
      current.close();
    }
    MenuSticky.active = !state;
    toggle.active = state;
    current = state ? this : null;
  }

  const menu = new HeaderMenu(header, callback);
  const catalog = new HeaderCatalog(header, callback);
  const search = new HeaderSearch(header, callback);

  button.addEventListener('click', (event) => {
    event.preventDefault();
    if (!current) {
      return menu.toggle();
    }
    return current.close();
  });

  overlay.addEventListener('click', () => {
    current.close();
  });

  return { menu, catalog, search };
})();
