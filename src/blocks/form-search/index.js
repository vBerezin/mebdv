export class FormSearch {
  constructor(node) {
    this.el = node;
    this.button = this.el.querySelector('[data-rel="form.search.submit"]');
    this.input = this.el.querySelector('[data-rel="form.search.input"]');
  }
  focus() {
    this.input.focus();
  }
}
