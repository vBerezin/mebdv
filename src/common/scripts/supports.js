if (window.CSS.supports(`(backdrop-filter:blur()) or (-webkit-backdrop-filter:blur())`)) {
  document.documentElement.classList.add('supports-backdrop-filter');
}
