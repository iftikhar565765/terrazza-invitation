/* ═══════════════════════════════════════════════════════════════
   NOCTURNE · envelope.js
   The opening experience — the wax seal breaks, the vellum band
   slides away, and the card is lifted from the garden table.
   · GSAP choreography when GSAP is available
   · Pure-CSS keyframe fallback when GSAP fails to load
   · Instant, motion-free handover under prefers-reduced-motion
   · Always escapable: skip control, the open button, Escape key
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* Tell the inline watchdog (index.html) that the intro system is alive. */
  window.__heirloomIntroReady = true;

  var body = document.body;
  var opening = document.getElementById('opening');
  var envelope = document.getElementById('envelope');
  var skipBtn = document.getElementById('skip-intro');
  var openBtn = document.getElementById('open-invitation');

  if (!opening || !envelope) {
    // Nothing to orchestrate — reveal the site immediately.
    body.classList.remove('intro-pending');
    body.classList.add('intro-done');
    return;
  }

  var card = envelope.querySelector('.envelope__card');
  var band = envelope.querySelector('.envelope__band');
  var sealWrap = envelope.querySelector('.envelope__seal-wrap');
  var fadingParts = '.opening__eyebrow, .opening__names, .opening__hint, ' +
                    '.opening__florals, .opening__glow, .opening__watermark, ' +
                    '.table-shadow, .envelope__stamp';

  var reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var hasGsap = typeof window.gsap !== 'undefined';

  var started = false;
  var finished = false;
  var timeline = null;

  /* ── Final handover ──────────────────────────────────────────── */
  function completeIntro(fadeOut) {
    if (finished) return;
    finished = true;

    if (timeline) { timeline.kill(); timeline = null; }

    if (fadeOut) opening.classList.add('is-leaving');

    body.classList.remove('intro-pending');
    body.classList.add('intro-done');

    // Hand focus to the invitation headline for keyboard & screen readers.
    // preventScroll keeps the arrival at the very top of the suite —
    // focusing must never yank the guest into the middle of the card.
    var h1 = document.getElementById('invitation-title');
    if (h1) {
      try { h1.focus({ preventScroll: true }); } catch (e) { h1.focus(); }
      window.scrollTo(0, 0);
    }

    // The cover leaves the accessibility tree entirely.
    opening.setAttribute('aria-hidden', 'true');
    try { opening.inert = true; } catch (e) { /* older browsers: visual hiding suffices */ }

    window.setTimeout(function () {
      opening.style.display = 'none';
    }, fadeOut ? 1050 : 120);

    document.dispatchEvent(new CustomEvent('heirloom:intro-complete'));
  }

  /* ── GSAP choreography ───────────────────────────────────────── */
  function openWithGsap() {
    envelope.classList.add('is-open');

    gsap.set(envelope, { rotation: -1.6 });
    gsap.set(card, { yPercent: 0, scale: 1 });
    gsap.set(band, { xPercent: 0, opacity: 1 });
    gsap.set(sealWrap, { rotation: 0, y: 0, scale: 1, opacity: 1 });

    timeline = gsap.timeline({ onComplete: function () { completeIntro(false); } });

    timeline
      /* 1 · the card acknowledges the touch */
      .to(envelope, { rotation: 0, scale: 1.025, duration: 0.38, ease: 'power2.out' })

      /* 2 · the wax seal cracks and drops from the card */
      .to(sealWrap, {
        rotation: 26, y: 84, scale: 0.7, opacity: 0,
        duration: 0.72, ease: 'power1.in'
      }, 0.1)

      /* 3 · the vellum band slides away like a sleeve */
      .to(band, { xPercent: 125, opacity: 0, duration: 0.9, ease: 'power2.in' }, 0.46)

      /* 4 · the card is lifted from the table toward the viewer */
      .to(card, { yPercent: -7, scale: 1.9, duration: 0.98, ease: 'power2.in' }, 1.32)

      /* 5 · the table setting fades — the invitation begins */
      .to(fadingParts, { opacity: 0, duration: 0.5, ease: 'power1.out' }, 1.42)

      /* 6 · the lifted card dissolves as the page materialises behind it */
      .to(envelope, { scale: 2.02, opacity: 0, duration: 0.58, ease: 'power2.in' }, 1.78)

      /* 7 · the cover sheet lifts away, crossfading into the suite */
      .to(opening, { opacity: 0, duration: 0.62, ease: 'power1.inOut' }, 1.86);
  }

  /* ── CSS-keyframes fallback (no GSAP) ────────────────────────── */
  function openWithFallback() {
    var wait = reducedQuery.matches ? 300 : 3100;
    envelope.classList.add('is-fallback-open');
    window.setTimeout(function () { completeIntro(true); }, wait);
  }

  /* ── Reduced motion: quiet, near-instant handover ─────────────── */
  function openReduced() {
    envelope.classList.add('is-open');
    window.setTimeout(function () { completeIntro(true); }, 120);
  }

  /* ── Entry point ─────────────────────────────────────────────── */
  function open() {
    if (inEditor) return;
    if (started || finished) return;
    started = true;
    skipBtn.disabled = true;
    if (openBtn) openBtn.disabled = true;

    if (reducedQuery.matches)      openReduced();
    else if (hasGsap)              openWithGsap();
    else                           openWithFallback();
  }

  /* Inside the customizer preview the card is an editable scene,
     not a control — clicks select & recolour its parts instead of
     opening it. Guests (top-level page) keep the full choreography. */
  var inEditor = window.parent !== window;

  envelope.addEventListener('click', open);
  if (!inEditor && openBtn) openBtn.addEventListener('click', open);

  skipBtn.addEventListener('click', function () {
    if (started) return;
    started = true;
    completeIntro(true);
  });

  // Escape always offers a way out of the opening.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !finished && body.classList.contains('intro-pending')) {
      started = true;
      completeIntro(true);
    }
  });

  /* ── Replay (wired from the closing scene) ───────────────────── */
  window.heirloomReplayIntro = function () {
    if (!finished) return;
    finished = false;
    started = false;
    skipBtn.disabled = false;
    if (openBtn) openBtn.disabled = false;

    if (window.ScrollTrigger) {
      try { ScrollTrigger.getAll().forEach(function (t) { t.kill(); }); } catch (e) {}
    }

    // Reset the card to its sealed state.
    envelope.classList.remove('is-open', 'is-fallback-open');
    [card, band, sealWrap].forEach(function (el) {
      if (el && el.style) el.removeAttribute('style');
    });
    envelope.querySelectorAll('.envelope__stamp').forEach(function (el) {
      el.removeAttribute('style');
    });
    opening.querySelectorAll('.opening__eyebrow, .opening__names, .opening__hint, ' +
      '.opening__florals, .opening__glow, .opening__watermark, .table-shadow')
      .forEach(function (el) { el.removeAttribute('style'); });
    if (hasGsap) {
      gsap.set([card, band, sealWrap], { clearProps: 'all' });
      gsap.set(envelope, { clearProps: 'all' });
    }

    // Reset the overlay.
    opening.classList.remove('is-leaving');
    opening.removeAttribute('aria-hidden');
    try { opening.inert = false; } catch (e) {}
    opening.style.display = '';
    opening.style.opacity = '';

    // Return to the top, instantly and quietly.
    body.classList.remove('intro-done');
    body.classList.add('intro-pending');
    try { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }
    catch (e) { window.scrollTo(0, 0); }

    window.setTimeout(function () {
      try { envelope.focus({ preventScroll: true }); } catch (e) { envelope.focus(); }
    }, 60);
  };

})();
