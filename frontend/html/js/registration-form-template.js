/**
 * CVALTIS – Registration form Vue template (multi-step setup).
 * Exposes window.CVALTIS_REGISTRATION_FORM_TEMPLATE
 */
(function(global) {
  'use strict';

  var t = '<div class="logo-holder" :class="{ \'has-image\': setup.agency.logoDataUrl }">' +
    '<img v-if="setup.agency.logoDataUrl" :src="setup.agency.logoDataUrl" alt="Agency logo" class="logo-holder-img">' +
    '<template v-else>{{ setup.t.logoHolder }}<br><span>{{ setup.t.logoHolderHint }}</span></template>' +
    '</div><header class="card-header">' +
    '<p class="welcome-text">{{ setup.t.welcome }}</p>' +
    '<div class="system-icon" aria-hidden="true">' +
    '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="system-icon-svg">' +
    '<circle cx="24" cy="24" r="8" class="icon-center"/><circle cx="24" cy="10" r="4" class="icon-node"/>' +
    '<circle cx="38" cy="24" r="4" class="icon-node"/><circle cx="24" cy="38" r="4" class="icon-node"/>' +
    '<circle cx="10" cy="24" r="4" class="icon-node"/>' +
    '<line x1="24" y1="18" x2="24" y2="14" class="icon-line"/><line x1="32" y1="24" x2="34" y2="24" class="icon-line"/>' +
    '<line x1="24" y1="32" x2="24" y2="34" class="icon-line"/><line x1="16" y1="24" x2="14" y2="24" class="icon-line"/>' +
    '</svg></div><h1 class="system-title">CVALTIS SYSTEM</h1>' +
    '<p class="system-subtitle text-underline">{{ setup.t.systemSubtitle }}</p>' +
    '<p class="instruction-text text-underline">{{ setup.t.instruction }}</p></header>' +
    '<transition name="step-fade" mode="out-in">' +
    '<section v-if="setup.step === 1" key="step1" class="card-body"><h2 class="step-title">{{ setup.t.step1Title }}</h2>' +
    '<div class="field-row"><div class="select-wrap">' +
    '<select v-model="setup.selectedLanguage" class="input input-select" aria-label="Language" required>' +
    '<option value="">{{ setup.t.selectLanguagePlaceholder }}</option><option value="en">ENGLISH</option><option value="tl">TAGALOG</option></select>' +
    '<span class="select-chevron">▾</span></div></div></section>' +
    '<section v-else-if="setup.step === 2" key="step2" class="card-body">' +
    '<h2 class="section-label">{{ setup.t.step2Intro }}</h2><hr class="section-rule">' +
    '<div class="field-row"><input type="text" class="input" :placeholder="setup.t.agencyName" v-model="setup.agency.name" required></div>' +
    '<div class="field-row"><input type="text" class="input" :placeholder="setup.t.agencyAddress" v-model="setup.agency.address" required></div>' +
    '<div class="field-row"><input type="email" class="input" :placeholder="setup.t.agencyEmail" v-model="setup.agency.email" required></div>' +
    '<div class="field-row"><label class="logo-upload-btn">' +
    '<input type="file" accept="image/*" class="input-file-hidden" @change="setup.onAgencyLogoChange" aria-label="Upload business logo" required>' +
    '<span class="input input-with-icon logo-upload-label">{{ setup.agency.logoDataUrl ? setup.t.changeLogo : setup.t.agencyLogo }}</span>' +
    '<span class="input-icon input-icon-upload" aria-hidden="true">↑</span></label></div></section>' +
    '<section v-else-if="setup.step === 3" key="step3" class="card-body card-body-owner">' +
    '<p class="section-label">{{ setup.t.step3Intro }}</p><p class="section-sublabel">{{ setup.t.step3Sublabel }}</p>' +
    '<div class="owner-row"><label class="owner-avatar-wrap">' +
    '<input type="file" accept="image/*" class="input-file-hidden" @change="setup.onOwnerProfileChange" aria-label="Upload profile photo" required>' +
    '<div class="owner-avatar" :class="{ \'has-image\': setup.owner.profileDataUrl }" aria-hidden="true">' +
    '<img v-if="setup.owner.profileDataUrl" :src="setup.owner.profileDataUrl" alt="Profile" class="owner-avatar-img">' +
    '<svg v-else viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="avatar-svg"><circle cx="32" cy="24" r="12" stroke="currentColor" stroke-width="2" fill="none"/>' +
    '<path d="M12 56c0-11 8.954-20 20-20s20 9 20 20" stroke="currentColor" stroke-width="2" fill="none"/></svg></div>' +
    '<span class="owner-avatar-upload-hint">{{ setup.owner.profileDataUrl ? setup.t.changePhoto : setup.t.uploadProfile }}</span></label>' +
    '<div class="owner-fields">' +
    '<div class="field-row field-with-icon"><span class="field-icon field-icon-person">👤</span><input type="text" class="input" :placeholder="setup.t.lastName" v-model="setup.owner.lastName" required></div>' +
    '<div class="field-row field-with-icon"><span class="field-icon field-icon-person">👤</span><input type="text" class="input" :placeholder="setup.t.firstName" v-model="setup.owner.firstName" required></div>' +
    '<div class="field-row field-with-icon"><span class="field-icon field-icon-person">👤</span><input type="text" class="input" :placeholder="setup.t.middleName" v-model="setup.owner.middleName" required></div>' +
    '<div class="field-row field-with-icon"><span class="field-icon field-icon-email">✉</span><input type="email" class="input" :placeholder="setup.t.email" v-model="setup.owner.email" required></div>' +
    '<div class="field-row field-with-icon"><span class="field-icon field-icon-calendar">📅</span><input type="text" class="input" :placeholder="setup.t.dateOfBirth" v-model="setup.owner.dob" required></div>' +
    '<div class="field-row field-with-icon"><span class="field-icon field-icon-pin">📍</span><input type="text" class="input" :placeholder="setup.t.homeAddress" v-model="setup.owner.address" required></div>' +
    '<div class="field-row field-with-icon">' +
    '<input :type="setup.showOwnerPassword ? \'text\' : \'password\'" class="input input-with-icon" :placeholder="setup.t.password" v-model="setup.owner.password" minlength="8" maxlength="32" required>' +
    '<button type="button" class="input-icon-btn" @click="setup.showOwnerPassword = !setup.showOwnerPassword" :aria-label="setup.showOwnerPassword ? \'Hide password\' : \'Show password\'">' +
    '<span class="input-icon input-icon-eye">{{ setup.showOwnerPassword ? \'🙈\' : \'👁\' }}</span></button></div>' +
    '<div class="field-row field-with-icon">' +
    '<input :type="setup.showOwnerConfirm ? \'text\' : \'password\'" class="input input-with-icon" :placeholder="setup.t.confirmPassword" v-model="setup.owner.confirmPassword" minlength="8" maxlength="32" required>' +
    '<button type="button" class="input-icon-btn" @click="setup.showOwnerConfirm = !setup.showOwnerConfirm" :aria-label="setup.showOwnerConfirm ? \'Hide password\' : \'Show password\'">' +
    '<span class="input-icon input-icon-eye">{{ setup.showOwnerConfirm ? \'🙈\' : \'👁\' }}</span></button></div></div></div></section>' +
    '<section v-else-if="setup.step === 4" key="step4" class="card-body">' +
    '<p class="section-label">{{ setup.t.step4Intro }}</p><p class="section-sublabel">{{ setup.t.step3Sublabel }}</p>' +
    '<p class="email-verify-instruction" v-if="!setup.emailVerified">{{ setup.t.emailVerifyInstruction }} <strong>{{ setup.owner.email || setup.t.yourEmail }}</strong>.</p>' +
    '<p class="email-verify-instruction email-verified-msg" v-else>{{ setup.t.emailVerifiedMsg }}</p>' +
    '<div class="field-row field-with-icon field-icon-right-only" v-if="!setup.emailVerified">' +
    '<input type="text" class="input input-with-icon" :placeholder="setup.t.emailVerifyCode" v-model="setup.emailVerificationCode" maxlength="6" inputmode="numeric" pattern="[0-9]*" required>' +
    '<span class="field-icon field-icon-key" aria-hidden="true">🔑</span></div>' +
    '<div class="email-verify-buttons" v-if="!setup.emailVerified">' +
    '<button type="button" class="btn btn-resend" :disabled="setup.authLoading" @click="setup.resendCode">{{ setup.t.resendCode }}</button>' +
    '<button type="button" class="btn btn-verify" :disabled="setup.authLoading" @click="setup.verifyEmail">{{ setup.t.verify }}</button></div></section>' +
    '<section v-else-if="setup.step === 5" key="step5" class="card-body card-body-authenticator">' +
    '<p class="section-label">{{ setup.t.step5Intro }}</p><p class="section-sublabel">{{ setup.t.step3Sublabel }}</p>' +
    '<p class="authenticator-instruction">{{ setup.t.authenticatorInstruction }}</p>' +
    '<div class="authenticator-row"><div class="qr-block">' +
    '<div class="qr-placeholder" aria-hidden="true">' +
    '<img v-if="setup.qrDataUrl" :src="setup.qrDataUrl" alt="QR code for authenticator" class="qr-img">' +
    '<span v-else class="qr-inner">QR Code</span></div>' +
    '<p class="setup-key-label">{{ setup.t.setupKey }}: <code class="setup-key">{{ setup.setupKey }}</code></p></div>' +
    '<div class="otp-block"><div class="field-row">' +
    '<input :type="setup.showOtp ? \'text\' : \'password\'" class="input input-with-icon" :placeholder="setup.t.enterOtp" v-model="setup.otpCode" maxlength="6" required>' +
    '<button type="button" class="input-icon-btn" @click="setup.showOtp = !setup.showOtp" :aria-label="setup.showOtp ? \'Hide OTP\' : \'Show OTP\'">' +
    '<span class="input-icon input-icon-eye">{{ setup.showOtp ? \'🙈\' : \'👁\' }}</span></button></div>' +
    '<button type="button" class="btn btn-check-otp" @click="setup.checkOtp">{{ setup.t.checkOtp }}</button></div></div></section>' +
    '</transition>' +
    '<p class="error-handler" :class="{ visible: setup.errorMessage }">{{ setup.errorMessage || setup.t.errorHandler }}</p>' +
    '<div class="progress-row"><div class="progress-dots">' +
    '<span v-for="n in setup.totalDots" :key="n" class="dot" :class="{ active: n <= setup.step }"></span></div>' +
    '<p class="progress-label text-underline">{{ setup.stepLabels[setup.step - 1] }}</p></div>' +
    '<footer class="card-footer">' +
    '<button type="button" class="btn btn-prev" :disabled="setup.step <= 1" @click="setup.prevStep" @mousedown="setup.buttonClick" @mouseup="setup.buttonRelease" @mouseleave="setup.buttonRelease">{{ setup.t.previous }}</button>' +
    '<button type="button" class="btn btn-next" :disabled="setup.authLoading" @click="setup.nextStep" @mousedown="setup.buttonClick" @mouseup="setup.buttonRelease" @mouseleave="setup.buttonRelease">{{ setup.step >= setup.totalSteps ? setup.t.finish : setup.t.next }}</button>' +
    '</footer>';

  global.CVALTIS_REGISTRATION_FORM_TEMPLATE = t;
})(typeof window !== 'undefined' ? window : this);
