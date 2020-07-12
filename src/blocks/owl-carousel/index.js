import './style.scss';

import 'owl.carousel';
import { Icon } from '~blocks/icon';

$.fn.owlCarousel.Constructor.Plugins.Navigation.Defaults.navText = [
  new Icon({ name: 'left', mods: 'center' }).outerHTML,
  new Icon({ name: 'right', mods: 'center' }).outerHTML,
];

export function OwlCarousel({ node, options }) {
  this.el = node;
  this.options = options;
  this.slides = Array.from(this.el.children);
  this.init = () => {
    this.el.classList.add('owl-carousel');
    $(this.el).owlCarousel(this.options);
    return this;
  };
  this.destroy = () => {
    $(this.el).trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
    $(this.el).find('.owl-stage-outer').children().unwrap();
    $(this.el).find('.owl-thumbs').remove();
    return this;
  };
  this.to = (index) => {
    $(this.el).trigger('to.owl.carousel', index);
    return this;
  };
  this.next = () => {
    $(this.el).trigger('next.owl.carousel');
    return this;
  };
  this.prev = () => {
    $(this.el).trigger('prev.owl.carousel');
    return this;
  };
  this.center = () => {
    return this.to(Math.ceil(this.slides.length / 2));
  };
}

