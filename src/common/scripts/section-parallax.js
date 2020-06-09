import { Observer } from '~blocks/observer';
import { ParallaxScroll } from '~blocks/parallax-scroll';

export function SectionParallax(node) {
  this.section = node;
  this.parallax = null;
  this.items = node.querySelectorAll('[data-parallax]');
  this.init = () => {
    if (!this.parallax) {
      const items = Array.from(this.items);
      const layers = items.map(item => ({ node: item, parallax: item.dataset.parallax || 0.5 }));
      this.parallax = new ParallaxScroll(layers);
    }
    this.parallax.init();
    Observer.observe({
      node: this.section,
      once: false,
      callback: (isVisible) => {
        this.parallax.active = isVisible;
      },
    });
  };
  this.destroy = () => {
    if (this.parallax) {
      this.parallax.destroy();
    }
    Observer.unobserve(this.section);
  };
}
