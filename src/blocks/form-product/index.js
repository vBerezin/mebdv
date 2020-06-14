import { App } from "~common/scripts/app";

(() => {
  const node = document.querySelector('.js-form-product');
  if (!node) return false;
  const nodes = {
    pricing: {
      price: node.querySelector('[data-rel="product.price"]'),
      old: node.querySelector('[data-rel="product.price.old"]'),
      discount: node.querySelector('[data-rel="product.discount"]'),
    },
    sizing: {
      base: {
        length: node.querySelector('[data-rel="product.base.length"]'),
        width: node.querySelector('[data-rel="product.base.width"]'),
        height: node.querySelector('[data-rel="product.base.height"]'),
      },
      sleep: {
        length: node.querySelector('[data-rel="product.sleep.length"]'),
        width: node.querySelector('[data-rel="product.sleep.width"]'),
        height: node.querySelector('[data-rel="product.sleep.height"]'),
      },
    },
    colors: {
      base: {
        title: node.querySelector('[data-rel="product.color.base.title"]'),
        image: node.querySelector('[data-rel="product.color.base.image"]'),
      },
      partner: {
        title: node.querySelector('[data-rel="product.color.partner.title"]'),
        image: node.querySelector('[data-rel="product.color.partner.image"]'),
      },
    }
  };
  App.stream.on('form.sizes.submit', (data) => {
    nodes.sizing.base.length.innerHTML = `${data.base[0]} см`;
    nodes.sizing.base.width.innerHTML = `${data.base[1]} см`;
    nodes.sizing.base.height.innerHTML = `${data.base[2]} см`;
    nodes.sizing.sleep.length.innerHTML = `${data.sleep[0]} см`;
    nodes.sizing.sleep.width.innerHTML = `${data.sleep[1]} см`;
    nodes.sizing.sleep.height.innerHTML = `${data.sleep[2]} см`;
  });
  App.stream.on('form.color.submit', (data) => {
    nodes.colors.base.title.innerHTML = data.base.title;
    nodes.colors.base.image.src = data.base.image;
    nodes.colors.partner.title.innerHTML = data.partner.title;
    nodes.colors.partner.image.src = data.partner.image;
  });
})();
