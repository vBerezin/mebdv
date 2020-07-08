import { App } from '~common/scripts/app';

(() => {
  const nodes = document.querySelectorAll('.js-input-phone');
  if (!nodes || !nodes.length) return false;
  import(/* webpackChunkName: "Inputmask" */ 'inputmask')
    .then((module) => {
      const Inputmask = module.default;
      Inputmask().mask(nodes);
    })
    .catch(App.debug);
})();
