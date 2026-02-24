/**
 * Home template – Vue app entry for home page.
 * Mount point: #app-home (see frontend/html/template/home.html).
 */
(function () {
  if (typeof window.Vue === 'undefined') return;
  window.Vue.createApp({
    template: '<div class="page-home">Home</div>',
  }).mount('#app-home');
})();
