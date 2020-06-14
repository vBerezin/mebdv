import { Popup } from '~blocks/popup';
import { Handlers } from '~common/scripts/utils/handlers';

const popups = new WeakMap();
const actions = {
  'popup': ({ event, target }) => {
    const { popupId } = target.dataset;
    target.disabled = true;
    target.classList.add('is-disabled');
    event.preventDefault();
    const node = document.getElementById(popupId);
    if (node) {
      let popup = popups.get(node);
      if (!popup) {
        popup = new Popup(node);
        popups.set(node, popup);
      }
      popup.open();
    }
    target.disabled = false;
    target.classList.remove('is-disabled');
  },
};

document.addEventListener('click', new Handlers.Click(actions));

export const Popups = { popups };
