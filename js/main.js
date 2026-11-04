/* ═══════════════════════════════════════════════════════════════
   EVERMORE · main.js
   Content injection · navigation · palette swatches · wedding-day
   string of lemons · countdown · calendar files · reveals ·
   parallax · audio. Everything degrades gracefully:
   · no GSAP      → reveals still run (CSS + IntersectionObserver)
   · reduced motion → no scroll effects, countdown still runs
   · no JS at all → the page reads fully (see README)
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var cfg = window.HEIRLOOM || {};
  var reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var hasGsap = typeof window.gsap !== 'undefined';
  var hasST = hasGsap && typeof window.ScrollTrigger !== 'undefined';

  /* ══ 1 · CONTENT INJECTION (progressive enhancement) ═══════════
     The copy lives in index.html; config values refine it. If a
     [data-content] key exists in config below, its string
     replaces the text. Keys map to the config sections.           */
  function getConfigValue(path, source) {
    return path.split('.').reduce(function (value, key) {
      return value == null ? undefined : value[key];
    }, source || cfg);
  }

  function injectContent() {
    var c = cfg.couple || {}, w = cfg.wedding || {}, v = cfg.venue || {}, r = cfg.rsvp || {};
    var map = {
      'couple.names': c.namesLine,
      'couple.initials': c.initials,
      'couple.partner-one': c.partnerOne,
      'couple.partner-two': c.partnerTwo,
      'wedding.display': w.display,
      'wedding.words': w.words,
      'wedding.numerals': w.numerals,
      'wedding.zoneLabel': w.zoneLabel,
      'venue.name': v.name,
      'venue.address': v.address,
      'rsvp.deadline': r.deadline
    };
    Object.keys(map).forEach(function (key) {
      if (map[key] == null) return;
      document.querySelectorAll('[data-content="' + key + '"]').forEach(function (el) {
        el.textContent = map[key];
      });
    });
    document.querySelectorAll('[data-couple-initials]').forEach(function (el) {
      if (c.initials != null) el.textContent = c.initials;
    });
    document.querySelectorAll('[data-content^="content."]').forEach(function (el) {
      var value = getConfigValue(el.getAttribute('data-content'));
      if (value != null) el.textContent = value;
    });
    document.querySelectorAll('[data-placeholder-content]').forEach(function (el) {
      var value = getConfigValue(el.getAttribute('data-placeholder-content'));
      if (value != null) el.setAttribute('placeholder', value);
    });
    document.querySelectorAll('[data-aria-label-content]').forEach(function (el) {
      var value = getConfigValue(el.getAttribute('data-aria-label-content'));
      if (value != null) el.setAttribute('aria-label', value);
    });
    document.querySelectorAll('[data-meta-property], [data-meta-name]').forEach(function (el) {
      var value = getConfigValue(el.getAttribute('data-meta-content'));
      if (value == null) return;
      el.setAttribute('content', value);
    });
    var title = getConfigValue('content.pageTitle');
    if (typeof title === 'string' && title) document.title = title;
    var description = getConfigValue('content.pageDescription');
    var descriptionEl = document.querySelector('meta[name="description"]');
    if (descriptionEl && typeof description === 'string' && description) descriptionEl.content = description;
    applyTheme();
    applyFonts();
  }

  function applyPreviewConfig(nextConfig) {
    if (!nextConfig || typeof nextConfig !== 'object' || Array.isArray(nextConfig)) return;
    cfg = nextConfig;
    window.HEIRLOOM = cfg;
    injectContent();
    applyColorEdits();
    applyHiddenElements();
    renderPalette();
    renderMoments();
    initCountdown();
    initMapLink();
    updateGcalLink();
    document.dispatchEvent(new CustomEvent('heirloom:config-updated'));
  }
  window.HeirloomApplyPublishedConfig = applyPreviewConfig;

  var editableContentPaths = {
    'couple.names': 'couple.namesLine',
    'couple.initials': 'couple.initials',
    'couple.partner-one': 'couple.partnerOne',
    'couple.partner-two': 'couple.partnerTwo',
    'wedding.display': 'wedding.display',
    'wedding.words': 'wedding.words',
    'wedding.numerals': 'wedding.numerals',
    'wedding.zoneLabel': 'wedding.zoneLabel',
    'venue.name': 'venue.name',
    'venue.address': 'venue.address',
    'rsvp.deadline': 'rsvp.deadline'
  };

  function previewMessage(message) {
    if (window.parent === window) return;
    window.parent.postMessage(message, window.location.origin === 'null' ? '*' : window.location.origin);
  }

  function configPathForContent(key) {
    if (key.indexOf('content.nav') === 0 || key.indexOf('content.menu') === 0) return '';
    if (key.indexOf('content.') === 0) return key;
    return editableContentPaths[key] || '';
  }

  var fontFamilies = {
    editorial: {
      bodoni: "'Bodoni Moda', serif",
      playfair: "'Playfair Display', serif",
      dmSerif: "'DM Serif Display', serif",
      cormorant: "'Cormorant Garamond', serif",
      prata: "'Prata', serif",
      marcellus: "'Marcellus', serif",
      italiana: "'Italiana', serif",
      libreCaslon: "'Libre Caslon Text', serif"
    },
    display: {
      cormorant: "'Cormorant Garamond', serif",
      ebGaramond: "'EB Garamond', serif",
      lora: "'Lora', serif",
      playfair: "'Playfair Display', serif",
      cardo: "'Cardo', serif",
      spectral: "'Spectral', serif",
      crimsonPro: "'Crimson Pro', serif",
      libreBaskerville: "'Libre Baskerville', serif"
    },
    script: {
      pinyon: "'Pinyon Script', cursive",
      greatVibes: "'Great Vibes', cursive",
      allura: "'Allura', cursive",
      tangerine: "'Tangerine', cursive",
      parisienne: "'Parisienne', cursive",
      alexBrush: "'Alex Brush', cursive",
      mrsSaintDelafield: "'Mrs Saint Delafield', cursive",
      herrVonMuellerhoff: "'Herr Von Muellerhoff', cursive"
    },
    hand: {
      laBelle: "'La Belle Aurore', cursive",
      caveat: "'Caveat', cursive",
      cedarville: "'Cedarville Cursive', cursive",
      shadowsIntoLight: "'Shadows Into Light', cursive",
      homemadeApple: "'Homemade Apple', cursive",
      nothingYouCouldDo: "'Nothing You Could Do', cursive"
    },
    body: {
      jost: "'Jost', sans-serif",
      dmSans: "'DM Sans', sans-serif",
      lato: "'Lato', sans-serif",
      montserrat: "'Montserrat', sans-serif",
      karla: "'Karla', sans-serif",
      workSans: "'Work Sans', sans-serif",
      outfit: "'Outfit', sans-serif",
      sourceSans: "'Source Sans 3', sans-serif"
    }
  };

  function applyFonts() {
    var fonts = cfg.fonts || {};
    Object.keys(fontFamilies).forEach(function (role) {
      var choices = fontFamilies[role];
      var selected = choices[fonts[role]] || choices[{
        editorial: 'playfair',
        display: 'ebGaramond',
        script: 'greatVibes',
        hand: 'caveat',
        body: 'dmSans'
      }[role]];
      document.documentElement.style.setProperty('--font-' + role, selected);
    });
  }

  function colorSelectorFor(element) {
    var parts = [];
    var current = element;
    while (current && current !== document.body && current.parentElement) {
      var tag = current.tagName.toLowerCase();
      var index = 1;
      var sibling = current;
      while ((sibling = sibling.previousElementSibling)) {
        if (sibling.tagName.toLowerCase() === tag) index++;
      }
      parts.unshift(tag + ':nth-of-type(' + index + ')');
      current = current.parentElement;
    }
    return parts.length ? 'body > ' + parts.join(' > ') : '';
  }

  function colorToHex(color) {
    var match = color.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?/i);
    if (!match) return '';
    if (match[4] !== undefined && Number(match[4]) === 0) return '';
    return '#' + match.slice(1, 4).map(function (part) {
      return Number(part).toString(16).padStart(2, '0');
    }).join('').toUpperCase();
  }

  function backgroundToHex(styles) {
    return colorToHex(styles.backgroundColor);
  }

  /* The colour a region really shows: walk up until a painted
     background is found, so gradient sections still get a fair
     starting value in the editor's background tooltip.          */
  function effectiveBackground(element) {
    var current = element;
    while (current && current !== document.documentElement) {
      var hex = backgroundToHex(window.getComputedStyle(current));
      if (hex) return hex;
      current = current.parentElement;
    }
    return '#FAF6EF';
  }

  /* Removable & recolourable pieces of the suite — keyed in HTML
     via data-element-key and hidden through config.hiddenElements. */
  var elementLabels = {
    'opening-garland-top': 'Rose garland · top left',
    'opening-garland-bottom': 'Rose garland · bottom right',
    'opening-glow': 'Silk glow',
    'opening-eyebrow': 'Opening introduction',
    'opening-names': 'Opening names',
    'gatefold-shadow': 'Card shadow',
    'gatefold-door-left': 'Silk door · left',
    'gatefold-door-right': 'Silk door · right',
    'gatefold-bow': 'Silk ribbon bow',
    'gatefold-address': 'Address tag',
    'opening-hint': 'Invitation hint',
    'open-button': 'Open button',
    'hero-garland-top': 'Rose garland · announcement top',
    'hero-garland-bottom': 'Rose garland · announcement bottom',
    'hero-glow': 'Announcement glow',
    'hero-wreath': 'Rose-wreath monogram crest',
    'hero-eyebrow': 'Announcement introduction',
    'hero-names': 'First name',
    'hero-names-two': 'Second name',
    'hero-actions': 'Announcement buttons',
    'hero-petals': 'Petal frame · corner',
    'vow-swag': 'Formal card garland',
    'story-aside': 'Story side inscription',
    'story-card-one': 'Story postcard i',
    'story-card-two': 'Story postcard ii',
    'story-keepsake': 'Stamp & postmark',
    'story-bouquet': 'The wedding bouquet',
    'story-quote-card': 'Keepsake quote card',
    'story-caption': 'Story keepsake print',
    'story-note': 'Story handwritten note',
    'std-glow': 'Blush glow',
    'std-rose': 'Save-the-date roses',
    'std-ribbon': 'Save-the-date ribbon',
    'std-actions': 'Calendar buttons',
    'particulars-spray': 'Details centerpiece',
    'detail-ceremony': 'Details · ceremony',
    'detail-reception': 'Details · reception',
    'detail-reply': 'Details · kindly reply',
    'particulars-strip': 'The particulars list',
    'palette-bow': 'Palette silk bow',
    'palette-swatches': 'Palette ribbons',
    'palette-dresscode': 'Dress code card',
    'itinerary-spray-a': 'Programme spray · top',
    'itinerary-spray-b': 'Programme spray · bottom',
    'day-words': 'Wedding-day programme',
    'venue-arbor': 'The rose-arbour painting',
    'venue-card': 'Venue details card',
    'rsvp-frame': 'RSVP rose frame',
    'countdown-bunting': 'Countdown garland',
    'countdown-clock': 'Countdown ovals',
    'closing-garland-top': 'Closing garland · top left',
    'closing-garland-bottom': 'Closing garland · bottom right',
    'closing-seal': 'Monogram medallion',
    'closing-actions': 'Closing buttons',
    'footer-ornament': 'Footer ornament'
  };

  function keyFor(element) {
    var keyed = element && element.closest ? element.closest('[data-element-key]') : null;
    return keyed ? keyed.getAttribute('data-element-key') : '';
  }

  var appliedHiddenElements = [];

  function applyHiddenElements() {
    appliedHiddenElements.forEach(function (element) {
      element.style.removeProperty('display');
    });
    appliedHiddenElements = [];
    var hidden = cfg.hiddenElements;
    if (hidden && typeof hidden === 'object' && !Array.isArray(hidden)) {
      Object.keys(hidden).forEach(function (key) {
        if (!hidden[key]) return;
        var element;
        try {
          element = document.querySelector('[data-element-key="' + key + '"]');
        } catch (error) {
          return;
        }
        if (!element) return;
        appliedHiddenElements.push(element);
        element.style.setProperty('display', 'none', 'important');
      });
    }
    /* elements without a key are removed by their structural
       selector, so every clickable element can be taken out     */
    var hiddenSelectors = cfg.hiddenSelectors;
    if (hiddenSelectors && typeof hiddenSelectors === 'object' && !Array.isArray(hiddenSelectors)) {
      Object.keys(hiddenSelectors).forEach(function (selector) {
        if (!hiddenSelectors[selector] || typeof selector !== 'string' ||
            selector.indexOf('body > ') !== 0) return;
        var element;
        try {
          element = document.querySelector(selector);
        } catch (error) {
          return;
        }
        if (!element) return;
        appliedHiddenElements.push(element);
        element.style.setProperty('display', 'none', 'important');
      });
    }
  }

  function labelFor(element) {
    /* keyed pieces carry a clean catalogue name — prefer it over
       scraped text so the tooltip always reads well */
    var keyed = element && element.closest ? element.closest('[data-element-key]') : null;
    if (keyed) {
      var key = keyed.getAttribute('data-element-key');
      if (key && elementLabels[key]) return elementLabels[key];
    }
    var text = (element.textContent || '').trim().replace(/\s+/g, ' ');
    if (text) return text.slice(0, 40);
    var key = keyFor(element);
    if (key && elementLabels[key]) return elementLabels[key];
    if (element.getAttribute('aria-label')) return element.getAttribute('aria-label').slice(0, 40);
    var cls = (element.className || '').toString().trim().split(/\s+/)[0] || '';
    if (cls) return cls.replace(/[_.-]+/g, ' ').replace(/\b\w/g, function (ch) {
      return ch.toUpperCase();
    }).slice(0, 40);
    return element.tagName.toLowerCase();
  }

  function sendColorSelection(element, removeKey) {
    var selector = colorSelectorFor(element);
    if (!selector) return;
    var styles = window.getComputedStyle(element);
    var rect = element.getBoundingClientRect();
    var ownKey = (element.getAttribute && element.getAttribute('data-element-key')) || '';
    var key = removeKey || ownKey || keyFor(element);
    previewMessage({
      type: 'heirloom:element-selected',
      element: 'color',
      selector: selector,
      key: key,
      keySelf: !!(removeKey || ownKey),
      removable: true,
      label: labelFor(element),
      color: colorToHex(styles.color) || '#f8f1e3',
      backgroundColor: backgroundToHex(styles),
      anchor: { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
    });
  }

  function sendBackgroundSelection(element, x, y) {
    var selector = element === document.body ? 'body' : colorSelectorFor(element);
    if (!selector) return;
    var name = element.id ? '#' + element.id :
      (element.getAttribute('aria-label') || element.className || 'background')
        .toString().trim().replace(/\s+/g, ' ').split(' ').slice(0, 2).join(' ');
    previewMessage({
      type: 'heirloom:element-selected',
      element: 'background',
      selector: selector,
      key: '',
      removable: false,
      label: 'Background · ' + name,
      backgroundColor: effectiveBackground(element),
      anchor: { left: (x || 0) - 30, top: (y || 0) - 30, width: 60, height: 60 }
    });
  }

  var appliedColorElements = [];

  function applyColorEdits() {
    appliedColorElements.forEach(function (entry) {
      if (entry.color) entry.element.style.setProperty('color', entry.color, entry.colorPriority);
      else entry.element.style.removeProperty('color');
      if (entry.backgroundColor) {
        entry.element.style.setProperty('background-color', entry.backgroundColor, entry.backgroundPriority);
      } else {
        entry.element.style.removeProperty('background-color');
      }
    });
    appliedColorElements = [];
    var edits = cfg.colorEdits;
    if (!edits || typeof edits !== 'object' || Array.isArray(edits)) return;
    Object.keys(edits).forEach(function (selector) {
      var edit = edits[selector];
      if (!edit || typeof edit !== 'object') return;
      var element;
      try {
        element = document.querySelector(selector);
      } catch (error) {
        return;
      }
      if (!element) return;
      appliedColorElements.push({
        element: element,
        color: element.style.getPropertyValue('color'),
        colorPriority: element.style.getPropertyPriority('color'),
        backgroundColor: element.style.getPropertyValue('background-color'),
        backgroundPriority: element.style.getPropertyPriority('background-color')
      });
      if (/^#[0-9a-f]{6}$/i.test(edit.color || '')) {
        element.style.setProperty('color', edit.color, 'important');
      }
      if (/^#[0-9a-f]{6}$/i.test(edit.backgroundColor || '')) {
        element.style.setProperty('background-color', edit.backgroundColor, 'important');
        /* gradient images would cover the flat colour — clear them so
           the change is always visible in the preview and live page */
        element.style.setProperty('background-image', 'none', 'important');
      }
    });
  }

  var clearEditorSelection = null;

  function enableCanvasEditing() {
    if (window.parent === window) return;
    document.body.classList.add('editor-live');
    var activeText = null;
    var activeColorElement = null;
    var editorStyles = document.createElement('style');
    editorStyles.textContent =
      '[data-content][contenteditable="true"],[data-editor-path][contenteditable="true"]{' +
        'outline:1px dashed rgba(203,185,142,.95)!important;' +
        'outline-offset:4px!important;cursor:text!important;' +
      '}' +
      '.fleur-editor-color-selected{' +
        'outline:1px dashed rgba(203,185,142,.9)!important;' +
        'outline-offset:3px!important;' +
        'cursor:crosshair!important;' +
      '}' +
      /* decorative pieces ignore pointer events on the guest page —
         the editor needs to reach them for recolour & removal      */
      '.opening__garland,.opening__glow,.gatefold__bow,.gatefold__tag,' +
      '.gatefold__door,.hero__garland,.hero__glow,.hero__crest,.hero__petals,' +
      '.vow__swag,.postcard__stamp,.story__bouquet,.story__mini,.story__quote,' +
      '.std__glow,.std__rose,.std__ribbon,.particulars__spray,.palette__bow,' +
      '.itinerary__spray,.venue__arch,.rsvp__frame,.countdown__bunting,' +
      '.closing__garland,.closing__seal{' +
        'pointer-events:auto!important;' +
      '}' +
      '[data-element-key]:not([contenteditable="true"]){cursor:crosshair;}';
    document.head.appendChild(editorStyles);

    function clearActive() {
      if (activeColorElement) activeColorElement.classList.remove('fleur-editor-color-selected');
      activeColorElement = null;
      if (activeText) activeText.blur();
      activeText = null;
    }

    clearEditorSelection = function () {
      if (activeText) {
        activeText.removeAttribute('contenteditable');
        activeText.classList.remove('fleur-editor-text-active');
      }
      clearActive();
    };

    document.addEventListener('click', function (event) {
      if (event.target.closest('#skip-intro')) {
        /* the skip link stays fully functional and never selectable —
           discard any open selection so the tooltip never lingers    */
        previewMessage({ type: 'heirloom:element-selected', element: 'none' });
        clearActive();
        return;
      }
      if (event.target.closest('input, textarea, select, label')) {
        previewMessage({ type: 'heirloom:element-selected', element: 'none' });
        clearActive();
        return;
      }

      var textElement = event.target.closest('[data-editor-path], [data-content]');
      var textPath = '';
      if (textElement) {
        textPath = textElement.getAttribute('data-editor-path') ||
          configPathForContent(textElement.getAttribute('data-content') || '');
        if (textElement.closest('[data-nav], #mobile-menu')) textPath = '';
      }
      if (textElement && textPath && typeof getConfigValue(textPath) === 'string' &&
          !textElement.closest('svg')) {
        /* SVG artwork text (the arch monogram & numerals) stays out
           of the text editor — it is recoloured or removed with its
           group instead, and follows the sidebar fields         */
        event.stopPropagation();
        if (textElement === activeText) return;
        if (textElement.closest('a, button')) event.preventDefault();
        if (activeText && activeText !== textElement) activeText.blur();
        if (activeColorElement && activeColorElement !== textElement) {
          activeColorElement.classList.remove('fleur-editor-color-selected');
        }
        activeColorElement = textElement;
        textElement.classList.add('fleur-editor-color-selected');
        activeText = textElement;
        textElement.contentEditable = 'true';
        textElement.classList.add('fleur-editor-text-active');
        textElement.focus();
        var selection = window.getSelection();
        if (selection) {
          var range = document.createRange();
          range.selectNodeContents(textElement);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
          if (textElement.hasAttribute('data-editor-placeholder')) {
            textElement.textContent = textElement.getAttribute('data-editor-placeholder');
            selection.selectNodeContents(textElement);
          }
        }
        var keyedOwner = keyFor(textElement);
        previewMessage({
          type: 'heirloom:element-selected',
          element: 'text',
          path: textPath,
          selector: colorSelectorFor(textElement),
          key: keyedOwner,
          keySelf: textElement.hasAttribute('data-element-key'),
          removable: !!keyedOwner,
          label: labelFor(textElement),
          color: colorToHex(window.getComputedStyle(textElement).color) || '#f8f1e3',
          backgroundColor: backgroundToHex(window.getComputedStyle(textElement)),
          anchor: (function () {
            var rect = textElement.getBoundingClientRect();
            return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
          })()
        });
        return;
      }

      /* card faces paint over their keyed wrappers — select the
         face itself for recolouring; Remove targets the keyed
         parent (passed as removeKey) so the whole piece comes away */
      var cardFace = event.target.closest('.gatefold__door-face, .gatefold__inner, ' +
        '.gatefold__card, .gatefold__tag');
      if (cardFace) {
        event.preventDefault();
        event.stopPropagation();
        clearActive();
        activeColorElement = cardFace;
        cardFace.classList.add('fleur-editor-color-selected');
        sendColorSelection(cardFace, keyFor(cardFace));
        return;
      }

      /* keyed decorative pieces (florals, seal, stamp, band…) —
         selectable for recolouring and removable                  */
      var keyedElement = event.target.closest('[data-element-key]');
      if (keyedElement && !keyedElement.closest('[data-nav], #mobile-menu')) {
        event.preventDefault();
        event.stopPropagation();
        clearActive();
        activeColorElement = keyedElement;
        keyedElement.classList.add('fleur-editor-color-selected');
        sendColorSelection(keyedElement);
        return;
      }

      var colorElement = event.target.closest('a, button, p, h1, h2, h3, h4, li, span, strong, em, blockquote, svg');
      if (colorElement && !colorElement.closest('[data-nav], #mobile-menu')) {
        event.preventDefault();
        event.stopPropagation();
        clearActive();
        activeColorElement = colorElement;
        colorElement.classList.add('fleur-editor-color-selected');
        sendColorSelection(colorElement);
        return;
      }

      /* blank space → select the surrounding background for recolouring */
      var backgroundElement = event.target.closest('section, header, footer') || document.body;
      sendBackgroundSelection(backgroundElement, event.clientX, event.clientY);
      clearActive();
    }, true);

    document.addEventListener('blur', function (event) {
      var element = event.target;
      if (!element.matches || !element.matches('[contenteditable="true"][data-content], [contenteditable="true"][data-editor-path]')) return;
      var path = element.getAttribute('data-editor-path') ||
        configPathForContent(element.getAttribute('data-content') || '');
      element.removeAttribute('contenteditable');
      element.classList.remove('fleur-editor-text-active');
      if (path) previewMessage({
        type: 'heirloom:element-edited',
        element: 'text',
        path: path,
        value: element.hasAttribute('data-editor-placeholder') &&
          element.textContent === element.getAttribute('data-editor-placeholder')
          ? ''
          : element.textContent
      });
      if (activeText === element) activeText = null;
    }, true);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && event.target.matches &&
          event.target.matches('[contenteditable="true"][data-content], [contenteditable="true"][data-editor-path]')) {
        event.preventDefault();
        event.target.blur();
      }
    }, true);
  }

  window.addEventListener('message', function (event) {
    if (window.parent === window || event.source !== window.parent || event.origin !== window.location.origin) return;
    var message = event.data;
    if (!message) return;
    if (message.type === 'heirloom:preview' && message.config) {
      var previewConfig = message.config;
      if (previewConfig.rsvp) previewConfig.rsvp.endpoint = '';
      applyPreviewConfig(previewConfig);
    }
    if (message.type === 'heirloom:clear-selection' && clearEditorSelection) {
      clearEditorSelection();
    }
  });

  var themePresets = {
    blush: { burgundy: '#A76A6F', deep: '#8F555C', wine: '#6E4048', crimson: '#C08587', champagne: '#C2A165', soft: '#AC8D57', parchment: '#F4ECE2', ivory: '#FAF6EF', paper: '#FDFBF6', night: '#5E343D', nightDeep: '#4C2A33', olive: '#97A28B', oliveDeep: '#7E8A73', sage: '#B4BBA6', rose: '#D8A3A1', ink: '#54444B', inkSoft: '#6F5D64', charcoal: '#97848B' },
    porcelain: { burgundy: '#B08D57', deep: '#997747', wine: '#55483A', crimson: '#C4A472', champagne: '#C9A86A', soft: '#B39258', parchment: '#F5F0E6', ivory: '#FBF8F1', paper: '#FEFCF8', night: '#4E463C', nightDeep: '#3F382F', olive: '#A8AC96', oliveDeep: '#8B907C', sage: '#C0C2B0', rose: '#DDB4AC', ink: '#4E463F', inkSoft: '#6A6154', charcoal: '#958C7E' },
    meadow: { burgundy: '#74836B', deep: '#5F6D57', wine: '#47523F', crimson: '#8FA383', champagne: '#BFA46A', soft: '#A98F55', parchment: '#EFF0E4', ivory: '#F8F8F0', paper: '#FCFCF5', night: '#3D4637', nightDeep: '#313A2C', olive: '#6F7F62', oliveDeep: '#5A6A4E', sage: '#AEB8A2', rose: '#CFAFA0', ink: '#454F41', inkSoft: '#5F6B58', charcoal: '#8A927F' },
    powder: { burgundy: '#7A8FA6', deep: '#66788D', wine: '#46586B', crimson: '#93A7BC', champagne: '#C2A165', soft: '#AC8D57', parchment: '#EAEEF2', ivory: '#F7F8FA', paper: '#FCFCFE', night: '#46586B', nightDeep: '#38485A', olive: '#93A2A6', oliveDeep: '#7A8B8F', sage: '#B7C3C6', rose: '#D9A9A6', ink: '#44515E', inkSoft: '#5D6B7A', charcoal: '#8B97A3' }
  };

  function applyTheme() {
    var themeName = Object.prototype.hasOwnProperty.call(themePresets, cfg.theme) ? cfg.theme : 'blush';
    var colors = themePresets[themeName];
    var root = document.documentElement;
    root.style.setProperty('--burgundy', colors.burgundy);
    root.style.setProperty('--burgundy-deep', colors.deep);
    root.style.setProperty('--wine', colors.wine);
    root.style.setProperty('--crimson', colors.crimson);
    root.style.setProperty('--champagne', colors.champagne);
    root.style.setProperty('--champagne-soft', colors.soft);
    root.style.setProperty('--parchment', colors.parchment);
    root.style.setProperty('--ivory', colors.ivory);
    root.style.setProperty('--paper-raised', colors.paper);
    root.style.setProperty('--night', colors.night);
    root.style.setProperty('--night-deep', colors.nightDeep);
    root.style.setProperty('--olive', colors.olive);
    root.style.setProperty('--olive-deep', colors.oliveDeep);
    root.style.setProperty('--sage', colors.sage);
    root.style.setProperty('--rose', colors.rose);
    root.style.setProperty('--ink', colors.ink);
    root.style.setProperty('--ink-soft', colors.inkSoft);
    root.style.setProperty('--charcoal', colors.charcoal);
    root.style.setProperty('--shadow-seal',
      '0 4px 10px color-mix(in srgb, ' + colors.burgundy + ' 45%, transparent), ' +
      '0 14px 30px color-mix(in srgb, ' + colors.burgundy + ' 28%, transparent)');
    var customColors = cfg.themeColors || {};
    var colorRoles = {
      primary: ['--burgundy', '--burgundy-deep', '--crimson'],
      darkBackground: ['--wine', '--night', '--night-deep'],
      paper: ['--ivory', '--paper-raised', '--parchment'],
      accent: ['--champagne', '--champagne-soft', '--gold'],
      botanical: ['--olive', '--olive-deep', '--sage'],
      rose: ['--rose']
    };
    Object.keys(colorRoles).forEach(function (role) {
      var color = customColors[role];
      if (!/^#[0-9a-f]{6}$/i.test(color || '')) return;
      colorRoles[role].forEach(function (property) {
        root.style.setProperty(property, color);
      });
    });
    document.documentElement.dataset.theme = themeName;
    var themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) themeColorMeta.content = colors.night;
  }

  injectContent();
  applyColorEdits();
  applyHiddenElements();
  enableCanvasEditing();

  /* ══ 2 · NAVIGATION ════════════════════════════════════════════ */
  var nav = document.querySelector('[data-nav]');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Full-screen scene index (mobile menu) */
  var menuToggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('mobile-menu');
  var menuClose = document.getElementById('menu-close');
  var menuPreviousOverflow = '';

  function setMenu(open) {
    if (!menu || !menuToggle) return;
    menu.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) {
      menuPreviousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      var first = menu.querySelector('a, button');
      if (first) first.focus();
      document.addEventListener('keydown', onMenuKeydown);
    } else {
      document.removeEventListener('keydown', onMenuKeydown);
      document.body.style.overflow = menuPreviousOverflow;
      menuToggle.focus();
    }
  }
  function onMenuKeydown(e) {
    if (e.key === 'Escape') {
      setMenu(false);
      return;
    }
    if (e.key !== 'Tab') return;
    var focusable = menu.querySelectorAll('a[href], button:not([disabled])');
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', function () { setMenu(menu.hidden); });
    if (menuClose) menuClose.addEventListener('click', function () { setMenu(false); });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
  }

  /* Active-section highlighting in the nav */
  (function initActiveLinks() {
    var ids = ['story', 'details', 'venue', 'rsvp'];
    var links = {};
    document.querySelectorAll('.nav__links a').forEach(function (a) {
      var id = (a.getAttribute('href') || '').replace('#', '');
      if (id) links[id] = a;
    });
    if (!('IntersectionObserver' in window)) return;
    var current = null;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = links[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          if (current && current !== link) current.removeAttribute('aria-current');
          link.setAttribute('aria-current', 'true');
          current = link;
        } else if (current === link) {
          link.removeAttribute('aria-current');
          current = null;
        }
      });
    }, { rootMargin: '-38% 0px -55% 0px' });
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  })();

  /* Sections become focusable targets for anchor navigation */
  document.querySelectorAll('main section[id]').forEach(function (s) {
    if (!s.hasAttribute('tabindex')) s.setAttribute('tabindex', '-1');
  });
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href.length < 2 || href === '#') return;
    a.addEventListener('click', function () {
      var target = document.getElementById(href.slice(1));
      if (target) {
        // native smooth scrolling happens; we only move focus for a11y
        window.setTimeout(function () {
          try { target.focus({ preventScroll: true }); } catch (e) {}
        }, 650);
      }
    });
  });

  /* ══ 3 · PALETTE SWATCHES ══════════════════════════════════════ */
  function renderPalette() {
    var list = document.getElementById('palette-swatches');
    if (!list) return;
    var swatches = Array.isArray(cfg.palette) ? cfg.palette : [];
    list.innerHTML = swatches.map(function (entry) {
      if (!entry || typeof entry !== 'object') return '';
      var color = typeof entry.color === 'string' ? entry.color : '';
      if (!/^#[0-9a-fA-F]{3,8}$/.test(color)) return '';
      var name = typeof entry.name === 'string' && entry.name.trim()
        ? entry.name.trim() : color;
      return '<li><span class="swatch" style="background:' + escapeHTML(color) + '"' +
        ' role="img" aria-label="' + escapeHTML(name) + '"></span>' +
        '<span class="swatch-name">' + escapeHTML(name) + '</span></li>';
    }).join('');
    list.hidden = !swatches.length;
  }
  renderPalette();

  /* ══ 4 · WEDDING-DAY PROGRAMME ═════════════════════════════ */
  /* One short word per moment, in order, strung along a gold
     thread like pearls on a bridal ribbon.                     */
  function renderMoments() {
    var list = document.getElementById('day-words');
    var scene = document.getElementById('itinerary');
    var items = Array.isArray(cfg.moments) ? cfg.moments.map(function (word, index) {
      return { word: word, index: index };
    }).filter(function (item) {
      return typeof item.word === 'string' && item.word.trim();
    }) : [];
    if (!list) return;
    if (!items.length) {
      if (scene) scene.hidden = true;
      return;
    }
    if (scene) scene.hidden = false;
    list.innerHTML = items.map(function (item) {
      return '<li class="day-word reveal">' +
        '<span class="day-word__bulb" aria-hidden="true"></span>' +
        '<span class="day-word__text" data-editor-path="moments.' + item.index + '">' +
        escapeHTML(item.word.trim()) + '</span></li>';
    }).join('');
    if (window.parent !== window) {
      list.querySelectorAll('.reveal').forEach(function (item) { item.classList.add('in-view'); });
    }
  }
  renderMoments();

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  /* ══ 5 · COUNTDOWN ═════════════════════════════════════════════ */
  var countdownTimer = null;
  var countdownVisibilityHandler = null;
  function initCountdown() {
    if (countdownTimer) window.clearInterval(countdownTimer);
    if (countdownVisibilityHandler) document.removeEventListener('visibilitychange', countdownVisibilityHandler);
    var box = document.getElementById('countdown-clock');
    var msg = document.getElementById('countdown-message');
    var summary = document.getElementById('countdown-summary');
    if (!box || !msg) return;

    var els = {
      d: box.querySelector('[data-cd-days]'),
      h: box.querySelector('[data-cd-hours]'),
      m: box.querySelector('[data-cd-mins]'),
      s: box.querySelector('[data-cd-secs]')
    };
    if (!els.d || !els.h || !els.m || !els.s) return;

    function showMsg(text) {
      box.hidden = true;
      msg.hidden = false;
      msg.textContent = text;
      if (summary) summary.textContent = '';
    }

    var raw = cfg.wedding && cfg.wedding.iso;
    var target = raw ? new Date(raw) : null;

    if (!target || isNaN(target.getTime())) {
      showMsg((cfg.countdown && cfg.countdown.invalidMessage) ||
              'See the details below for the full schedule.');
      return;
    }

    var lastDayText = '';

    function pad(n) { return String(n).padStart(2, '0'); }

    function tick() {
      var diff = target.getTime() - Date.now();
      if (diff <= 0) {
        if (countdownTimer) window.clearInterval(countdownTimer);
        countdownTimer = null;
        showMsg((cfg.countdown && cfg.countdown.pastMessage) || 'The celebration has begun.');
        return;
      }
      var d = Math.floor(diff / 86400000);
      var h = Math.floor(diff / 3600000) % 24;
      var m = Math.floor(diff / 60000) % 60;
      var s = Math.floor(diff / 1000) % 60;

      els.d.textContent = String(d);
      els.h.textContent = pad(h);
      els.m.textContent = pad(m);
      els.s.textContent = pad(s);

      var dayText = d + (d === 1 ? ' day' : ' days') + ' until the wedding';
      if (dayText !== lastDayText) {
        lastDayText = dayText;
        if (summary) summary.textContent = dayText;
      }
    }

    tick();
    box.hidden = false;
    msg.hidden = true;
    countdownTimer = window.setInterval(tick, 1000);

    /* pause the ticker while the tab is hidden */
    countdownVisibilityHandler = function () {
      if (document.hidden) {
        if (countdownTimer) { window.clearInterval(countdownTimer); countdownTimer = null; }
      } else if (!countdownTimer) {
        tick();
        countdownTimer = window.setInterval(tick, 1000);
      }
    };
    document.addEventListener('visibilitychange', countdownVisibilityHandler);
  }
  initCountdown();

  /* ══ 6 · VENUE MAP LINK ════════════════════════════════════════ */
  function initMapLink() {
    var link = document.getElementById('map-link');
    if (!link) return;
    var v = cfg.venue || {};
    var location = [v.name, v.address].filter(Boolean).join(', ');
    var query = v.mapsQuery || location || '';
    link.removeAttribute('href');
    if (typeof v.mapUrl === 'string' && /^https?:\/\//i.test(v.mapUrl)) {
      link.href = v.mapUrl;
    } else if (query) {
      link.href = 'https://www.google.com/maps/search/?api=1&query=' +
        encodeURIComponent(query);
    }
    link.target = '_blank';
    link.rel = 'noopener';
  }
  initMapLink();

  /* ══ 7 · ADD TO CALENDAR (real .ics file + Google Calendar) ═════ */
  function padNum(n, len) { return String(n).padStart(len || 2, '0'); }
  function icsUTC(ms) {
    var d = new Date(ms);
    return d.getUTCFullYear() + padNum(d.getUTCMonth() + 1) + padNum(d.getUTCDate()) +
           'T' + padNum(d.getUTCHours()) + padNum(d.getUTCMinutes()) + padNum(d.getUTCSeconds()) + 'Z';
  }
  function icsEscape(s) {
    return String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,')
                    .replace(/\r?\n/g, '\\n');
  }

  function calendarData() {
    var w = cfg.wedding || {};
    var v = cfg.venue || {};
    var c = cfg.couple || {};
    var start = w.iso ? new Date(w.iso) : null;
    if (!start || isNaN(start.getTime())) return null;
    var end = w.endIso ? new Date(w.endIso) : new Date(start.getTime() + 4 * 3600000);
    if (isNaN(end.getTime()) || end.getTime() <= start.getTime()) return null;
    var title = w.eventTitle || ((c.namesLine || 'Our Wedding'));
    var location = [v.name, v.address].filter(Boolean).join(', ');
    var url = '';
    if (typeof v.mapUrl === 'string' && /^https?:\/\//i.test(v.mapUrl)) url = v.mapUrl;
    else if (v.mapsQuery || location) url = 'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent(v.mapsQuery || location);
    return { start: start, end: end, title: title, location: location, url: url };
  }

  var icsBtn = document.getElementById('ics-download');
  if (icsBtn) {
    icsBtn.addEventListener('click', function () {
      var data = calendarData();
      if (!data) return;
      var lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Evermore//Wedding Invitation//EN',
        'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        'UID:' + icsUTC(data.start.getTime()) + '-evermore@invitation',
        'DTSTAMP:' + icsUTC(Date.now()),
        'DTSTART:' + icsUTC(data.start.getTime()),
        'DTEND:' + icsUTC(data.end.getTime()),
        'SUMMARY:' + icsEscape(data.title),
        'LOCATION:' + icsEscape(data.location || 'To be announced'),
        'DESCRIPTION:' + icsEscape('With love, ' + (cfg.couple && cfg.couple.namesLine || '') +
                       '. See the invitation for details.' + (data.url ? '\\n' + data.url : '')),
        'END:VEVENT',
        'END:VCALENDAR'
      ];
      var blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'wedding-invitation.ics';
      document.body.appendChild(a);
      a.click();
      window.setTimeout(function () {
        URL.revokeObjectURL(url);
        a.remove();
      }, 400);
    });
  }

  function updateGcalLink() {
    var gcalLink = document.getElementById('gcal-link');
    if (!gcalLink) return;
    var data = calendarData();
    gcalLink.removeAttribute('href');
    if (data) {
      var params = new URLSearchParams({
        action: 'TEMPLATE',
        text: data.title,
        dates: icsUTC(data.start.getTime()) + '/' + icsUTC(data.end.getTime()),
        location: data.location || '',
        details: 'See the invitation for details.' + (data.url ? ' ' + data.url : '')
      });
      gcalLink.href = 'https://calendar.google.com/calendar/render?' + params.toString();
      gcalLink.target = '_blank';
      gcalLink.rel = 'noopener';
    }
  }
  updateGcalLink();

  /* ══ 8 · SECTION REVEALS (CSS transitions + IntersectionObserver) ══ */
  (function initReveals() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    /* gentle natural stagger inside marked groups */
    document.querySelectorAll('[data-stagger]').forEach(function (group) {
      Array.prototype.forEach.call(group.querySelectorAll('.reveal'), function (el, i) {
        if (!el.style.getPropertyValue('--reveal-delay')) {
          el.style.setProperty('--reveal-delay', (i * 0.09).toFixed(2) + 's');
        }
      });
    });

    if (reducedQuery.matches || !('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  })();

  /* ══ 9 · A BREATH OF PARALLAX (GSAP only, never essential) ═════ */
  function initParallax() {
    if (!hasST || reducedQuery.matches) return;
    try { gsap.registerPlugin(ScrollTrigger); } catch (e) { return; }
    document.querySelectorAll('[data-drift]').forEach(function (el) {
      gsap.fromTo(el, { yPercent: -3 }, {
        yPercent: 3, ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section') || el,
          start: 'top bottom', end: 'bottom top', scrub: true
        }
      });
    });
  }
  if (document.body.classList.contains('intro-done')) initParallax();
  document.addEventListener('heirloom:intro-complete', initParallax);

  /* ══ 10 · OPTIONAL AMBIENT MUSIC ═══════════════════════════════ */
  (function initAudio() {
    var btn = document.getElementById('audio-toggle');
    if (!btn || !cfg.audio || !cfg.audio.src) return;

    var audio = new Audio();
    audio.src = cfg.audio.src;
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = 'none';

    var playing = false;
    btn.hidden = false;

    function render() {
      btn.innerHTML = playing
        ? '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18 6a8.5 8.5 0 0 1 0 12"/></svg>'
        : '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M22 9l-6 6"/><path d="M16 9l6 6"/></svg>';
      btn.setAttribute('aria-pressed', String(playing));
      btn.setAttribute('aria-label', playing ? 'Pause ambient music' : 'Play ambient music');
    }
    render();

    btn.addEventListener('click', function () {
      if (playing) {
        audio.pause();
        playing = false;
        render();
      } else {
        var p = audio.play();
        if (p && p.catch) {
          p.then(function () { playing = true; render(); })
           .catch(function () { render(); }); // browser policy — stays silent, stays honest
        } else {
          playing = true; render();
        }
      }
    });
  })();

  /* ══ 11 · REPLAY THE OPENING & RETURN TO TOP ═══════════════════ */
  var replayBtn = document.getElementById('replay-intro');
  if (replayBtn) {
    replayBtn.addEventListener('click', function () {
      if (typeof window.heirloomReplayIntro === 'function') {
        window.heirloomReplayIntro();
      } else {
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, 0);
      }
    });
  }
  var topBtn = document.getElementById('back-to-top');
  if (topBtn) {
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reducedQuery.matches ? 'auto' : 'smooth' });
    });
  }

})();
