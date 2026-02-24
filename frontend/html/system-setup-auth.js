/**
 * CVALTIS System Setup - TOTP secret generation and verification.
 * Exposes window.SystemSetupAuth with generateSecret() and verifyTOTP(secret, code).
 * Uses Web Crypto API; works with otpauth:// QR codes and authenticator apps.
 */
(function(global) {
  'use strict';

  var BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  function generateSecret() {
    var bytes = new Uint8Array(20);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      crypto.getRandomValues(bytes);
    } else {
      for (var i = 0; i < 20; i++) bytes[i] = Math.floor(Math.random() * 256);
    }
    var secret = '';
    var bits = 0;
    var value = 0;
    for (var j = 0; j < bytes.length; j++) {
      value = (value << 8) | bytes[j];
      bits += 8;
      while (bits >= 5) {
        bits -= 5;
        secret += BASE32_ALPHABET[(value >>> bits) & 31];
      }
    }
    if (bits > 0) secret += BASE32_ALPHABET[(value << (5 - bits)) & 31];
    return secret;
  }

  function base32Decode(str) {
    str = String(str).toUpperCase().replace(/=+$/, '');
    var bits = 0;
    var value = 0;
    var output = [];
    for (var i = 0; i < str.length; i++) {
      var idx = BASE32_ALPHABET.indexOf(str[i]);
      if (idx === -1) continue;
      value = (value << 5) | idx;
      bits += 5;
      if (bits >= 8) {
        bits -= 8;
        output.push((value >>> bits) & 0xff);
      }
    }
    return new Uint8Array(output);
  }

  function getTOTPCounter(period) {
    period = period || 30;
    return Math.floor(Math.floor(Date.now() / 1000) / period);
  }

  function dynamicTruncation(hash) {
    var offset = hash[hash.length - 1] & 15;
    return ((hash[offset] & 0x7f) << 24) | ((hash[offset + 1] & 0xff) << 16) |
           ((hash[offset + 2] & 0xff) << 8) | (hash[offset + 3] & 0xff);
  }

  function verifyTOTP(secret, code, period) {
    period = period || 30;
    var codeStr = String(code).replace(/\s/g, '');
    if (!/^\d{6}$/.test(codeStr)) return Promise.resolve(false);
    var key = base32Decode(secret);
    if (!key.length) return Promise.resolve(false);

    var counter = getTOTPCounter(period);
    var timeSteps = [counter - 1, counter, counter + 1];

    function computeTOTP(c) {
      var counterBytes = new ArrayBuffer(8);
      var view = new DataView(counterBytes);
      view.setUint32(4, c, false);
      return crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign'])
        .then(function(cryptoKey) {
          return crypto.subtle.sign('HMAC', cryptoKey, counterBytes);
        })
        .then(function(signature) {
          var h = new Uint8Array(signature);
          var binCode = dynamicTruncation(h) % 1000000;
          var totp = binCode.toString(10);
          while (totp.length < 6) totp = '0' + totp;
          return totp;
        });
    }

    return Promise.all(timeSteps.map(computeTOTP)).then(function(codes) {
      return codes.indexOf(codeStr) !== -1;
    }).catch(function() { return false; });
  }

  global.SystemSetupAuth = {
    generateSecret: generateSecret,
    verifyTOTP: verifyTOTP
  };
})(typeof window !== 'undefined' ? window : this);
