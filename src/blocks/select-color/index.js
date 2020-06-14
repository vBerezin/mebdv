import { Handlers } from '~common/scripts/utils/handlers';

export class SelectColor {
  constructor(node) {
    this.el = node;
    this.el.addEventListener('click', new Handlers.Click({
      'select.color.toggle': ({ event, target }) => {
        this.el.classList.toggle('is-active');
        event.preventDefault();
      }
    }));
  }
}
