export class MenuCatalogScroll {
  #up;
  #down;
  #nav;
  #request;
  constructor(node) {
    this.el = node;
    this.#up = this.el.querySelector('[data-rel="menu.catalog.up"]');
    this.#down = this.el.querySelector('[data-rel="menu.catalog.down"]');
    this.#nav = this.el.querySelector('[data-rel="menu.catalog.nav"]');

    this.#up.addEventListener('mouseenter', () => {
      this.stop();
      this.scrollTop();
    });
    this.#up.addEventListener('mouseleave', () => {
      this.stop();
    });
    this.#up.addEventListener('click', () => {
      this.stop();
      this.#nav.scrollTop = 0;
    });
    this.#down.addEventListener('mouseenter', () => {
      this.stop();
      this.scrollDown();
    });
    this.#down.addEventListener('mouseleave', () => {
      this.stop();
    });
    this.#down.addEventListener('click', () => {
      this.stop();
      this.#nav.scrollTop = this.#nav.scrollHeight - this.#nav.offsetHeight;
    });
    this.#nav.addEventListener('scroll', () => {
      this.onScroll();
    });
    this.onScroll();
  }
  stop() {
    window.cancelAnimationFrame(this.#request);
    this.#request = null;
  }
  scrollTop() {
    this.#request = window.requestAnimationFrame(() => {
      this.#nav.scrollTop -= 4;
      this.scrollTop();
    });
  }
  scrollDown() {
    this.#request = window.requestAnimationFrame(() => {
      this.#nav.scrollTop += 4;
      this.scrollDown();
    });
  }
  onScroll() {
    const top = this.#nav.scrollTop === 0;
    const bottom = this.#nav.scrollHeight - this.#nav.scrollTop === this.#nav.offsetHeight;
    this.#up.disabled = top;
    this.#down.disabled = bottom;
    if (top || bottom) {
      this.stop();
    }
  }
}
