class Popup {
  constructor(el) {
    this.el = el;
    this.active = false;
    this.el.addEventListener('click', (event) => {
      const { target } = event;
      if (!target.closest('[data-rel="popup.body"]')
        || target.closest('[data-click="popup.close"]')) {
        this.close();
      }
    });
  }

  open() {
    this.active = true;
    return this;
  }

  close() {
    this.active = false;
    return this;
  }

  set active(state) {
    this.el.classList.toggle('is-active', state);
    document.body.classList.toggle('popup-opened', state);
  }
}

export { Popup };
