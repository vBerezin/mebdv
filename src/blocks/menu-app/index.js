import { Icon } from '~blocks/icon';

export class MenuApp {
  #current;
  constructor({ node, data }) {
    this.el = node;
    this.data = data;
    this.#current = [];
    this.render()
  }
  render() {
    const head = this.#makeHead(this.data);
    const body = this.#makeBody(this.data);
    this.el.innerHTML = `${head}${body}`;
  }
  #makeHead() {
    return `<div class="menu-app__head"></div>`;
  }
  #makeBody(data) {
    const items =  data.reduce((current, item, index) => {
      return `${current}<li>${this.#makeItem(item, index)}</li>`
    },'');
    return `<div class="menu-app__body"><ul>${items}</ul></div>`;
  }
  #makeItem(data, index) {
    const item = document.createElement(data.href ? 'a' : 'div');
    const icon = new Icon({
      name: data.items ? 'sub' : 'right',
      mods: 'center'
    });
    item.className = 'menu-app__item';
    item.dataset.index = index;
    item.dataset.click = 'menu.app.to';
    item.href = data.href;
    if (data.active) item.classList.add('is-active');
    if (data.image) {
      const image = document.createElement('img');
      image.src = data.image.src;
      item.innerHTML = `<div class="menu-app__item__image">${image.outerHTML}</div>`;
    }
    item.innerHTML += `<div class="menu-app__item__title">${data.title}</div>`;
    item.innerHTML += `<div class="menu-app__item__icon">${icon.outerHTML}</div>`;
    return item.outerHTML;
  }

}
