/**
 * Main entry script. Loaded by HTML; initializes page-specific apps
 * (e.g. system-setup) when their root element and module are present.
 */
(function () {
  var appEl = document.getElementById('app');
  if (appEl && window.SystemSetup && typeof window.SystemSetup.init === 'function') {
    window.SystemSetup.init();
  }
})();
