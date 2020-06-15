import { Handlers } from '~common/scripts/utils/handlers';

class Spoiler {
  #active;
  constructor(node) {
    this.el = node;
    this.#active = this.el.classList.contains('is-active');
    this.active = this.#active;
    this.el.addEventListener('click', new Handlers.Click({
      'spoiler.toggle': ({ event }) => {
        event.preventDefault();
        return this.toggle();
      }
    }));
  }
  set active(state) {
    this.el.classList.toggle('is-active', state);
    this.#active = state;
  }
  get active() {
    return this.#active;
  }
  open() {
    this.active = true;
  }
  close() {
    this.active = false;
  }
  toggle() {
    this.active = !this.active;
  }
}

(() => {
  const nodes = document.querySelectorAll('.js-spoiler');
  if (!nodes || !nodes.length) return false;
  nodes.forEach(node => new Spoiler(node));
})();

