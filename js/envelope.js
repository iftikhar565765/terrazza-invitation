/* ═══════════════════════════════════════════════════════════════
   EVERMORE · gatefold.js (loaded as envelope.js)
   The opening ceremony — the silk bow unties, the two doors of
   the folded card swing open, and the invitation lifts into the
   June light.
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
  var gatefold = document.getElementById('gatefold');
  var skipBtn = document.getElementById('skip-intro');
  var openBtn = document.getElementById('open-invitation');

  if (!opening || !gatefold) {
    // Nothing to orchestrate — reveal the site immediately.
    body.classList.remove('intro-pending');
    body.classList.add('intro-done');
    return;
  }

  var card = gatefold.querySelector('.gatefold__card');
  var doorLeft = gatefold.querySelector('.gatefold__door--left');
  var doorRight = gatefold.querySelector('.gatefold__door--right');
  var bow = gatefold.querySelector('.gatefold__bow');
  var tag = gatefold.querySelector('.gatefold__tag');
  var fadingParts = '.opening__eyebrow, .opening__names, .opening__hint, ' +
                    '.opening__garland, .opening__glow, .gatefold-shadow, ' +
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
    gatefold.classList.add('is-open');

    gsap.set(gatefold, { y: 0, scale: 1 });
    gsap.set(bow, { xPercent: -50, yPercent: -50, rotation: 0, scale: 1, opacity: 1 });
    gsap.set(tag, { xPercent: 0, y: 0, opacity: 1 });
    gsap.set(doorLeft, { rotationY: 0 });
    gsap.set(doorRight, { rotationY: 0 });

    timeline = gsap.timeline({ onComplete: function () { completeIntro(false); } });

    timeline
      /* 1 · the card acknowledges the touch */
      .to(gatefold, { scale: 1.03, duration: 0.4, ease: 'power2.out' })

      /* 2 · the silk bow unties and slips away */
      .to(bow, {
        rotation: 14, yPercent: 30, scale: 0.8, opacity: 0,
        duration: 0.85, ease: 'power1.in'
      }, 0.12)

      /* 3 · the little tag falls with it */
      .to(tag, { y: 54, opacity: 0, duration: 0.6, ease: 'power1.in' }, 0.3)

      /* 4 · the two silk doors swing open */
      .to(doorLeft, { rotationY: -108, duration: 1.15, ease: 'power2.inOut' }, 0.62)
      .to(doorRight, { rotationY: 108, duration: 1.15, ease: 'power2.inOut' }, 0.62)

      /* 5 · the letter inside warms into view */
      .to(card.querySelector('.gatefold__inner'), { opacity: 1, duration: 0.7, ease: 'power1.out' }, 1.05)

      /* 6 · the opened card lifts toward the light */
      .to(gatefold, { y: -24, scale: 1.1, duration: 0.9, ease: 'power2.inOut' }, 1.62)

      /* 7 · the garden table fades — the invitation begins */
      .to(fadingParts, { opacity: 0, duration: 0.5, ease: 'power1.out' }, 1.72)

      /* 8 · the opened card dissolves as the page materialises */
      .to(gatefold, { scale: 1.32, opacity: 0, duration: 0.6, ease: 'power2.in' }, 2.08)

      /* 9 · the cover sheet lifts away, crossfading into the suite */
      .to(opening, { opacity: 0, duration: 0.62, ease: 'power1.inOut' }, 2.16);
  }

  /* ── CSS-transition fallback (no GSAP) ───────────────────────── */
  function openWithFallback() {
    var wait = reducedQuery.matches ? 300 : 3350;
    gatefold.classList.add('is-fallback-open');
    window.setTimeout(function () { completeIntro(true); }, wait);
  }

  /* ── Reduced motion: quiet, near-instant handover ─────────────── */
  function openReduced() {
    gatefold.classList.add('is-open');
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
    gatefold.addEventListener('click', open);
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

    // Reset the card to its sealed state.
    gatefold.classList.remove('is-open', 'is-fallback-open');
    [card, doorLeft, doorRight, bow, tag].forEach(function (el) {
      if (el && el.style) el.removeAttribute('style');
    });
    gatefold.querySelectorAll('.gatefold__inner').forEach(function (el) {
      el.removeAttribute('style');
    });
    opening.querySelectorAll('.opening__eyebrow, .opening__names, .opening__hint, ' +
      '.opening__garland, .opening__glow, .gatefold-shadow, .opening__open, .opening__skip')
      .forEach(function (el) { el.removeAttribute('style'); });
    if (hasGsap) {
      gsap.set([card, doorLeft, doorRight, bow, tag], { clearProps: 'all' });
      gsap.set(gatefold, { clearProps: 'all' });
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
      try { gatefold.focus({ preventScroll: true }); } catch (e) { gatefold.focus(); }
    }, 60);
  };

})();
