(function () {
  'use strict';

  document.querySelectorAll('.contact-wechat').forEach(function (contact) {
    // Native details/summary provides tap and keyboard toggling without JavaScript.
    contact.addEventListener('pointerenter', function (event) {
      if (event.pointerType === 'mouse') contact.open = true;
    });

    contact.addEventListener('pointerleave', function (event) {
      if (event.pointerType === 'mouse' && !contact.contains(document.activeElement)) {
        contact.open = false;
      }
    });

    contact.addEventListener('focusout', function (event) {
      if (!contact.contains(event.relatedTarget) && !contact.matches(':hover')) {
        contact.open = false;
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        contact.open = false;
      }
    });

    document.addEventListener('pointerdown', function (event) {
      if (!contact.contains(event.target)) contact.open = false;
    });
  });
})();
