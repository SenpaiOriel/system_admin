/**
 * Dashboard template – Vue app entry for dashboard.
 * Mount point: #app-dashboard (see frontend/html/template/dashboard.html).
 */
(function () {
  if (typeof window.Vue === 'undefined') return;
  window.Vue.createApp({
    template: '<div class="page-dashboard">Dashboard</div>',
  }).mount('#app-dashboard');
})();
