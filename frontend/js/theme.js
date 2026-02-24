/**
 * Apply saved theme (dark/light) to document before first paint to avoid FOUC.
 */
(function () {
  var saved = localStorage.getItem('cvaltis-theme');
  var isDark = saved === null ? true : saved === 'dark';
  document.documentElement.classList.add(isDark ? 'theme-dark' : 'theme-light');
})();
