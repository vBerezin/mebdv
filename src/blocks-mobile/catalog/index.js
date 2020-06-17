import { App } from '~common/scripts/app';
import { fakeAjax } from '~common/scripts/utils/fake-ajax';
import { appPreloader } from '~blocks/app-preloader';
import { LazyLoader } from '~common/scripts/lazy-loader';

(() => {
  const node = document.querySelector('.js-catalog');
  if (!node) return false;
  const list = node.querySelector('[data-rel="catalog.list"]');
  const onChange = async (data) => {
    appPreloader.show();
    try {
      await fakeAjax();
      list.innerHTML = `<h2>${data}</h2><img data-src="/images/product/panel-1.png">`;
      LazyLoader.init(list);
    } catch (e) {
      App.debug(e);
    }
    appPreloader.hide();
  };
  App.stream.on('catalog.filter.change', onChange);
  App.stream.on('form.filter.submit', onChange);
})();
