/* ═══════════════════════════════════════════════════════════════
   LA TERRAZZA · config.js
   ---------------------------------------------------------------
   Main personalisation data for the site and visual editor.
   Longer copy, palette, and theme are editable here. Values
   marked SAMPLE are tasteful placeholders — replace them with
   your own before sending the link to your guests.
   ═══════════════════════════════════════════════════════════════ */

window.HEIRLOOM = {
  templateId: "terrazza",

  /* ── The couple — SAMPLE content, replace with your names ────── */
  couple: {
    partnerOne: "Livia",                     // SAMPLE
    partnerTwo: "Julian",                    // SAMPLE
    initials:  "L · J",                      // SAMPLE — used on seals & monograms
    namesLine: "Livia & Julian"              // SAMPLE — used across the site
  },

  /* ── The wedding date & time ─────────────────────────────────
     iso : ISO 8601 date-time WITH an explicit UTC offset, so the
           countdown and the calendar files are correct on every
           guest's device, wherever they are in the world.
           Format: "YYYY-MM-DDTHH:MM:SS±HH:MM"
           The sample below = 18 September 2027, 5:00 PM, GMT+2 (CEST).
     display / words / numerals : how the date reads in the copy. */
  wedding: {
    iso: "2027-09-18T17:00:00+02:00",                                // EDIT
    endIso: "2027-09-19T01:00:00+02:00",                             // EDIT — end of the celebration
    display: "Saturday, 18 September 2027 · 5:00 in the afternoon",  // EDIT
    zoneLabel: "",                                                   // EDIT — optional note for guests abroad, e.g. "CEST"
    words: "Saturday · The Eighteenth of September · Two Thousand Twenty-Seven", // EDIT
    numerals: "18 · 09 · 2027",                                      // EDIT
    eventTitle: "Livia & Julian — Wedding"                           // EDIT (calendar entry)
  },

  /* ── The venue ──────────────────────────────────────────────── */
  venue: {
    name: "La Terrazza at Villa Limoni",        // SAMPLE
    address: "Villa Limoni, Positano",          // SAMPLE
    mapsQuery: "",                              // optional Maps search override
    /* A full URL here overrides the map link built above, e.g. an
       exact Google Maps place link or an Apple Maps URL.          */
    mapUrl: ""
  },

  /* ── Copy shown throughout the invitation ────────────────────
     The visual editor can change these values without editing HTML. */
  content: {
    pageTitle: "Livia & Julian · 18 September 2027 — A Terrace Above the Sea",
    pageDescription: "Livia and Julian request the pleasure of your company on the lemon terrace at Villa Limoni, Positano, on Saturday the eighteenth of September 2027. Open your invitation.",
    socialTitle: "Livia & Julian — An Invitation · 18.09.2027",
    socialDescription: "Lemons, linen and a terrace above the sea — you are cordially invited.",
    navStory: "Story",
    navDetails: "Details",
    navVenue: "Venue",
    navRsvp: "RSVP",
    menuInvitation: "The Invitation",
    menuStory: "Our Story",
    menuSaveDate: "Save the Date",
    menuDetails: "The Details",
    menuPalette: "The Palette",
    menuWeddingDay: "The Wedding Day",
    menuVenue: "Venue & Location",
    menuRsvp: "Kindly Respond",
    menuCountdown: "The Countdown",
    menuClosing: "A Closing Note",
    openingEyebrow: "A terrace above the sea, from",
    openingHint: "You are cordially invited",
    openButton: "Open the Invitation",
    skipButton: "Skip straight to the invitation",
    envelopeAddress: "friends & family",
    invitationEyebrow: "Together with their families",
    invitationLead: "request the pleasure of your company as they exchange vows on a cliffside terrace above the sea, and dine beneath the lemons until the stars arrive.",
    invitationVenueSuffix: "· Positano",
    storyKicker: "№ 02 · Their Story",
    storyTitle: "Our",
    storyTitleScript: "Story",
    storyParagraphOne: "Every love story needs a meeting point, and ours was a lemon grove above the sea — a borrowed book, a sudden summer storm, and one long conversation while the rain drew shapes on the terrace stones.",
    storyParagraphTwo: "Six years, three cities and one slightly spoiled cat later, we are finally building the terrace we always talked about. Nothing would mean more than to have you standing beside us when we do.",
    storyQuote: "“To love and be loved is to feel the sun from both sides.”",
    storyQuoteLabel: "— a page from our notebook",
    storyNote: "somewhere between limoncello & forever",
    storyNoteCredit: "— a note we keep returning to",
    storyCaptionOne: "the first summer",
    storyCaptionTwo: "always, us",
    storyCaptionFour: "the long way home",
    storyAside: "the beginning of always",
    saveDateTitle: "Save the Date",
    saveDateCrossing: "golden hour, golden years",
    saveDateNote: "The date is set. Add it to your calendar and keep these details close.",
    calendarDownloadLabel: "Add to Calendar",
    calendarGoogleLabel: "Google Calendar",
    detailsKicker: "№ 04 · The Particulars",
    detailsTitleFirst: "Wedding",
    detailsTitleSecond: "Details",
    detailsIntro: "The day, at a glance.",
    ceremonyLabel: "The Ceremony",
    ceremonyTime: "Five in the afternoon",
    ceremonyNote: "Vows on the terrace as the sun lowers over the sea.",
    receptionLabel: "The Reception",
    receptionTime: "Seven in the evening",
    receptionNote: "A long dinner on the lemon terrace and dancing beneath the string lights.",
    kindlyReplyLabel: "Kindly Reply",
    kindlyReplyNote: "Kindly send your response using the reply form further below.",
    particularsEyebrow: "The Particulars",
    particularsDateLabel: "The Date",
    particularsPlaceLabel: "The Place",
    particularsAttireLabel: "The Attire",
    particularsAttire: "Coastal formal",
    particularsAttireNote: "Linen and a touch of gold are welcome — wear what makes you feel wonderful.",
    particularsCarriagesLabel: "The Carriages",
    particularsCarriagesTime: "At midnight",
    particularsCarriagesNote: "The last dance ends as the lights grow low over the water.",
    paletteKicker: "№ 05 · A Note on Colour",
    paletteTitleFirst: "The wedding",
    paletteTitleSecond: "palette",
    paletteIntro: "A study in terracotta and majolica blue, warmed by lemon gold — chosen to feel at home on a terrace above the Tyrrhenian Sea.",
    dressCodeLabel: "Attire · Terrace celebration",
    dressCodeTitle: "Coastal formal",
    dressCodeNote: "Linen, silk and a touch of gold — dress for a warm evening on the water. The palette is only a suggestion; wear what makes you feel wonderful.",
    weddingDayKicker: "№ 06 · The Celebration",
    weddingDayTitleFirst: "The Wedding",
    weddingDayTitleSecond: "Day",
    venueKicker: "№ 07 · The Place",
    venueDescription: "A cliffside villa wrapped in lemon groves above the sea — where long tables, string lights and the last warm light of September drift slowly into the blue evening.",
    venueCeremonyLabel: "Ceremony",
    venueCeremonyText: "on the terrace, at five in the afternoon",
    venueReceptionLabel: "Reception",
    venueReceptionText: "dinner & dancing beneath the string lights",
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
    countdownPromise: "“sì”",
    closingScript: "with all our love",
    closingMessage: "Thank you, from the bottom of our hearts, for being part of our story. We cannot wait to celebrate with you among the lemons and the warm stone, above a sea that never quite lets go of the light.",
    footerTagline: "The sea, a vow, a forever."
  },

  palette: [
    { name: "Alabaster",     color: "#F8F1E3" },
    { name: "Terracotta",    color: "#A85432" },
    { name: "Majolica Blue", color: "#33607A" },
    { name: "Lemon Gold",    color: "#D9A648" },
    { name: "Olive",         color: "#7C7C4E" }
  ],
  theme: "terracotta",
  themeColors: {},
  fonts: {
    editorial: "prata",
    display: "crimsonPro",
    script: "tangerine",
    hand: "homemadeApple",
    body: "karla"
  },

  /* ── Wedding-day moments — SAMPLE words for the wedding programme.
     Use one short word per entry; an empty list hides the section. */
  moments: ["Arrival", "Vows", "Aperitivo", "Feast", "Toasts", "Torta", "Dancing"],

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
    deadline: "the first of July, 2027"            // SAMPLE
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
