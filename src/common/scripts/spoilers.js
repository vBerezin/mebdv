import { Spoiler } from '~blocks/spoiler';

(() => {
  const nodes = document.querySelectorAll('.js-spoiler');
  if (!nodes || !nodes.length) return false;
  nodes.forEach(node => new Spoiler(node));
})();
