import './style.scss';

import { App } from '~common/scripts/app';

(() => {
  const node = document.querySelector('.js-form-sizes');
  if (!node) return false;
  node.addEventListener('submit', (event) => {
    event.preventDefault();
    const checked = node.querySelector(':checked');
    if (checked) {
      const data = JSON.parse(checked.dataset.size);
      App.stream.trigger('form.sizes.submit', data);
    }
  });
})();
