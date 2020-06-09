import { Popup } from '~blocks/popup';
import { Handlers } from '~common/scripts/utils/handlers';

const popups = new WeakMap();
const actions = {
  'popup:open': ({ event, target: btn }) => {
    const { popupId } = btn.dataset;
    btn.disabled = true;
    btn.classList.add('is-disabled');
    event.preventDefault();
    const el = document.getElementById(popupId);
    if (el) {
      let popup = popups.get(el);
      if (!popup) {
        popup = new Popup(el);
        popups.set(el, popup);
      }
      popup.open();
    }
    btn.disabled = false;
    btn.classList.remove('is-disabled');
  },
};

window.popups = popups;

const clickHandler = new Handlers.Click(actions);

document.addEventListener('click', clickHandler);
