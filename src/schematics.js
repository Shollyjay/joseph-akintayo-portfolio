/* Bespoke system diagrams, one per case study.
   Every shape has an explicit fill via class; colours come from theme
   tokens so both themes stay legible. Labels stay inside the viewBox. */

function defs(id) {
  return `<defs>
    <marker id="a-${id}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 0 L8 4 L0 8 z" class="s-head"/>
    </marker>
    <marker id="n-${id}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L8 4 L0 8 z" class="s-head-n"/>
    </marker>
  </defs>`;
}

/* box(x, y, w, h, title, sub, variant) */
function box(x, y, w, h, title, sub, variant) {
  const cls = variant ? `s-box-${variant}` : "s-box";
  const ty = sub ? y + h / 2 - 3 : y + h / 2 + 4;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" class="${cls}"/>
    <text x="${x + 14}" y="${ty}" class="s-t">${title}</text>
    ${sub ? `<text x="${x + 14}" y="${y + h / 2 + 15}" class="s-m">${sub}</text>` : ""}`;
}

function arrow(id, d, accent) {
  return `<path d="${d}" class="${accent ? "s-flow" : "s-line"}" marker-end="url(#${accent ? "a" : "n"}-${id})"/>`;
}

const schematics = {

  /* ---------- 01 · NPS loop ---------- */
  nps: {
    caption: "Response → score → band → action, triggered on submission",
    svg: `<svg viewBox="0 0 880 372" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: a member response is scored on submission, classified into promoter, passive or detractor, and routed to a matching action, with a status field feeding the dashboard.">
  ${defs("nps")}
  ${box(8, 140, 150, 64, "Response in", "form submission", "")}
  ${arrow("nps", "M 162 172 H 202", true)}
  ${box(206, 134, 150, 76, "Score & classify", "Apps Script · on submit", "a")}

  ${arrow("nps", "M 360 160 C 395 160 390 68 420 68", false)}
  ${arrow("nps", "M 360 172 H 420", false)}
  ${arrow("nps", "M 360 184 C 395 184 390 276 420 276", false)}

  ${box(424, 40, 150, 58, "Promoter", "9 – 10", "g")}
  ${box(424, 144, 150, 58, "Passive", "7 – 8", "w")}
  ${box(424, 248, 150, 58, "Detractor", "0 – 6", "r")}

  ${arrow("nps", "M 578 69 H 618", true)}
  ${arrow("nps", "M 578 173 H 618", true)}
  ${arrow("nps", "M 578 277 H 618", true)}

  ${box(622, 40, 250, 58, "Review & referral ask", "Brevo sequence", "")}
  ${box(622, 144, 250, 58, "Targeted follow-up", "Brevo sequence", "")}
  ${box(622, 248, 250, 58, "Named staff alert, same day", "name · score · verbatim", "a")}

  <path d="M 281 214 V 332 H 266" class="s-dash"/>
  <circle cx="281" cy="214" r="3" class="s-head"/>
  <text x="292" y="328" class="s-ma">one status field — read by the alert, the sequence and the dashboard</text>
  ${box(8, 304, 254, 56, "Looker Studio", "net score · response rate · segments", "")}
</svg>`
  },

  /* ---------- 02 · RAG retention engine ---------- */
  rag: {
    caption: "A state machine driven by attendance, not by a calendar",
    svg: `<svg viewBox="0 0 880 384" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: a thirty day onboarding sequence feeds a three state retention engine where attendance moves a member between green, amber and red, each with its own workflow.">
  ${defs("rag")}
  <text x="8" y="18" class="s-ma">30-DAY ONBOARDING</text>
  <rect x="8" y="32" width="864" height="42" rx="8" class="s-box"/>
  <line x1="28" y1="53" x2="852" y2="53" class="s-line"/>
  ${[["Day 0", 28], ["Day 3", 192], ["Day 7", 356], ["Day 14", 520], ["Day 21", 684], ["Day 30", 848]].map(([l, x], i) =>
      `<circle cx="${x}" cy="53" r="4" class="s-head"/><text x="${i === 5 ? x - 34 : x - 10}" y="72" class="s-m">${l}</text>`
    ).join("")}
  <text x="8" y="112" class="s-ma">ATTENDANCE-DRIVEN STATE</text>

  ${box(8, 128, 230, 72, "Green — at or above", "referral & community asks", "g")}
  ${box(325, 128, 230, 72, "Amber — slipping", "coach check-in + class pick", "w")}
  ${box(642, 128, 230, 72, "Red — lapsed", "win-back + human task", "r")}

  ${arrow("rag", "M 242 152 H 317", true)}
  ${arrow("rag", "M 559 152 H 634", true)}
  <path d="M 650 204 C 600 244 300 244 244 196" class="s-flow" marker-end="url(#a-rag)"/>
  <text x="352" y="238" class="s-ma">attendance recovers → back to Green</text>

  <rect x="8" y="268" width="864" height="104" rx="8" class="s-box"/>
  <text x="26" y="294" class="s-t2">Thresholds are configuration, not logic</text>
  <text x="26" y="318" class="s-m">Each band reads a numeric attendance window the studio can tune against its own timetable.</text>
  <text x="26" y="338" class="s-m">Changing a threshold does not mean rebuilding a workflow — the state transition fires the messaging,</text>
  <text x="26" y="358" class="s-m">so nothing is scheduled against a date that may already be wrong.</text>
</svg>`
  },

  /* ---------- 03 · six-stage pipeline ---------- */
  pipeline6: {
    caption: "Six stages — the last two fire workflows on entry",
    svg: `<svg viewBox="0 0 880 332" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: a six stage member experience pipeline where stages five and six, delinquent and churned, are trigger stages that start recovery workflows on entry.">
  ${defs("p6")}
  <text x="8" y="18" class="s-ma">MEMBER EXPERIENCE PIPELINE</text>
  ${[0, 1, 2, 3].map((i) => {
      const x = 8 + i * 148;
      return `<rect x="${x}" y="36" width="134" height="76" rx="8" class="s-box"/>
      <text x="${x + 14}" y="62" class="s-m">STAGE 0${i + 1}</text>
      <text x="${x + 14}" y="84" class="s-t2">Lifecycle</text>
      <text x="${x + 14}" y="101" class="s-m">entry + exit rule</text>
      ${i < 3 ? `<path d="M ${x + 136} 74 H ${x + 146}" class="s-line" marker-end="url(#n-p6)"/>` : ""}`;
    }).join("")}
  <path d="M 586 74 H 596" class="s-line" marker-end="url(#n-p6)"/>

  <rect x="600" y="36" width="134" height="76" rx="8" class="s-box-a"/>
  <text x="614" y="62" class="s-ma">STAGE 05</text>
  <text x="614" y="84" class="s-t2">Delinquent</text>
  <text x="614" y="101" class="s-m">trigger stage</text>
  <path d="M 736 74 H 746" class="s-flow" marker-end="url(#a-p6)"/>

  <rect x="750" y="36" width="122" height="76" rx="8" class="s-box-a"/>
  <text x="764" y="62" class="s-ma">STAGE 06</text>
  <text x="764" y="84" class="s-t2">Churned</text>
  <text x="764" y="101" class="s-m">trigger stage</text>

  <path d="M 667 116 V 160" class="s-flow" marker-end="url(#a-p6)"/>
  <path d="M 811 116 V 160" class="s-flow" marker-end="url(#a-p6)"/>

  <rect x="556" y="164" width="316" height="72" rx="8" class="s-box-a"/>
  <text x="572" y="192" class="s-t">Entry fires the workflow</text>
  <text x="572" y="212" class="s-m">recovery sequence + task on a named owner;</text>
  <text x="572" y="228" class="s-m">Churned runs a longer win-back cadence</text>

  <rect x="8" y="164" width="520" height="72" rx="8" class="s-box"/>
  <text x="24" y="192" class="s-t">Stages 01–04 carry an entry condition and an exit criterion</text>
  <text x="24" y="212" class="s-m">A record cannot sit between two stages with nobody owning it. Vagaro data was</text>
  <text x="24" y="228" class="s-m">mapped to this model before import, not copied field for field afterwards.</text>

  ${box(8, 252, 864, 72, "Why this matters", "In most pipelines the last two stages are where records go to be forgotten — a tidy label on an outcome that already happened. Here, entry is the event.", "")}
</svg>`
  },

  /* ---------- 04 · sending infrastructure ---------- */
  inbox: {
    caption: "Seven domains, ten inboxes each, authenticated and warmed",
    svg: `<svg viewBox="0 0 880 384" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: seven sending domains separate from the brand domain, each with ten authenticated inboxes, all completing a two week warmup ramp before campaign traffic.">
  ${defs("inb")}
  ${box(8, 20, 190, 64, "Brand domain", "kept out of outbound entirely", "")}
  <path d="M 103 88 V 112" class="s-dash"/>
  <text x="113" y="106" class="s-m">never used to send cold</text>

  <text x="300" y="36" class="s-ma">7 SENDING DOMAINS · 70 INBOXES</text>
  ${[0, 1, 2, 3, 4, 5, 6].map((d) => {
      const x = 8 + d * 124;
      return `<rect x="${x}" y="124" width="112" height="96" rx="8" class="s-box"/>
      <text x="${x + 12}" y="146" class="s-t2">domain ${d + 1}</text>
      <text x="${x + 12}" y="163" class="s-m">SPF · DKIM</text>
      <text x="${x + 12}" y="177" class="s-m">DMARC</text>
      ${[0, 1, 2, 3, 4].map((c) => `<circle cx="${x + 16 + c * 20}" cy="196" r="4" class="s-head"/>`).join("")}
      ${[0, 1, 2, 3, 4].map((c) => `<circle cx="${x + 16 + c * 20}" cy="210" r="4" class="s-head"/>`).join("")}`;
    }).join("")}

  <text x="8" y="256" class="s-ma">14-DAY WARMUP RAMP — COMPLETED BEFORE ANY CAMPAIGN SEND</text>
  <rect x="8" y="268" width="864" height="60" rx="8" class="s-box"/>
  ${Array.from({ length: 14 }, (_, i) => {
      const x = 26 + i * 60;
      const h = 8 + i * 2.8;
      return `<rect x="${x}" y="${316 - h}" width="40" height="${h}" rx="2" class="s-fill"/>`;
    }).join("")}
  <path d="M 26 310 L 846 274" class="s-flow"/>
  <text x="8" y="352" class="s-m">Day 1 → Day 14 · volume per inbox ramps from a trickle to campaign rate; handover happens after the ramp, not before.</text>
</svg>`
  },

  /* ---------- 05 · IF/THEN logic tables ---------- */
  logic: {
    caption: "Six journeys, each specified before a workflow was built",
    svg: `<svg viewBox="0 0 880 384" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: a Framer form posts to GoHighLevel where six customer journeys are separated, each specified as an IF THEN table with entry condition, branch logic and exit criteria.">
  ${defs("lg")}
  ${box(8, 16, 170, 60, "Framer form", "field + type mapping", "")}
  ${arrow("lg", "M 182 46 H 218", true)}
  ${box(222, 16, 150, 60, "Webhook", "one source of truth", "")}
  ${arrow("lg", "M 376 46 H 412", true)}
  ${box(416, 16, 200, 60, "GoHighLevel", "journey router", "a")}

  <text x="640" y="34" class="s-m">A contact can enter</text>
  <text x="640" y="50" class="s-m">exactly one journey.</text>
  <text x="640" y="66" class="s-m">Entry rules are disjoint.</text>

  <text x="8" y="110" class="s-ma">IF / THEN TABLE — ONE PER JOURNEY, SIX IN TOTAL</text>
  <rect x="8" y="122" width="864" height="40" rx="8" class="s-fill"/>
  <text x="26" y="147" class="s-m">ROW</text>
  <text x="112" y="147" class="s-m">IF</text>
  <text x="420" y="147" class="s-m">THEN</text>
  ${[
      ["Entry", "enquiry type matches and contact not already live", "assign journey, stamp entry time"],
      ["Branch", "no response within the response window", "escalate channel, re-queue once"],
      ["Branch", "form partially completed", "resume prompt, do not count as a lead"],
      ["Branch", "duplicate submission inside window", "merge to existing, suppress second send"],
      ["Branch", "contact qualifies for a second journey", "hold, flag for human decision"],
      ["Exit", "booked, declined, or window elapsed", "close journey, release contact"],
    ].map(([k, iff, then], i) => {
      const y = 162 + i * 34;
      return `<line x1="8" y1="${y}" x2="872" y2="${y}" class="s-line"/>
      <text x="26" y="${y + 22}" class="${i === 0 || i === 5 ? "s-ma" : "s-m"}">${k}</text>
      <text x="112" y="${y + 22}" class="s-m">${iff}</text>
      <text x="420" y="${y + 22}" class="s-m">${then}</text>`;
    }).join("")}
  <line x1="8" y1="366" x2="872" y2="366" class="s-line"/>
  <line x1="104" y1="162" x2="104" y2="366" class="s-line"/>
  <line x1="412" y1="162" x2="412" y2="366" class="s-line"/>
</svg>`
  },

  /* ---------- 06 · dedupe ---------- */
  dedupe: {
    caption: "Normalise, then match, then decide — before anything is created",
    svg: `<svg viewBox="0 0 880 332" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: an incoming Shopify customer is normalised and matched against existing contacts, then merged, flagged for review, or created, so one customer stays one contact.">
  ${defs("dd")}
  ${box(8, 124, 140, 64, "Shopify order", "customer payload", "")}
  ${arrow("dd", "M 152 156 H 188", true)}
  ${box(192, 118, 150, 76, "Normalise", "case · spacing · phone", "")}
  ${arrow("dd", "M 346 156 H 382", true)}
  ${box(386, 112, 150, 88, "Match rules", "email + phone + name", "a")}

  ${arrow("dd", "M 540 140 C 572 140 568 56 600 56", false)}
  ${arrow("dd", "M 540 156 H 600", false)}
  ${arrow("dd", "M 540 172 C 572 172 568 256 600 256", false)}

  ${box(604, 28, 268, 58, "Exact match → merge", "enrich, never overwrite", "g")}
  ${box(604, 128, 268, 58, "Near match → human review", "flagged, not merged", "w")}
  ${box(604, 228, 268, 58, "No match → create", "single new contact", "")}

  <text x="8" y="236" class="s-ma">CONFLICT RULE</text>
  <text x="8" y="256" class="s-m">Field precedence is decided by rule, not by</text>
  <text x="8" y="272" class="s-m">whichever record was written last. A merge</text>
  <text x="8" y="288" class="s-m">that is too aggressive is worse than a</text>
  <text x="8" y="304" class="s-m">duplicate — it cannot be undone from the</text>
  <text x="8" y="320" class="s-m">audit trail.</text>

  <text x="300" y="236" class="s-ma">SECOND BUILD · DISPATCH</text>
  <text x="300" y="256" class="s-m">Qualified work moves from GoHighLevel into</text>
  <text x="300" y="272" class="s-m">ServiceTitan with its context attached, so the</text>
  <text x="300" y="288" class="s-m">office is not rekeying a job that already exists</text>
  <text x="300" y="304" class="s-m">in another tab.</text>
</svg>`
  },

  /* ---------- 07 · module library ---------- */
  modules: {
    caption: "Designed in Figma, rebuilt as live blocks — not exported as artwork",
    svg: `<svg viewBox="0 0 880 332" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: design decisions settle in Figma, then are rebuilt in Klaviyo as a library of modular blocks with live text, which campaigns are assembled from.">
  ${defs("md")}
  ${box(8, 20, 180, 64, "Figma", "where design is decided", "")}
  ${arrow("md", "M 192 52 H 232", true)}
  ${box(236, 20, 220, 64, "Rebuilt in Klaviyo", "live blocks, not slices", "a")}
  ${arrow("md", "M 460 52 H 500", true)}
  ${box(504, 20, 220, 64, "Campaign assembled", "no design round trip", "")}

  <text x="8" y="124" class="s-ma">MODULE LIBRARY</text>
  ${[["Hero", 8], ["Product row", 182], ["Editorial", 356], ["Testimonial", 530], ["Footer", 704]].map(([l, x]) =>
      `<rect x="${x}" y="138" width="166" height="80" rx="8" class="s-box"/>
     <text x="${x + 14}" y="164" class="s-t2">${l}</text>
     <rect x="${x + 14}" y="176" width="${l === "Footer" ? 80 : 120}" height="6" rx="3" class="s-fill"/>
     <rect x="${x + 14}" y="188" width="${l === "Hero" ? 138 : 96}" height="6" rx="3" class="s-fill"/>
     <rect x="${x + 14}" y="200" width="64" height="6" rx="3" class="s-fill"/>`
    ).join("")}

  <rect x="8" y="244" width="864" height="80" rx="8" class="s-box"/>
  <text x="26" y="270" class="s-t2">Live text, not baked text</text>
  <text x="26" y="292" class="s-m">Headlines and body copy are real text: they render with images blocked, they are readable by assistive technology,</text>
  <text x="26" y="312" class="s-m">and whoever sends the campaign can edit them. Type scale, spacing and colour carry across from Figma as defined tokens.</text>
</svg>`
  },
};

module.exports = { schematics };
