import { SelectColor } from '~blocks/select-color';

(() => {
  const nodes = document.querySelectorAll('.js-select-color');
  if (!nodes || !nodes.length) return false;
  return Array.from(nodes).forEach(node => new SelectColor(node));
})();
