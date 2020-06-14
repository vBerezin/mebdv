import { Icon } from '~blocks/icon';
import { Handlers } from '~common/scripts/utils/handlers';

const icons = {
  back: new Icon({ name: 'left', mods: 'center' }),
  dropdown: new Icon({ name: 'sub', mods: 'center' }),
  link: new Icon({ name: 'right', mods: 'center' }),
};

export class MenuApp {
  #current;
  constructor({ node, data }) {
    this.el = node;
    this.data = data;
    this.#current = [0];
    this.el.addEventListener('click', new Handlers.Click({
      'menu.app.dropdown': ({ target, event }) => {
        event.preventDefault();
        const { index } = target.dataset;
        this.#current.push(index);
        this.state = this.#current;
      },
      'menu.app.back': ({ event }) => {
        event.preventDefault();
        this.#current.pop();
        this.state = this.#current;
      },
    }));
    this.state = this.#current;
    window.menu = this
  }
  set state(state) {
    let title = null;
    const items = state.reduce((current, index) => {
      const item = current[index];
      title = item.title;
      return item.items;
    }, this.data);
    this.#render({ items, title});
    this.#current = state;
  }
  get state() {
    return this.#current;
  }
  #render(data) {
    const head = this.#makeHead(data);
    const body = this.#makeBody(data);
    this.el.innerHTML = `${head}${body}`;
  }
  #makeHead(data) {
    if (data.title) {
      const icon = `<div class="menu-app__head-icon">${icons.back.outerHTML}</div>`;
      return `<div class="menu-app__head" data-click="menu.app.back">${icon}${data.title}</div>`;
    }
    return '';
  }
  #makeBody(data) {
    const items =  data.items.reduce((current, item, index) => {
      return `${current}<li>${this.#makeItem(item, index)}</li>`
    },'');
    return `<div class="menu-app__body"><ul>${items}</ul></div>`;
  }
  #makeItem(data, index) {
    const item = document.createElement(data.href ? 'a' : 'div');
    const icon = data.items ? icons.dropdown : icons.link;
    item.className = 'menu-app__item';
    item.href = data.href;
    if (data.active) item.classList.add('is-active');
    if (data.image) {
      const image = `<img src="${data.image.src}" alt="${data.title}"/>`;
      item.innerHTML = `<div class="menu-app__item__image">${image}</div>`;
    }
    if (data.items) {
      item.dataset.index = index;
      item.dataset.click = 'menu.app.dropdown';
    }
    item.innerHTML += `<div class="menu-app__item__title">${data.title}</div>`;
    item.innerHTML += `<div class="menu-app__item__icon">${icon.outerHTML}</div>`;
    return item.outerHTML;
  }

}
