/* Line icons, drawn on a 24×24 grid with a 1.5 stroke in currentColor so they
   inherit the accent and sit at the same visual weight as the card hairlines.
   Each one is chosen to encode what the card is about — a pipeline for CRM
   work, a stopwatch for speed-to-lead — rather than decorate it. Keep them
   geometric: no filled shapes, no two-tone, nothing that reads as a sticker. */

const I = (body) =>
  `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

const icons = {
  /* services */
  crm: I('<circle cx="5" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="12" r="2"/><path d="M7 6h5a2 2 0 0 1 2 2v2.2M7 18h5a2 2 0 0 0 2-2v-2.2"/>'),
  funnel: I('<path d="M3 4h18l-6.5 7.6V20L9.5 17v-5.4z"/>'),
  film: I('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18M3 15h18M8 5v14M16 5v14"/>'),

  /* the four leak points */
  mismatch: I('<rect x="3" y="4" width="18" height="15" rx="2"/><path d="M3 8h18"/><path d="M9.5 12.5l5 4M14.5 12.5l-5 4"/>'),
  stopwatch: I('<circle cx="12" cy="13" r="7"/><path d="M12 10v3.2l2 1.4M9.5 3h5M12 3v3"/>'),
  noshow: I('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M10 14.5l4 3.5M14 14.5l-4 3.5"/>'),
  unknown: I('<circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.2 2.9c-.6.2-.8.7-.8 1.3v.4"/><path d="M12 17.2v.01"/>'),

  /* the five process steps */
  audit: I('<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/><path d="M8 10.5h5M10.5 8v5"/>'),
  map: I('<path d="M4 7h7a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h11"/><circle cx="4" cy="7" r="1.6"/><circle cx="20" cy="19" r="1.6"/>'),
  build: I('<path d="M3 20h18"/><rect x="4" y="12" width="5" height="5" rx="1"/><rect x="11" y="8" width="5" height="9" rx="1"/><rect x="18" y="4" width="3" height="13" rx="1"/>'),
  test: I('<path d="M12 3l7.5 3v5.4c0 4.3-3 8-7.5 9.6C7.5 19.4 4.5 15.7 4.5 11.4V6z"/><path d="M9 11.8l2.2 2.2L15.2 10"/>'),
  handover: I('<path d="M3 11.5l4-3 5 3.5 5-3.5 4 3"/><path d="M3 11.5V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6.5"/><path d="M12 4v7M9.6 6.4L12 4l2.4 2.4"/>'),

  /* stats */
  stack: I('<path d="M12 3l9 4.5-9 4.5-9-4.5z"/><path d="M3 12l9 4.5 9-4.5M3 16.5L12 21l9-4.5"/>'),
  contract: I('<path d="M6 3h8l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5M8.5 13h7M8.5 17h4"/>'),
  badge: I('<circle cx="12" cy="9.5" r="5.5"/><path d="M9.6 12.1L8 21l4-2.2L16 21l-1.6-8.9"/>'),
  star: I('<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8z"/>'),

  /* field notes */
  sms: I('<path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1z"/><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01"/>'),
  card: I('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M6.5 14.5h3"/>'),
  gauge: I('<path d="M4 17a8 8 0 1 1 16 0"/><path d="M12 17l4-4.5"/><circle cx="12" cy="17" r="1.2"/>'),
  calendar: I('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M8.5 14h3M8.5 17.5h7"/>'),
  download: I('<path d="M12 3v12"/><path d="M8 11.5l4 4 4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>'),
  send: I('<path d="M21 3L10.5 13.5"/><path d="M21 3l-6.8 18-3.7-7.5L3 9.8z"/>'),
  shield: I('<path d="M12 3l7.5 3v5.4c0 4.3-3 8-7.5 9.6C7.5 19.4 4.5 15.7 4.5 11.4V6z"/><path d="M12 8.5v4M12 15.4v.01"/>'),
  /* contact */
  calendar: I('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M8.5 14.5h3"/>'),
  download: I('<path d="M12 3v11"/><path d="M8.5 11L12 14.5 15.5 11"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>'),
  send: I('<path d="M21 3L10.5 13.5"/><path d="M21 3l-6.8 18-3.7-7.5L3 9.8z"/>'),
  mail: I('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6 8.5-6"/>'),
  phone: I('<path d="M6.5 3.5h3l1.5 4-2 1.4a12 12 0 0 0 6.1 6.1l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z"/>'),
  clock: I('<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5l3 1.8"/>'),
};

module.exports = { icons };
