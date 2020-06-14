import { Header } from '~blocks-mobile/header';
import { MenuMobile } from '~blocks-mobile/menu-mobile';
import { Handlers } from '~common/scripts/utils/handlers';

(() => {
  const section = document.querySelector('.js-section-catalog');
  if (!section) return false;
  const handler = new Handlers.Click({
    'menu.open': ({ event, target }) => {
      Header.menu.open();
      MenuMobile.state = JSON.parse(target.dataset.menuState);
      event.preventDefault();
    }
  });
  section.addEventListener('click', handler);
})();
