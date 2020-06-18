import {App} from "~common/scripts/app";
import { Handlers } from '~common/scripts/utils/handlers';
import {documentReady} from "~common/scripts/utils/document-ready";

class Instance {
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
  open() {
    this.active = true;
  }
  close() {
    this.active = false;
  }
  toggle() {
    this.active = !this.active;
  }
  set active(state) {
    this.el.classList.toggle('is-active', state);
    this.#active = state;
  }
  get active() {
    return this.#active;
  }
}

function init(context) {
  try {
    const nodes = context.querySelectorAll('.js-spoiler');
    if (!nodes || !nodes.length) return false;
    return nodes.forEach(node => new Instance(node));
  } catch (e) {
    App.debug(e);
  }
}

documentReady(init);

export const Spoiler = { init, Instance };
