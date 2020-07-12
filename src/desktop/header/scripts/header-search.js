import { FormSearch } from '~blocks/form-search';

export class HeaderSearch {
  #active;
  #search;
  constructor(header) {
    this.#active = false;
    this.el = header;
    this.#search = header.querySelector('[data-rel="header.search.form"]');
    this.search = new FormSearch(this.#search);
    this.#search.addEventListener('click', event => event.stopPropagation());
  }
  close() {
    this.active = false;
  }
  open() {
    this.active = true;
  }
  toggle() {
    this.active = !this.#active;
  }
  set active(state) {
    this.el.classList.toggle('header--search-active', state);
    this.#active = state;
    if (state) this.search.focus();
  }
  get active() {
    return this.#active;
  }
}
