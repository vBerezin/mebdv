export class Menu {
  #dropdowns;
  constructor(node) {
    this.el = node;
    this.#dropdowns = this.el.querySelectorAll('[data-dropdown]');
    this.dropdowns = Array.from(this.#dropdowns);
    this.el.addEventListener('mouseover', (event) => {
      const target = event.target.closest('[data-dropdown]');
      if (target) {
        const { dropdown } = target.dataset;
        this.current = dropdown;
        return this.dropdownShow(dropdown)
      }
      return this.dropdownShow(false);
    });
    this.el.addEventListener('mouseleave', () => this.dropdownShow(false));
  }
  dropdownShow(index) {
    this.dropdowns.forEach((item) => {
      item.classList.toggle('is-active', item.dataset.dropdown === index);
    });
  }
}
