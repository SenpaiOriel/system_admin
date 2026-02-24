/**
 * CVALTIS – Apply saved theme to <html> immediately to avoid FOUC.
 * Load in <head> without defer/async so it runs before first paint.
 */
(function() {
  var saved = typeof localStorage !== 'undefined' && localStorage.getItem('cvaltis-theme');
  var isDark = saved === null ? true : saved === 'dark';
  document.documentElement.classList.add(isDark ? 'theme-dark' : 'theme-light');
})();
