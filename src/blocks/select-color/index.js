import './style.scss';

import { Handlers } from '~common/scripts/utils/handlers';

class SelectColor {
  constructor(node) {
    this.el = node;
    this.el.addEventListener('click', new Handlers.Click({
      'select.color.toggle': ({ event }) => {
        this.el.classList.toggle('is-active');
        event.preventDefault();
      }
    }));
  }
}

(() => {
  const nodes = document.querySelectorAll('.js-select-color');
  if (!nodes || !nodes.length) return false;
  return Array.from(nodes).forEach(node => new SelectColor(node));
})();
