/**
 * TOTP (RFC 6238) helper for authenticator step.
 * Uses Web Crypto API; no external TOTP library required.
 */
window.SystemSetupAuth = (function () {
  const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  function base32Decode(s) {
    s = s.replace(/=+$/, '').toUpperCase();
    let bits = 0, value = 0;
    const out = [];
    for (let i = 0; i < s.length; i++) {
      const idx = BASE32_ALPHABET.indexOf(s[i]);
      if (idx === -1) continue;
      value = (value << 5) | idx;
      bits += 5;
      if (bits >= 8) {
        bits -= 8;
        out.push((value >>> bits) & 0xff);
      }
    }
    return new Uint8Array(out);
  }

  function base32Encode(buf) {
    let bits = 0, value = 0;
    let out = '';
    for (let i = 0; i < buf.length; i++) {
      value = (value << 8) | buf[i];
      bits += 8;
      while (bits >= 5) {
        bits -= 5;
        out += BASE32_ALPHABET[(value >>> bits) & 31];
      }
    }
    if (bits) out += BASE32_ALPHABET[(value << (5 - bits)) & 31];
    while (out.length % 8) out += '=';
    return out;
  }

  function generateSecret() {
    const buf = new Uint8Array(20);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      crypto.getRandomValues(buf);
    } else {
      for (let i = 0; i < 20; i++) buf[i] = Math.floor(Math.random() * 256);
    }
    return base32Encode(buf);
  }

  async function hmacSha1(key, data) {
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      key,
      { name: 'HMAC', hash: 'SHA-1' },
      false,
      ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', cryptoKey, data);
    return new Uint8Array(sig);
  }

  async function verifyTOTP(secretBase32, token) {
    const secret = base32Decode(secretBase32);
    const timeStep = Math.floor(Date.now() / 30000);
    for (let offset = -1; offset <= 1; offset++) {
      const counter = timeStep + offset;
      const counterBytes = new ArrayBuffer(8);
      const view = new DataView(counterBytes);
      view.setUint32(4, counter, false);
      const hash = await hmacSha1(secret, counterBytes);
      const o = hash[19] & 0x0f;
      const code = ((hash[o] & 0x7f) << 24) | (hash[o + 1] << 16) | (hash[o + 2] << 8) | hash[o + 3];
      const totp = (code % 1000000).toString().padStart(6, '0');
      if (totp === String(token).trim()) return true;
    }
    return false;
  }

  return {
    generateSecret: generateSecret,
    verifyTOTP: verifyTOTP,
  };
})();
