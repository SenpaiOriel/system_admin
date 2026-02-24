/**
 * CVALTIS – Setup app entry. Requires Vue, CVALTIS_TRANSLATIONS, CVALTIS_REGISTRATION_FORM_TEMPLATE.
 */
(function() {
  'use strict';

  if (typeof Vue === 'undefined' || !document.getElementById('app')) return;
  var translations = typeof window.CVALTIS_TRANSLATIONS !== 'undefined' ? window.CVALTIS_TRANSLATIONS : { en: {}, tl: {} };
  var registrationFormTemplate = typeof window.CVALTIS_REGISTRATION_FORM_TEMPLATE !== 'undefined'
    ? window.CVALTIS_REGISTRATION_FORM_TEMPLATE
    : '';

  function createSetupApp() {
    return Vue.createApp({
      data: function() {
        var saved = typeof localStorage !== 'undefined' && localStorage.getItem('cvaltis-theme');
        var isDark = saved === null ? true : saved === 'dark';
        return {
          isDark: isDark,
          step: 1,
          totalSteps: 5,
          totalDots: 10,
          selectedLanguage: '',
          agency: { name: '', address: '', email: '', logoDataUrl: '' },
          owner: { lastName: '', firstName: '', middleName: '', email: '', dob: '', address: '', password: '', confirmPassword: '', profileDataUrl: '' },
          showOwnerPassword: false,
          showOwnerConfirm: false,
          emailVerified: false,
          authLoading: false,
          errorMessage: '',
          stepLabelsEn: ['Language', 'Agency / Business Information', 'System Owner Registration', 'Email Verification', 'Authenticator Setup'],
          stepLabelsTl: ['Wika', 'Impormasyon ng Ahensya / Negosyo', 'Rehistrasyon ng May-ari ng Sistema', 'Pagpapatotoo ng Email', 'Setup ng Authenticator'],
          setupKey: '',
          qrDataUrl: '',
          otpCode: '',
          showOtp: false,
          otpVerified: false,
          setupComplete: false,
          emailVerificationCode: '',
          showAdmin: false,
          currentSection: 'plugins',
          pluginSearch: '',
          plugins: []
        };
      },
      provide: function() { return { setup: this }; },
      computed: {
        lang: function() { return this.selectedLanguage === 'tl' ? 'tl' : 'en'; },
        t: function() { return this.lang === 'tl' ? translations.tl : translations.en; },
        stepLabels: function() { return this.lang === 'tl' ? this.stepLabelsTl : this.stepLabelsEn; },
        sectionTitle: function() {
          var titles = this.lang === 'tl'
            ? { services: 'Mga Serbisyo', plugins: 'Mga Plugin', users: 'Mga User', 'auth-keys': 'Auth Keys', monitoring: 'Monitoring' }
            : { services: 'Services', plugins: 'Plugins', users: 'Users', 'auth-keys': 'Auth Keys', monitoring: 'Monitoring' };
          return titles[this.currentSection] || 'System Admin';
        },
        filteredPlugins: function() {
          var q = (this.pluginSearch || '').toLowerCase().trim();
          return !q ? this.plugins : this.plugins.filter(function(p) { return p.name.toLowerCase().includes(q) || p.version.toLowerCase().includes(q); });
        }
      },
      mounted: function() { this.step = 1; this.syncTheme(); },
      watch: {
        isDark: function() { this.syncTheme(); },
        step: function(n) {
          if (n === 5 && !this.setupKey && window.SystemSetupAuth && window.QRCode) {
            this.setupKey = window.SystemSetupAuth.generateSecret();
            var issuer = 'CVALTIS';
            var account = this.owner.email || 'user';
            var url = 'otpauth://totp/' + encodeURIComponent(issuer) + ':' + encodeURIComponent(account) + '?secret=' + this.setupKey + '&issuer=' + encodeURIComponent(issuer);
            var self = this;
            window.QRCode.toDataURL(url, { width: 140, margin: 1 }).then(function(u) { self.qrDataUrl = u; }).catch(function() {});
          }
        }
      },
      methods: {
        nextStep: function() {
          if (this.step === 1 && !this.selectedLanguage) { this.errorMessage = this.t.errSelectLanguage; return; }
          if (this.step === 2 && !this.validateStep2()) return;
          if (this.step === 3 && !this.submitOwnerRegistration()) return;
          if (this.step === 4 && !this.emailVerified) { this.errorMessage = this.t.errVerifyEmailFirst; return; }
          if (this.step === 5 && !this.otpVerified) { this.errorMessage = this.t.errVerifyOtpFirst; return; }
          this.errorMessage = '';
          if (this.step < this.totalSteps) this.step++;
          else this.finishSetup();
        },
        validateStep2: function() {
          var a = this.agency;
          var name = String(a.name || '').trim();
          var address = String(a.address || '').trim();
          var email = String(a.email || '').trim();
          if (!name || !address || !email) { this.errorMessage = this.t.errAgencyRequired; return false; }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { this.errorMessage = this.t.errInvalidEmail; return false; }
          if (!a.logoDataUrl) { this.errorMessage = this.t.errAgencyRequired; return false; }
          this.errorMessage = '';
          return true;
        },
        prevStep: function() { this.errorMessage = ''; if (this.step > 1) this.step--; },
        submitOwnerRegistration: function() {
          var owner = this.owner;
          var email = String(owner.email || '').trim();
          if (!String(owner.lastName || '').trim() || !String(owner.firstName || '').trim() || !String(owner.middleName || '').trim()) { this.errorMessage = this.t.errOwnerRequired; return false; }
          if (!email || !owner.password) { this.errorMessage = this.t.errEmailPassword; return false; }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { this.errorMessage = this.t.errInvalidEmail; return false; }
          if (!String(owner.dob || '').trim() || !String(owner.address || '').trim()) { this.errorMessage = this.t.errOwnerRequired; return false; }
          if (owner.password.length < 8) { this.errorMessage = this.t.errPasswordLength; return false; }
          if (!/^[a-zA-Z0-9]+$/.test(owner.password)) { this.errorMessage = this.t.errPasswordAlphanumeric; return false; }
          if (owner.password !== owner.confirmPassword) { this.errorMessage = this.t.errPasswordMatch; return false; }
          if (!owner.profileDataUrl) { this.errorMessage = this.t.errOwnerRequired; return false; }
          this.errorMessage = '';
          return true;
        },
        resendCode: function() { this.errorMessage = ''; },
        verifyEmail: function() {
          var code = String(this.emailVerificationCode || '').trim();
          if (!code || code.length < 6) { this.errorMessage = this.t.errEnterCode; return; }
          this.errorMessage = '';
          this.emailVerified = true;
        },
        checkOtp: function() {
          var self = this;
          var code = String(this.otpCode || '').trim();
          if (code.length !== 6) { this.errorMessage = this.t.errValidOtp; return; }
          if (!this.setupKey || !window.SystemSetupAuth) { this.errorMessage = this.t.errSetupKey; return; }
          window.SystemSetupAuth.verifyTOTP(this.setupKey, code).then(function(valid) {
            if (!valid) self.errorMessage = self.t.errInvalidOtp;
            else { self.errorMessage = ''; self.otpVerified = true; }
          });
        },
        finishSetup: function() { this.setupComplete = true; },
        goToAdmin: function() { this.showAdmin = true; },
        syncTheme: function() {
          var root = document.documentElement;
          root.classList.remove('theme-dark', 'theme-light');
          root.classList.add(this.isDark ? 'theme-dark' : 'theme-light');
          try { localStorage.setItem('cvaltis-theme', this.isDark ? 'dark' : 'light'); } catch (e) {}
        },
        buttonClick: function(e) { e.currentTarget.style.transform = 'scale(0.95)'; },
        buttonRelease: function(e) { e.currentTarget.style.transform = ''; },
        onAgencyLogoChange: function(e) {
          var file = e.target.files && e.target.files[0];
          if (!file || !file.type.startsWith('image/')) return;
          var self = this;
          var reader = new FileReader();
          reader.onload = function(ev) { self.agency.logoDataUrl = ev.target.result; };
          reader.readAsDataURL(file);
          e.target.value = '';
        },
        onOwnerProfileChange: function(e) {
          var file = e.target.files && e.target.files[0];
          if (!file || !file.type.startsWith('image/')) return;
          var self = this;
          var reader = new FileReader();
          reader.onload = function(ev) { self.owner.profileDataUrl = ev.target.result; };
          reader.readAsDataURL(file);
          e.target.value = '';
        }
      }
    });
  }

  var app = createSetupApp();
  app.component('RegistrationForm', { template: registrationFormTemplate, inject: ['setup'] });
  app.mount('#app');
})();
