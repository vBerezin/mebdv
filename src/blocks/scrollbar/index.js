// TODO: touch drag

class Proto {
  constructor() {
    this.instances.push(this);
  }
}

Proto.prototype.instances = [];

class Scrollbar extends Proto {
  constructor({ node, container }) {
    super();
    this.el = node;
    this.container = container;
    this.track = this.el.querySelector('[data-rel="scrollbar.track"]');
    this.container.addEventListener('scroll', () => {
      this.move(this.container.scrollLeft / this.container.offsetWidth);
    }, { passive: true });
    this.init();
  }
  init() {
    this.ratio = this.container.offsetWidth / this.container.scrollWidth;
    this.track.style.width = `${this.ratio * 100}%`;
    this.move(this.container.scrollLeft / this.container.offsetWidth);
    this.active = this.ratio < 1;
  }
  move(position) {
    this.track.style.transform = `translateX(${position * 100}%)`;
  }
  set active(state) {
    this.container.classList.toggle('scrollbar-active', state);
    this.el.classList.toggle('is-active', state);
  }
}

window.addEventListener('resize', () => {
  Scrollbar.prototype.instances.forEach(instance => instance.init());
});

export { Scrollbar };
