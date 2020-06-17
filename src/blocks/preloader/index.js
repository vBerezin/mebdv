export class Preloader {
  constructor(node) {
    this.el = node;
  }
  show = () => {
    this.el.classList.add('is-active');
  };
  hide = () => {
    this.el.classList.remove('is-active');
  };
}
