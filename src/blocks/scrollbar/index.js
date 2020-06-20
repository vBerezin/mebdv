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
    this.track.addEventListener('touchstart', (event) => {
      this.touchstart = event.touches[0].clientX;
    });
    this.track.addEventListener('touchmove', (event) => {
      const size = event.touches[0].clientX - this.touchstart;
      const position = this.container.scrollLeft + size / 10;
      const scrollLeft = size > 0 ? Math.max(position, 0) : Math.min(position, this.scrollSize);
      this.container.scrollLeft = scrollLeft;
    }, { passive: true });
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
