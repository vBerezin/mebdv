import { Header } from '~blocks/mobile/header';
import { Handlers } from '~common/scripts/utils/handlers';

(() => {
  const section = document.querySelector('.js-section-catalog');
  if (!section) return false;
  const handler = new Handlers.Click({
    'catalog.open': ({ event }) => {
      Header.catalog.open();
      event.preventDefault();
    }
  });
  section.addEventListener('click', handler);
})();
