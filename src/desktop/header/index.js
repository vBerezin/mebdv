import { HeaderSticky } from './scripts/header-sticky';

export const Header = (() => {
  const header = document.querySelector('.js-header');
  const sticky = new HeaderSticky(header);
  sticky.active = true;
  return { sticky };
})();
