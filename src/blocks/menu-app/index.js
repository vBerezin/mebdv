import { Icon } from '~blocks/icon';

export class MenuApp {
  constructor({ node, data }) {
    this.el = node;
    this.data = data;
    this.render(data);
  }
  render(data) {
    const list = this.makeList(data);
    this.el.innerHTML = `<ul>${list}</ul>`;
  }
  makeList(data) {
    return data.reduce((current, item) => {
      return `${current}<li>${this.makeItem(item)}</li>`
    },'');
  }
  makeItem(data) {
    const item = document.createElement(data.href ? 'a' : 'div');
    const icon = new Icon({
      name: data.items ? 'sub' : 'right',
      mods: 'center'
    });
    item.className = 'menu-app__item';
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
