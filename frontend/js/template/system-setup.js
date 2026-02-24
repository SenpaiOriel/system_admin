/**
 * System Setup Vue app. Mounts to #app; fetches registration-form-template.html
 * for the RegistrationForm component. Exposes init() for main.js to call.
 */
(function () {
  function createSetupApp(rootTemplate) {
    var options = {
      data: function () {
        var saved = typeof localStorage !== 'undefined' && localStorage.getItem('cvaltis-theme');
        var isDark = saved === null ? true : saved === 'dark';
        return {
          isDark: isDark,
          step: 1,
          totalSteps: 6,
          totalDots: 6,
          selectedLanguage: '',
          agency: { name: '', address: '', email: '', logoDataUrl: '' },
          ownerInfo: { ownerName: '', locationAddress: '', ownerEmail: '', locationAddress2: '' },
          owner: { lastName: '', firstName: '', middleName: '', email: '', dob: '', address: '', password: '', confirmPassword: '', profileDataUrl: '' },
          showOwnerPassword: false,
          showOwnerConfirm: false,
          addressFieldFocused: false,
          emailVerified: false,
          authLoading: false,
          errorMessage: '',
          stepLabelsEn: ['Language', 'Agency Information', 'Owner Information', 'System Admin Registration', 'Email Verification', 'Authenticator Setup'],
          stepLabelsTl: ['Wika', 'Impormasyon ng Ahensya', 'Impormasyon ng May-ari', 'Rehistrasyon ng System Admin', 'Pagpapatotoo ng Email', 'Setup ng Authenticator'],
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
          plugins: [],
        };
      },
      provide: function () {
        return { setup: this };
      },
      computed: {
        lang: function () {
          return this.selectedLanguage === 'tl' ? 'tl' : 'en';
        },
        t: function () {
          var en = {
            welcome: 'Welcome to the',
            systemSubtitle: 'A Centralized Virtual Administration of Local Transaction and Integrated Services System.',
            instruction: 'Just fill in the information below to setup the system to your liking.',
            logoHolder: 'AGENCY LOGO HOLDER',
            logoHolderHint: 'Appears after uploading Logo',
            step1Title: 'Select your language',
            selectLanguagePlaceholder: 'Select language...',
            step2Intro: 'Agency or business details.',
            agencyName: 'Agency / Business Name',
            agencyAddress: 'Location / Address',
            agencyEmail: 'Agency Email',
            agencyLogo: 'Agency Logo',
            changeLogo: 'Change logo',
            step3Intro: 'Owner information for the system.',
            ownerName: 'Owner Name',
            locationAddress: 'Location / Address',
            ownerEmail: 'Owner Email',
            locationAddress2: 'Location / Address (Secondary)',
            step4Intro: 'System admin registration details.',
            step3Sublabel: 'The appointed System Admin should assist.',
            uploadProfile: 'Upload profile',
            changePhoto: 'Change photo',
            lastName: 'Last Name',
            firstName: 'First Name',
            middleName: 'Middle Name',
            email: 'Email',
            dateOfBirth: 'Date of Birth',
            homeAddress: 'Home Address',
            password: 'Password',
            confirmPassword: 'Confirm Password',
            step5Intro: "Email verification step.",
            emailVerifyInstruction: 'Type in the verification code we sent to',
            emailVerifiedMsg: 'Email verified. Click NEXT to continue.',
            emailVerifyCode: 'Email Verification Code',
            resendCode: 'RESEND CODE',
            verify: 'VERIFY',
            step6Intro: "Authenticator setup.",
            authenticatorInstruction: 'Install an Authenticator app and use it to scan the QR code or enter the key to get a login OTP.',
            setupKey: 'Setup Key',
            enterOtp: 'Enter OTP',
            checkOtp: 'CHECK OTP',
            errorHandler: 'Error Handler message',
            previous: 'PREVIOUS',
            next: 'NEXT',
            finish: 'FINISH',
            setupCompleteTitle: 'Setup complete',
            setupCompleteMsg: 'You can now sign in with your email and password.',
            openSystemAdmin: 'Open System Admin',
            errSelectLanguage: 'Please select a language.',
            errEmailPassword: 'Email and password are required.',
            errPasswordLength: 'Password must be at least 6 characters.',
            errPasswordMatch: 'Passwords do not match.',
            errEnterCode: 'Please enter the 6-digit code.',
            errValidOtp: 'Please enter a valid 6-digit OTP.',
            errSetupKey: 'Setup key not ready. Refresh and try again.',
            errInvalidOtp: 'Invalid OTP. Try again.',
            yourEmail: 'your email',
          };
          var tl = {
            welcome: 'Maligayang pagdating sa',
            systemSubtitle: 'Isang Sentralisadong Virtual na Administrasyon ng Lokal na Transaksyon at Pinagsamang Serbisyong Sistema.',
            instruction: 'Punan lamang ang impormasyon sa ibaba para ma-setup ang sistema ayon sa iyong kagustuhan.',
            logoHolder: 'LALAGYAN NG LOGO NG AHENSYA',
            logoHolderHint: 'Lalabas pag na-upload ang logo',
            step1Title: 'Pumili ng iyong wika',
            selectLanguagePlaceholder: 'Pumili ng wika...',
            step2Intro: 'Mga detalye ng ahensya o negosyo.',
            agencyName: 'Pangalan ng Ahensya / Negosyo',
            agencyAddress: 'Lokasyon / Adres',
            agencyEmail: 'Email ng Ahensya',
            agencyLogo: 'Logo ng Ahensya',
            changeLogo: 'Palitan ang logo',
            step3Intro: 'Impormasyon ng may-ari para sa sistema.',
            ownerName: 'Pangalan ng May-ari',
            locationAddress: 'Lokasyon / Adres',
            ownerEmail: 'Email ng May-ari',
            locationAddress2: 'Lokasyon / Adres (Pangalawa)',
            step4Intro: 'Mga detalye ng rehistrasyon ng system admin.',
            step3Sublabel: 'Dapat tumulong ang itinalagang System Admin.',
            uploadProfile: 'Mag-upload ng profile',
            changePhoto: 'Palitan ang larawan',
            lastName: 'Apelyido',
            firstName: 'Pangalan',
            middleName: 'Gitnang Pangalan',
            email: 'Email',
            dateOfBirth: 'Petsa ng Kapanganakan',
            homeAddress: 'Tirahan',
            password: 'Password',
            confirmPassword: 'Kumpirmahin ang Password',
            step5Intro: 'Pagpapatotoo ng email.',
            emailVerifyInstruction: 'I-type ang verification code na ipinadala namin sa',
            emailVerifiedMsg: 'Na-verify na ang email. I-click ang SUSUNOD para magpatuloy.',
            emailVerifyCode: 'Verification Code ng Email',
            resendCode: 'IPADALA MULI ANG CODE',
            verify: 'IVERIFY',
            step6Intro: 'Setup ng Authenticator.',
            authenticatorInstruction: 'Mag-install ng Authenticator app at gamitin ito para i-scan ang QR code o ilagay ang key para makakuha ng login OTP.',
            setupKey: 'Setup Key',
            enterOtp: 'Ilagay ang OTP',
            checkOtp: 'SURIIN ANG OTP',
            errorHandler: 'Mensahe ng Error Handler',
            previous: 'NAUNA',
            next: 'SUSUNOD',
            finish: 'TAPOS',
            setupCompleteTitle: 'Kumpleto na ang setup',
            setupCompleteMsg: 'Maaari ka nang mag-sign in gamit ang iyong email at password.',
            openSystemAdmin: 'Buksan ang System Admin',
            errSelectLanguage: 'Pumili ng wika.',
            errEmailPassword: 'Kailangan ang email at password.',
            errPasswordLength: 'Ang password ay dapat hindi bababa sa 6 na character.',
            errPasswordMatch: 'Hindi magkapareho ang mga password.',
            errEnterCode: 'Ilagay ang 6-digit na code.',
            errValidOtp: 'Ilagay ang wastong 6-digit na OTP.',
            errSetupKey: 'Hindi pa handa ang setup key. I-refresh at subukan muli.',
            errInvalidOtp: 'Hindi wasto ang OTP. Subukan muli.',
            yourEmail: 'iyong email',
          };
          return this.lang === 'tl' ? tl : en;
        },
        stepLabels: function () {
          return this.lang === 'tl' ? this.stepLabelsTl : this.stepLabelsEn;
        },
        sectionTitle: function () {
          var titles = this.lang === 'tl'
            ? { services: 'Mga Serbisyo', plugins: 'Mga Plugin', users: 'Mga User', 'auth-keys': 'Auth Keys', monitoring: 'Monitoring' }
            : { services: 'Services', plugins: 'Plugins', users: 'Users', 'auth-keys': 'Auth Keys', monitoring: 'Monitoring' };
          return titles[this.currentSection] || (this.lang === 'tl' ? 'System Admin' : 'System Admin');
        },
        filteredPlugins: function () {
          var q = (this.pluginSearch || '').toLowerCase().trim();
          if (!q) return this.plugins;
          return this.plugins.filter(function (p) {
            return p.name.toLowerCase().indexOf(q) !== -1 || p.version.toLowerCase().indexOf(q) !== -1;
          });
        },
      },
      mounted: function () {
        this.step = 1;
        this.syncTheme();
      },
      watch: {
        isDark: function () {
          this.syncTheme();
        },
        step: function (n) {
          if (n === 4) this.addressFieldFocused = false;
          if (n === 6 && !this.setupKey && window.SystemSetupAuth && window.QRCode) {
            this.setupKey = window.SystemSetupAuth.generateSecret();
            var issuer = 'CVALTIS';
            var account = this.owner.email || 'user';
            var url = 'otpauth://totp/' + encodeURIComponent(issuer) + ':' + encodeURIComponent(account) + '?secret=' + this.setupKey + '&issuer=' + encodeURIComponent(issuer);
            var self = this;
            window.QRCode.toDataURL(url, { width: 140, margin: 1 }).then(function (u) {
              self.qrDataUrl = u;
            }).catch(function () {});
          }
        },
      },
      methods: {
        nextStep: function () {
          if (this.step === 1 && !this.selectedLanguage) {
            this.errorMessage = this.t.errSelectLanguage;
            return;
          }
          if (this.step === 4) {
            if (!this.submitOwnerRegistration()) return;
          }
          this.errorMessage = '';
          if (this.step < this.totalSteps) this.step++;
          else this.finishSetup();
        },
        prevStep: function () {
          this.errorMessage = '';
          if (this.step > 1) this.step--;
        },
        submitOwnerRegistration: function () {
          var owner = this.owner;
          if (!owner.email || !owner.password) {
            this.errorMessage = this.t.errEmailPassword;
            return false;
          }
          if (owner.password.length < 6) {
            this.errorMessage = this.t.errPasswordLength;
            return false;
          }
          if (owner.password !== owner.confirmPassword) {
            this.errorMessage = this.t.errPasswordMatch;
            return false;
          }
          this.errorMessage = '';
          return true;
        },
        resendCode: function () {
          this.errorMessage = '';
        },
        verifyEmail: function () {
          var code = String(this.emailVerificationCode || '').trim();
          if (!code || code.length < 6) {
            this.errorMessage = this.t.errEnterCode;
            return;
          }
          this.errorMessage = '';
          this.emailVerified = true;
        },
        checkOtp: function () {
          var self = this;
          var code = String(this.otpCode || '').trim();
          if (code.length !== 6) {
            this.errorMessage = this.t.errValidOtp;
            return;
          }
          if (!this.setupKey || !window.SystemSetupAuth) {
            this.errorMessage = this.t.errSetupKey;
            return;
          }
          window.SystemSetupAuth.verifyTOTP(this.setupKey, code).then(function (valid) {
            if (!valid) {
              self.errorMessage = self.t.errInvalidOtp;
              return;
            }
            self.errorMessage = '';
            self.otpVerified = true;
          });
        },
        finishSetup: function () {
          this.setupComplete = true;
        },
        goToAdmin: function () {
          this.showAdmin = true;
        },
        logout: function () {
          this.showAdmin = false;
          this.step = 1;
          this.errorMessage = '';
        },
        syncTheme: function () {
          var root = document.documentElement;
          root.classList.remove('theme-dark', 'theme-light');
          root.classList.add(this.isDark ? 'theme-dark' : 'theme-light');
          try {
            localStorage.setItem('cvaltis-theme', this.isDark ? 'dark' : 'light');
          } catch (e) {}
        },
        buttonClick: function (e) {
          e.currentTarget.style.transform = 'scale(0.95)';
        },
        buttonRelease: function (e) {
          e.currentTarget.style.transform = '';
        },
        onAgencyLogoChange: function (e) {
          var file = e.target.files && e.target.files[0];
          if (!file || !file.type.startsWith('image/')) return;
          var reader = new FileReader();
          var self = this;
          reader.onload = function (ev) {
            self.agency.logoDataUrl = ev.target.result;
          };
          reader.readAsDataURL(file);
          e.target.value = '';
        },
        onOwnerProfileChange: function (e) {
          var file = e.target.files && e.target.files[0];
          if (!file || !file.type.startsWith('image/')) return;
          var reader = new FileReader();
          var self = this;
          reader.onload = function (ev) {
            self.owner.profileDataUrl = ev.target.result;
          };
          reader.readAsDataURL(file);
          e.target.value = '';
        },
      },
    };
    if (rootTemplate) {
      options.template = rootTemplate;
    }
    return window.Vue.createApp(options);
  }

  function init() {
    var appEl = document.getElementById('app');
    if (!appEl) return;
    var hasContent = appEl.firstElementChild || (appEl.innerText && appEl.innerText.trim().length > 0);
    var base = typeof window.CVALTIS_BASE === 'string' ? window.CVALTIS_BASE : '';
    var templateRoot = base + 'frontend/html/template/';

    if (!hasContent) {
      Promise.all([
        fetch(templateRoot + 'system-setup.html').then(function (r) { return r.text(); }),
        fetch(templateRoot + 'registration-form-template.html').then(function (r) { return r.text(); }),
      ])
        .then(function (results) {
          var rootTemplate = results[0];
          var registrationFormTemplate = results[1];
          var app = createSetupApp(rootTemplate);
          app.component('RegistrationForm', {
            template: registrationFormTemplate,
            inject: ['setup'],
          });
          app.mount('#app');
        })
        .catch(function () {
          appEl.innerHTML = '<main class="setup-card"><p>Failed to load templates. Refresh the page.</p></main>';
        });
      return;
    }

    fetch('registration-form-template.html')
      .then(function (r) { return r.text(); })
      .then(function (registrationFormTemplate) {
        var app = createSetupApp();
        app.component('RegistrationForm', {
          template: registrationFormTemplate,
          inject: ['setup'],
        });
        app.mount('#app');
      })
      .catch(function () {
        appEl.innerHTML = '<main class="setup-card"><p>Failed to load registration form. Refresh the page.</p></main>';
      });
  }

  window.SystemSetup = { init: init };
})();
