/**
 * CVALTIS – Load registration form Vue template from HTML and expose as window.CVALTIS_REGISTRATION_FORM_TEMPLATE.
 * Dispatches 'cvaltis-registration-template-ready' when done. Pure JS only.
 */
(function(global) {
  'use strict';

  var EVENT_READY = 'cvaltis-registration-template-ready';

  function getTemplateUrl() {
    var script = document.currentScript;
    if (!script || !script.src) return null;
    var base = script.src.replace(/\/[^/]*$/, '');
    return base + '/../html/templates/registration-form.html';
  }

  function setTemplate(html) {
    global.CVALTIS_REGISTRATION_FORM_TEMPLATE = typeof html === 'string' ? html.trim() : '';
    try {
      global.document.dispatchEvent(new CustomEvent(EVENT_READY));
    } catch (e) {}
  }

  var url = getTemplateUrl();
  if (url) {
    fetch(url)
      .then(function(r) { return r.text(); })
      .then(setTemplate)
      .catch(function() { setTemplate(''); });
  } else {
    setTemplate('');
  }
})(typeof window !== 'undefined' ? window : this);
