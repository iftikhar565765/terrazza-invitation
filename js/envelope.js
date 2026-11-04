/* ═══════════════════════════════════════════════════════════════
   AURELIA · seal.js (loaded as envelope.js)
   The opening ceremony — the gold wax seal breaks, the folded
   letter opens, and the invitation lifts into the light.
   · GSAP choreography when GSAP is available
   · Pure-CSS transition fallback when GSAP fails to load
   · Instant, motion-free handover under prefers-reduced-motion
   · Always escapable: skip control, the open button, Escape key
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* Tell the inline watchdog (index.html) that the intro system is alive. */
  window.__heirloomIntroReady = true;

  var body = document.body;
  var opening = document.getElementById('opening');
  var sealcard = document.getElementById('invite-card');
  var skipBtn = document.getElementById('skip-intro');
  var openBtn = document.getElementById('open-invitation');

  if (!opening || !sealcard) {
    // Nothing to orchestrate — reveal the site immediately.
    body.classList.remove('intro-pending');
    body.classList.add('intro-done');
    return;
  }

  var book = sealcard.querySelector('.sealcard__book');
  var front = sealcard.querySelector('.sealcard__front');
  var seal = sealcard.querySelector('.seal');
  var sealL = sealcard.querySelector('.seal__half--l');
  var sealR = sealcard.querySelector('.seal__half--r');
  var shadow = document.querySelector('.opening .sealcard-shadow');
  var fadingParts = '.opening__eyebrow, .opening__names, .opening__hint, ' +
                    '.opening__spray, .opening__glow, .sealcard-shadow, ' +
                    '.opening__open, .opening__skip';

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
    sealcard.classList.add('is-open');

    gsap.set(sealcard, { perspective: 1500 });
    gsap.set([sealL, sealR], { clearProps: 'all' });

    timeline = gsap.timeline({ onComplete: function () { completeIntro(false); } });

    timeline
      /* 1 · the letter acknowledges the touch */
      .to(sealcard, { scale: 1.03, duration: 0.35, ease: 'power2.out' })

      /* 2 · the wax seal cracks and falls away */
      .to(sealL, { x: -14, y: 20, rotation: -16, opacity: 0, duration: 0.7, ease: 'power1.in' }, 0.1)
      .to(sealR, { x: 14, y: 20, rotation: 16, opacity: 0, duration: 0.7, ease: 'power1.in' }, 0.16)

      /* 3 · the cover of the letter folds open */
      .to(front, { rotationX: -168, duration: 1.35, ease: 'power3.inOut' }, 0.42)

      /* 4 · the opened letter warms toward the light */
      .to(book, { y: -14, scale: 1.04, duration: 0.9, ease: 'power2.inOut' }, 1.28)

      /* 5 · the candle-glow blooms */
      .to('.opening__glow', { opacity: 1, scale: 1.12, duration: 1, ease: 'power1.out' }, 1.3)

      /* 6 · the table scene fades — the invitation begins */
      .to(fadingParts, { opacity: 0, duration: 0.5, ease: 'power1.out' }, 1.98)

      /* 7 · the opened letter dissolves as the page materialises */
      .to(sealcard, { scale: 1.3, opacity: 0, duration: 0.62, ease: 'power2.in' }, 2.18)

      /* 8 · the cover sheet lifts away, crossfading into the suite */
      .to(opening, { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, 2.3);
  }

  /* ── CSS-transition fallback (no GSAP) ───────────────────────── */
  function openWithFallback() {
    var wait = reducedQuery.matches ? 300 : 3450;
    sealcard.classList.add('is-fallback-open');
    if (shadow) shadow.style.opacity = '.3';
    window.setTimeout(function () { completeIntro(true); }, wait);
  }

  /* ── Reduced motion: quiet, near-instant handover ─────────────── */
  function openReduced() {
    sealcard.classList.add('is-open');
    window.setTimeout(function () { completeIntro(true); }, 120);
  }

  /* ── Entry point ─────────────────────────────────────────────── */
  function open() {
    if (started || finished) return;
    started = true;
    if (skipBtn) skipBtn.disabled = true;
    if (openBtn) openBtn.disabled = true;

    if (reducedQuery.matches)      openReduced();
    else if (hasGsap)              openWithGsap();
    else                           openWithFallback();
  }

  /* Inside the customizer preview the cover is an editable scene,
     not a control — clicks select & recolour its parts instead of
     opening it. Guests (top-level page) keep the full choreography. */
  var inEditor = window.parent !== window;

  if (!inEditor) {
    sealcard.addEventListener('click', open);
    if (openBtn) openBtn.addEventListener('click', open);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', function () {
      if (started) return;
      started = true;
      completeIntro(true);
    });
  }

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
    if (skipBtn) skipBtn.disabled = false;
    if (openBtn) openBtn.disabled = false;

    if (window.ScrollTrigger) {
      try { ScrollTrigger.getAll().forEach(function (t) { t.kill(); }); } catch (e) {}
    }

    // Reset the letter to its sealed state.
    sealcard.classList.remove('is-open', 'is-fallback-open');
    [book, front, sealL, sealR].forEach(function (el) {
      if (el && el.style) el.removeAttribute('style');
    });
    if (shadow) shadow.removeAttribute('style');
    opening.querySelectorAll(fadingParts).forEach(function (el) {
      el.removeAttribute('style');
    });
    if (hasGsap) {
      gsap.set([book, front, sealL, sealR], { clearProps: 'all' });
      gsap.set(sealcard, { clearProps: 'scale,opacity' });
      gsap.set(opening, { clearProps: 'opacity' });
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
      try { sealcard.focus({ preventScroll: true }); } catch (e) { sealcard.focus(); }
    }, 60);
  };

})();
