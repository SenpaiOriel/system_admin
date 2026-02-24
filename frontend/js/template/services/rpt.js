/**
 * RPT service – Vue app for RPT template.
 */
(function () {
  if (typeof window.Vue === 'undefined') return;
  window.Vue.createApp({
    template: '<div class="page-rpt">RPT Service</div>',
  }).mount('#app-rpt');
})();
