import { Counter } from '~blocks/counter';

(() => {
  const nodes = document.querySelectorAll('.js-counter');
  if (!nodes || !nodes.length) return false;
  nodes.forEach(node => new Counter(node));
})();
