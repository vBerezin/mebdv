import '~common/scripts/counters';

import { LazyLoader } from '~common/scripts/lazy-loader';
import { documentReady } from '~common/scripts/utils/document-ready';

documentReady(LazyLoader.init);
