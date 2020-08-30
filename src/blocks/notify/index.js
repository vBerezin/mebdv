import './style.scss';

class Notify {
  constructor(node) {
    this.el = node;
    this.items = Array.from(this.el.children);
    if (this.items.length) {
      this.show();
      this.hide();
    }
  }
  show() {
    this.items.forEach((item, index) => {
      const delay = this.items.length - 1 - index;
      setTimeout(() => {
        item.classList.add('is-active');
      }, 1000 * delay + 2000);
    });
  }
  hide() {
    setTimeout(() => {
      this.el.classList.add('is-hidden');
    }, this.items.length * 1000 + 2000 + 5000);
  }
}
(() => {
  const node = document.querySelector('.js-notify');
  if (node) return new Notify(node);
})();
