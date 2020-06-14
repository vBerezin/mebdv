import 'owl.carousel';
import { Icon } from '~blocks/icon';

$.fn.owlCarousel.Constructor.Plugins.Navigation.Defaults.navText = [
  new Icon({ name: 'left', mods: 'center' }).outerHTML,
  new Icon({ name: 'right', mods: 'center' }).outerHTML,
];

export function OwlCarousel({ node, options }) {
  this.el = node;
  this.options = options;
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
}

