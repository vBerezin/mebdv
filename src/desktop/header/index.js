import { HeaderSticky } from './scripts/header-sticky';
import { HeaderBlurred } from './scripts/header-blurred';

export const Header = (() => {
  const header = document.querySelector('.js-header');
  const sticky = new HeaderSticky(header);
  const blurred = new HeaderBlurred(header);
  sticky.active = true;
  return { sticky };
})();
