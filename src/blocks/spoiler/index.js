import { Handlers } from '~common/scripts/utils/handlers';

export class Spoiler {
  constructor(node) {
    this.el = node;
    this.el.addEventListener('click', new Handlers.Click({
      'spoiler.toggle': ({ event, target }) => {
        this.el.classList.toggle('is-active');
        event.preventDefault();
      }
    }));
  }
}
