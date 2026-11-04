/* ═══════════════════════════════════════════════════════════════
   EVERMORE · config.js
   ---------------------------------------------------------------
   Main personalisation data for the site and visual editor.
   Longer copy, palette, and theme are editable here. Values
   marked SAMPLE are tasteful placeholders — replace them with
   your own before sending the link to your guests.
   ═══════════════════════════════════════════════════════════════ */

window.HEIRLOOM = {
  templateId: "evermore",

  /* ── The couple — SAMPLE content, replace with your names ────── */
  couple: {
    partnerOne: "Aurelia",                   // SAMPLE
    partnerTwo: "James",                     // SAMPLE
    initials:  "A · J",                      // SAMPLE — used on seals & monograms
    namesLine: "Aurelia & James"             // SAMPLE — used across the site
  },

  /* ── The wedding date & time ─────────────────────────────────
     iso : ISO 8601 date-time WITH an explicit UTC offset, so the
           countdown and the calendar files are correct on every
           guest's device, wherever they are in the world.
           Format: "YYYY-MM-DDTHH:MM:SS±HH:MM"
           The sample below = 12 June 2027, 4:00 PM, GMT+1 (BST).
     display / words / numerals : how the date reads in the copy. */
  wedding: {
    iso: "2027-06-12T16:00:00+01:00",                                  // EDIT
    endIso: "2027-06-13T00:30:00+01:00",                               // EDIT — end of the celebration
    display: "Saturday, 12 June 2027 · Four in the afternoon",        // EDIT
    zoneLabel: "BST",                                                  // EDIT — optional note for guests abroad
    words: "Saturday · The Twelfth of June · Two Thousand Twenty-Seven", // EDIT
    numerals: "12 · 06 · 2027",                                       // EDIT
    eventTitle: "Aurelia & James — Wedding"                           // EDIT (calendar entry)
  },

  /* ── The venue ──────────────────────────────────────────────── */
  venue: {
    name: "The Rose Garden at Ashcombe Manor",   // SAMPLE
    address: "Ashcombe Manor, the Cotswolds",    // SAMPLE
    mapsQuery: "",                               // optional Maps search override
    /* A full URL here overrides the map link built above, e.g. an
       exact Google Maps place link or an Apple Maps URL.          */
    mapUrl: ""
  },

  /* ── Copy shown throughout the invitation ────────────────────
     The visual editor can change these values without editing HTML. */
  content: {
    pageTitle: "Aurelia & James · 12 June 2027 — The Rose Garden at Ashcombe Manor",
    pageDescription: "Aurelia and James request the pleasure of your company in the rose garden at Ashcombe Manor on Saturday the twelfth of June 2027. Open your invitation.",
    socialTitle: "Aurelia & James — An Invitation · 12.06.2027",
    socialDescription: "Roses, ivory and champagne gold — you are cordially invited.",
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
    openingEyebrow: "The wedding of",
    openingHint: "You are cordially invited",
    openButton: "Open the Invitation",
    skipButton: "Skip straight to the invitation",
    envelopeAddress: "friends & family",
    invitationEyebrow: "Together with their families",
    invitationLead: "request the pleasure of your company as they exchange vows in the rose garden, and dine beneath the open sky as the evening turns to gold.",
    invitationVenueSuffix: "· the Cotswolds",
    storyKicker: "№ 02 · Their Story",
    storyTitle: "Our",
    storyTitleScript: "Story",
    storyParagraphOne: "We met on a June morning, beneath roses that had climbed further than anyone intended — a borrowed umbrella, a sudden shower, and one long conversation neither of us wanted to end.",
    storyParagraphTwo: "Seven years, two cities and one rather opinionated cat later, we are finally planting the garden we always talked about. Nothing would mean more than to have you standing beside us when we do.",
    storyQuote: "“Somewhere between the first hello and every promise since, we found our always.”",
    storyQuoteLabel: "— a page from our notebook",
    storyNote: "written beneath the roses, one june",
    storyNoteCredit: "— a note we keep returning to",
    storyCaptionOne: "the first june",
    storyCaptionTwo: "always, us",
    storyCaptionFour: "the long way home",
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
    ceremonyNote: "Vows in the rose garden as the light turns golden.",
    receptionLabel: "The Reception",
    receptionTime: "Six in the evening",
    receptionNote: "A long dinner beneath the linen marquee and dancing until the stars arrive.",
    kindlyReplyLabel: "Kindly Reply",
    kindlyReplyNote: "Kindly send your response using the reply card further below.",
    particularsEyebrow: "The Particulars",
    particularsDateLabel: "The Date",
    particularsPlaceLabel: "The Place",
    particularsAttireLabel: "The Attire",
    particularsAttire: "Garden formal",
    particularsAttireNote: "Soft colours and a touch of gold are welcome — wear what makes you feel wonderful.",
    particularsCarriagesLabel: "The Carriages",
    particularsCarriagesTime: "At midnight",
    particularsCarriagesNote: "The last dance ends as the lanterns grow low in the garden.",
    paletteKicker: "№ 05 · A Note on Colour",
    paletteTitleFirst: "The wedding",
    paletteTitleSecond: "palette",
    paletteIntro: "A study in blush rose, porcelain ivory and champagne gold — chosen to feel like an English June.",
    dressCodeLabel: "Attire · Garden celebration",
    dressCodeTitle: "Garden formal",
    dressCodeNote: "Soft colours, silk and a touch of gold. The palette is only a suggestion — wear what makes you feel wonderful.",
    weddingDayKicker: "№ 06 · The Celebration",
    weddingDayTitleFirst: "The Wedding",
    weddingDayTitleSecond: "Day",
    venueKicker: "№ 07 · The Place",
    venueDescription: "A Georgian manor wrapped in climbing roses and old walled gardens — where the vows are said beneath the orangery arches and dinner is served as the light fades to gold.",
    venueCeremonyLabel: "Ceremony",
    venueCeremonyText: "in the rose garden, at four in the afternoon",
    venueReceptionLabel: "Reception",
    venueReceptionText: "dinner & dancing beneath the linen marquee",
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
    closingMessage: "Thank you, from the bottom of our hearts, for being part of our story. We cannot wait to celebrate with you among the roses and the golden evening light, in a garden that will forever be the beginning of our always.",
    footerTagline: "A vow, a rose, a forever."
  },

  palette: [
    { name: "Porcelain",     color: "#FAF6EF" },
    { name: "Blush",         color: "#EFD6D2" },
    { name: "Dusty Rose",    color: "#C08587" },
    { name: "Champagne",     color: "#C2A165" },
    { name: "Whisper Sage",  color: "#B4BBA6" }
  ],
  theme: "blush",
  themeColors: {},
  fonts: {
    editorial: "cormorant",
    display: "ebGaramond",
    script: "parisienne",
    hand: "laBelle",
    body: "jost"
  },

  /* ── Wedding-day moments — SAMPLE words for the wedding programme.
     Use one short word per entry; an empty list hides the section. */
  moments: ["Arrival", "Vows", "Aperitifs", "The Feast", "Toasts", "First Dance", "Carriages"],

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
    deadline: "the twelfth of April, 2027"         // SAMPLE
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
