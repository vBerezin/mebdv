import './style.scss';

import { HeaderSticky } from './scripts/header-sticky';
import { App } from '~common/scripts/app';

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
  App.breakpoints.once(
    ['xxs', 'xs', 'sm'],
    () => sticky.active = false,
    () => sticky.active = true,
  );
  return { sticky };
})();
