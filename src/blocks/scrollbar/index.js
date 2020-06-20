// TODO: touch drag

export class Scrollbar {
  constructor({ node, container }) {
    this.el = node;
    this.container = container;
    this.track = this.el.querySelector('[data-rel="scrollbar.track"]');
    this.container.addEventListener('scroll', () => {
      this.move(this.container.scrollLeft / this.container.offsetWidth);
    }, { passive: true });
    window.addEventListener('resize', () => {
      this.init();
    });
    this.init();
  }
  set active(state) {
    this.container.classList.toggle('scrollbar-active', state);
    this.el.classList.toggle('is-active', state);
  }
  init() {
    this.scrollSize = this.container.scrollWidth - this.container.offsetWidth;
    this.ratio = this.container.offsetWidth / this.container.scrollWidth;
    this.track.style.width = `${this.ratio * 100}%`;
    this.move(this.container.scrollLeft / this.container.offsetWidth);
    this.active = this.ratio < 1;
  }
  move(position) {
    this.track.style.transform = `translateX(${position * 100}%)`;
  }
}
