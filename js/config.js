/* ═══════════════════════════════════════════════════════════════
   ROSALIND · config.js
   ---------------------------------------------------------------
   Main personalisation data for the site and visual editor.
   Longer copy, palette, and theme are editable here. Values
   marked SAMPLE are tasteful placeholders — replace them with
   your own before sending the link to your guests.
   ═══════════════════════════════════════════════════════════════ */

window.HEIRLOOM = {
  templateId: "rosalind",

  /* ── The couple — SAMPLE content, replace with your names ────── */
  couple: {
    partnerOne: "Arabella",                  // SAMPLE
    partnerTwo: "Theodore",                  // SAMPLE
    initials:  "A · T",                      // SAMPLE — used on seals & monograms
    namesLine: "Arabella & Theodore"         // SAMPLE — used across the site
  },

  /* ── The wedding date & time ─────────────────────────────────
     iso : ISO 8601 date-time WITH an explicit UTC offset, so the
           countdown and the calendar files are correct on every
           guest's device, wherever they are in the world.
           Format: "YYYY-MM-DDTHH:MM:SS±HH:MM"
           The sample below = 12 June 2027, 4:00 PM, GMT+1 (BST). */
  wedding: {
    iso: "2027-06-12T16:00:00+01:00",                                   // EDIT
    endIso: "2027-06-13T00:30:00+01:00",                                // EDIT — end of the celebration
    display: "Saturday, 12 June 2027 · Four in the afternoon",         // EDIT
    zoneLabel: "BST",                                                  // EDIT — optional note for guests abroad
    words: "Saturday · The Twelfth of June · Two Thousand Twenty-Seven", // EDIT
    numerals: "12 · 06 · 2027",                                       // EDIT
    eventTitle: "Arabella & Theodore — Wedding"                       // EDIT (calendar entry)
  },

  /* ── The venue ──────────────────────────────────────────────── */
  venue: {
    name: "The Orangery at Ashcombe Court",           // SAMPLE
    address: "Ashcombe Court, the Cotswolds",         // SAMPLE
    mapsQuery: "",                               // optional Maps search override
    /* A full URL here overrides the map link built above, e.g. an
       exact Google Maps place link or an Apple Maps URL.          */
    mapUrl: ""
  },

  /* ── Copy shown throughout the invitation ────────────────────
     The visual editor can change these values without editing HTML. */
  content: {
    pageTitle: "Arabella & Theodore · 12 June 2027 — The Orangery at Ashcombe Court",
    pageDescription: "Arabella and Theodore request the pleasure of your company in the rose gardens of Ashcombe Court on Saturday the twelfth of June 2027. Break the seal to open your invitation.",
    socialTitle: "Arabella & Theodore — An Invitation · 12.06.2027",
    socialDescription: "Blush roses, candlelight and an evening garden — you are warmly invited.",
    navStory: "Story",
    navDetails: "Details",
    navVenue: "Venue",
    navRsvp: "RSVP",
    menuInvitation: "The Announcement",
    menuStory: "Our Story",
    menuSaveDate: "Save the Date",
    menuDetails: "The Details",
    menuPalette: "The Palette",
    menuWeddingDay: "The Order of the Day",
    menuVenue: "Venue & Location",
    menuRsvp: "Kindly Respond",
    menuCountdown: "The Countdown",
    menuClosing: "A Closing Note",
    openingEyebrow: "The wedding of",
    openingHint: "Press the seal to open",
    openButton: "Open the Invitation",
    skipButton: "Skip straight to the invitation",
    sealCardLine: "for our dearest",
    sealCardGuests: "friends & family",
    invitationEyebrow: "Together with their families",
    invitationLead: "request the honour of your presence as they exchange vows beneath a bower of roses in the golden light of the Orangery, and celebrate afterwards with dinner, dancing and a toast or two.",
    invitationVenueSuffix: "· The Cotswolds",
    storyKicker: "№ 02 · Their Story",
    storyTitle: "Our",
    storyTitleScript: "Story",
    storyParagraphOne: "We met on a frost-bright December morning, over the last two mince pies at a crowded market stall — a borrowed scarf, a shared laugh, and one long conversation neither of us wanted to end.",
    storyParagraphTwo: "Six years, three homes and one rather opinionated spaniel later, we are finally opening the doors we always talked about. Nothing would mean more than to have you standing beside us when we say forever.",
    storyQuote: "“Somewhere between the first hello and every promise since, we found our always.”",
    storyQuoteLabel: "— a page from our notebook",
    storyNote: "written by candlelight, one december",
    storyNoteCredit: "— a note we keep returning to",
    storyAside: "the beginning of always",
    saveDateTitle: "Save the Date",
    saveDateCrossing: "and forever begins",
    saveDateNote: "The date is set. Add it to your calendar and keep these details close.",
    calendarDownloadLabel: "Add to Calendar",
    calendarGoogleLabel: "Google Calendar",
    detailsKicker: "№ 04 · The Particulars",
    detailsTitleFirst: "Wedding",
    detailsTitleSecond: "Details",
    detailsIntro: "The day, at a glance.",
    ceremonyLabel: "The Ceremony",
    ceremonyTime: "Four in the afternoon",
    ceremonyNote: "Vows in the Orangery as the light turns to gold.",
    receptionLabel: "The Reception",
    receptionTime: "Six in the evening",
    receptionNote: "A long dinner under the glass roof and dancing until the stars arrive.",
    kindlyReplyLabel: "Kindly Reply",
    kindlyReplyNote: "Kindly send your response using the reply card further below.",
    particularsEyebrow: "The Particulars",
    particularsDateLabel: "The Date",
    particularsPlaceLabel: "The Place",
    particularsAttireLabel: "The Attire",
    particularsAttire: "Black tie, with gold",
    particularsAttireNote: "Ivory, gold and green are welcome — wear what makes you feel wonderful.",
    particularsCarriagesLabel: "The Carriages",
    particularsCarriagesTime: "At midnight",
    particularsCarriagesNote: "The last dance ends as the lanterns grow low in the courtyard.",
    paletteKicker: "№ 05 · A Note on Colour",
    paletteTitleFirst: "The wedding",
    paletteTitleSecond: "palette",
    paletteIntro: "A study in blush roses, deep sage and candlelight gold — gathered from the garden, tied with ribbon, and chosen to feel like a June evening that never ends.",
    dressCodeLabel: "Attire · Black tie, with gold",
    dressCodeTitle: "Black tie, with gold",
    dressCodeNote: "Ivory, gold and green are welcome — a touch of shine is warmly encouraged. The palette is only a suggestion; wear what makes you feel wonderful.",
    weddingDayKicker: "№ 06 · The Celebration",
    weddingDayTitleFirst: "The Order of",
    weddingDayTitleSecond: "the Day",
    venueKicker: "№ 07 · The Place",
    venueDescription: "A Grade-II listed Orangery wrapped in white roses and old glass — where the vows are said beneath the arch of windows and dinner is served as the light fades to gold.",
    venueCeremonyLabel: "Ceremony",
    venueCeremonyText: "in the Orangery, at four in the afternoon",
    venueReceptionLabel: "Reception",
    venueReceptionText: "dinner & dancing beneath the glass roof",
    mapButton: "View Location",
    rsvpKicker: "№ 08 · Your Reply",
    rsvpTitle: "Kindly Respond",
    rsvpLead: "Kindly reply by",
    rsvpNameLabel: "Your name",
    rsvpNamePlaceholder: "e.g. Eleanor Whitmore",
    rsvpNameError: "May we have your name? Two letters or more will do.",
    rsvpAttendanceLabel: "Will you be joining us?",
    rsvpAcceptLabel: "Joyfully accepts",
    rsvpDeclineLabel: "Regretfully declines",
    rsvpAttendanceError: "Please let us know whether you can come.",
    rsvpGuestsLabel: "Seats in your party",
    rsvpGuestsError: "May we have a seat count between one and the party size allowed?",
    rsvpGuestSingular: "guest",
    rsvpGuestPlural: "guests",
    rsvpDietaryLabel: "Dietary requirements",
    rsvpDietaryPlaceholder: "Allergies, intolerances, or dishes to avoid",
    rsvpMessageLabel: "A note for the couple",
    rsvpMessagePlaceholder: "Song requests, memories, well wishes…",
    rsvpSubmitLabel: "Send Response",
    rsvpAmendLabel: "Amend the reply",
    countdownDaysLabel: "Days",
    countdownHoursLabel: "Hours",
    countdownMinutesLabel: "Minutes",
    countdownSecondsLabel: "Seconds",
    countdownKicker: "№ 09 · Counting the Moments",
    countdownTitle: "until we say",
    countdownPromise: "“I do”",
    closingScript: "with all our love",
    closingMessage: "Thank you, from the bottom of our hearts, for being part of our story. We cannot wait to celebrate with you under the glass roof of the Orangery, in gold evening light that will forever be the beginning of our always.",
    footerTagline: "Two hearts, one garden, forever in bloom."
  },

  palette: [
    { name: "Blush Rose",   color: "#D8A3A1" },
    { name: "Dusty Petal",  color: "#C08587" },
    { name: "Sage Foliage", color: "#B4BBA6" },
    { name: "Candle Gold",  color: "#C2A165" },
    { name: "Wine Evening", color: "#6E4048" }
  ],
  theme: "blush",
  themeColors: {},
  fonts: {
    editorial: "playfair",
    display: "ebGaramond",
    script: "greatVibes",
    hand: "caveat",
    body: "dmSans"
  },

  /* ── Wedding-day moments — SAMPLE words for the order of the day.
     Use one short word per entry; an empty list hides the section. */
  moments: ["Arrival", "The Vows", "Champagne", "The Feast", "Toasts", "First Dance", "Carriages"],

  /* ── RSVP ─────────────────────────────────────────────────────
     endpoint : leave "" for the honest demonstration mode — the
                form validates and shows a preview of the reply and
                states clearly that nothing is sent or stored.
                Cloudflare's publishing service supplies the invitation-
                specific RSVP endpoint to public invitation pages.
     maxGuests: the number allowed by the invitation.
     deadline  : shown above the form.                                  */
  rsvp: {
    endpoint: "",
    maxGuests: 2,
    deadline: "the twelfth of May, 2027"           // SAMPLE
  },

  /* ── Countdown wording (invalid or passed dates) ─────────────── */
  countdown: {
    invalidMessage: "The exact hour is still drying in the ink — see the details below.",
    pastMessage: "The celebration has begun — thank you for being part of our story."
  },

  /* ── Optional ambient music ───────────────────────────────────
     Drop a small looping file at assets/audio/theme.mp3 and set
     src to enable the volume toggle in the navigation. Never
     autoplays; stays silent if the file is missing.                  */
  audio: {
    src: ""             // e.g. "assets/audio/theme.mp3"
  }
};
