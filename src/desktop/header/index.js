import './style.scss';

import { HeaderSticky } from './scripts/header-sticky';
import { HeaderSearch } from './scripts/header-search';
import {Handlers} from "~common/scripts/utils/handlers";

App.stream.on('cart.change', async () => {
  const cart = document.getElementById('js-cart');
  try {
    const response = await fetch(
      '/mebdv/ajax/cart.html',
      {
        method: 'GET',
      });
    const html = await response.text();
    cart.outerHTML = html;
  } catch (e) {
    App.debug(e);
  }
});

export const Header = (() => {
  const header = document.querySelector('.js-header');
  const sticky = new HeaderSticky(header);
  const search = new HeaderSearch(header);
  header.addEventListener('click', new Handlers.Click({
    'header.search.toggle': ({ event }) => {
      event.stopPropagation();
      return search.toggle();
    }
  }));
  document.addEventListener('click', () => {
    search.close();
  });
  sticky.active = true;
  return { sticky, search };
})();
