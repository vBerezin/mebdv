import { Preloader } from '~blocks/preloader';

export const appPreloader = (() => {
  const node = document.querySelector('#js-app-preloader');
  return new Preloader(node);
})();
