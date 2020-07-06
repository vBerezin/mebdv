import { App } from '~common/scripts/app';
import { fakeAjax } from '~common/scripts/utils/fake-ajax';
import { appPreloader } from '~blocks/app-preloader';
import { LazyLoader } from '~common/scripts/lazy-loader';
import { Handlers } from '~common/scripts/utils/handlers';

(() => {
  const node = document.querySelector('.js-catalog');
  if (!node) return false;
  const filter = node.querySelector('[data-rel="catalog.filter"]');
  const list = node.querySelector('[data-rel="catalog.list"]');
  const pager = node.querySelector('[data-rel="catalog.pager"]');
  async function loadMore(url) {
    try {
      await fakeAjax();
      list.insertAdjacentHTML('beforeend', `<h2>${url}</h2>`);
      pager.innerHTML = '<h2>аякс pager</h2>';
      LazyLoader.init(list);
    } catch (e) {
      App.debug(e);
    }
  }
  App.stream.on('catalog.filter.change', App.debug);
  App.stream.on('form.filter.submit', App.debug);
  node.addEventListener('click', new Handlers.Click({
    'catalog.more': async ({ target }) => {
      const { pageCurrent, pageCount, pageUrl } = target.dataset;
      const next = +pageCurrent + 1;
      const request = `${pageUrl}${next}`;
      target.disabled = true;
      appPreloader.show();
      try {
        await loadMore(request);
        target.dataset.pageCurrent = `${next}`;
        if (+pageCount - next === 0) {
          target.parentNode.removeChild(target);
        }
      } catch (e) {
        App.debug(e);
      }
      target.disabled = false;
      appPreloader.hide();
    }
  }));
})();
