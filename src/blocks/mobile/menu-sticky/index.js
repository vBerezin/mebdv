import { Header } from '~blocks/mobile/header';
import { Handlers } from '~common/scripts/utils/handlers';

(() => {
  const menu = document.querySelector('.js-menu-sticky');
  const handler = new Handlers.Click({
    'search.open': ({ event }) => {
      Header.search.toggle();
      event.preventDefault();
    },
    'catalog.open': ({ event }) => {
      Header.catalog.toggle();
      event.preventDefault();
    },
  });
  menu.addEventListener('click', handler);
})();
