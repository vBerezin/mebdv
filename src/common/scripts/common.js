import { App } from '~common/scripts/app';
import { LazyLoader } from '~common/scripts/lazy-loader';
import { documentReady } from '~common/scripts/utils/document-ready';
import '~common/scripts/popups';

documentReady(LazyLoader.init);

global.$ = $;
global.App = App;
