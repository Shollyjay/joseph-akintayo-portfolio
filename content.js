/* ============================================================
   Joseph Akintayo — portfolio content
   Everything the site says lives here. Edit this file, run
   `node build.js`, and the whole site regenerates.
   ============================================================ */

const site = {
  name: "Joseph Akintayo",
  short: "Joseph",
  role: "GoHighLevel Expert — CRM, Funnels, Automation & AI Video Ads",
  location: "Lagos, Nigeria",
  tz: "WAT · UTC+1 — works US & UK hours",
  email: "jmarketinx@gmail.com",
  phone: "+234 806 596 6475",
  upwork: "https://www.upwork.com/freelancers/~01e9e1889e1da10893",
  video: "https://youtu.be/71R8OdwwxrU",
  year: 2026,
};

/* ---------- hero ---------- */

const hero = {
  eyebrow: "GoHighLevel systems · AI video creative",
  headline: ["Lead systems don’t leak", "at the ad. They leak", "between the click", "and the call."],
  lede:
    "I build the GoHighLevel pipeline that closes that gap — the landing page, the CRM, the follow-up that fires in minutes, and the AI video creative feeding the top of it. One person builds all three, so nothing is lost between them.",
  ctas: [
    { label: "See the work", href: "#work", kind: "primary" },
    { label: "Free system audit", href: "#contact", kind: "ghost" },
  ],
  // the animated pipeline in the hero
  stages: ["Ad seen", "Page opened", "Lead captured", "Replied to", "Call booked", "Showed up"],
};

/* ---------- proof ---------- */

const proof = [
  { value: "40", suffix: "+", label: "GoHighLevel systems built", note: "solo, no subcontractors" },
  { value: "57", suffix: "", label: "Upwork contracts", note: "48 fixed-price, 9 hourly" },
  { value: "6", suffix: "", label: "Certifications", note: "GoHighLevel & HubSpot" },
  { value: "35", suffix: "", label: "Client reviews", note: "Top Rated on Upwork" },
];

/* ---------- the leak points ---------- */

const leaks = {
  title: "Four places the money is already leaking",
  lede:
    "Every one of these is budget you have already spent, draining at a point nobody is watching. They are also the four things I get asked to fix most often.",
  items: [
    {
      stage: "Between click and page",
      title: "The page doesn’t match what the ad promised",
      body:
        "Traffic arrives warm and lands on a page written for a different offer. The bounce looks like a creative problem, so the ad gets blamed and replaced, and the page stays broken.",
    },
    {
      stage: "Between form and first contact",
      title: "The lead sits unanswered for six hours",
      body:
        "Speed to lead is the single cheapest thing to fix and the most commonly broken. A workflow that fires within minutes, day or night, is a one-day build that changes the economics of the whole account.",
    },
    {
      stage: "Between booking and showing",
      title: "The call gets booked and nobody shows",
      body:
        "No-show rate is a reminder problem far more often than it is a lead quality problem. Reminder sequencing, confirmation logic and a reschedule path recover most of it.",
    },
    {
      stage: "Between tools",
      title: "Nobody knows how the account actually works",
      body:
        "An account set up by someone who has moved on, with workflows nobody will touch in case something breaks. Every build I hand over comes with training and documentation so you own it.",
    },
  ],
};

/* ---------- services ---------- */

const services = [
  {
    id: "ghl",
    num: "01",
    title: "GoHighLevel CRM & automation",
    lede:
      "The engine room. Pipelines that match how you actually sell, and follow-up that runs whether or not anyone is at a desk.",
    points: [
      "Full CRM buildout and pipeline design around your real sales process",
      "Lead response automation that fires within minutes, day or night",
      "Reminder and confirmation sequences that cut no-shows",
      "Email & SMS with deliverability configured properly (SPF, DKIM, DMARC)",
      "A2P 10DLC registration and compliance, done right the first time",
      "CRM migration into GHL, or white-label back to standard GHL",
      "Zapier, Make, n8n, Stripe, Twilio, calendar and API integrations",
      "AI voice agents answering missed calls and booking 24/7 (Vapi, Retell, GHL Voice AI)",
    ],
  },
  {
    id: "funnels",
    num: "02",
    title: "Funnels & landing pages",
    lede:
      "The surface the traffic actually touches, built to match the creative that sent it there rather than fight it.",
    points: [
      "Landing pages built against the specific offer and creative driving them",
      "Discovery call funnels that qualify before the lead reaches your calendar",
      "Membership, course and checkout funnels",
      "Full website builds inside GoHighLevel",
      "SaaS Mode and white-label agency configuration",
    ],
  },
  {
    id: "video",
    num: "03",
    title: "AI video ad creative",
    lede:
      "The top of the funnel. Multiple hooks and variations per concept, so there is something real to test instead of one finished video.",
    points: [
      "AI UGC and avatar-style ads with HeyGen and Synthesia",
      "Generative footage with Runway, Veo, Sora and Kling for A/B testing",
      "Voiceover and multilingual dubbing with ElevenLabs",
      "Editing and captions, delivered as a hook set rather than a single cut",
      "Creative mapped to the funnel stage it is meant to feed",
    ],
  },
];

/* ---------- process ---------- */

const process = [
  {
    n: "01",
    title: "Audit",
    body:
      "I go through what is running now — the GHL account, the pages, the ads — and map where performance drops off. You get the audit and a roadmap of what to fix first, in order, before any money changes hands.",
  },
  {
    n: "02",
    title: "Map the journey",
    body:
      "First scroll, to click, to opt-in, to booked call, to client. Written out as stages with entry conditions and exit criteria, so we are both looking at the same system instead of a list of tasks.",
  },
  {
    n: "03",
    title: "Build",
    body:
      "Automation first, then the page, then the creative. That order is deliberate: creative pointed at a broken follow-up just spends money faster.",
  },
  {
    n: "04",
    title: "Test end to end",
    body:
      "I run the full journey myself as if I were the lead. Fill the form, wait for the SMS, take the reminder, sit through the reschedule path. Logic tables are checked branch by branch.",
  },
  {
    n: "05",
    title: "Handover",
    body:
      "A walkthrough of everything built, documentation of the workflows, and I stay available afterwards. You own what gets built — there is no snapshot I can take back.",
  },
];

/* ---------- stack ---------- */

const stack = [
  "GoHighLevel", "HeyGen", "Synthesia", "Vapi", "Retell", "Zapier", "Make.com", "n8n",
  "Klaviyo", "Mailchimp", "ActiveCampaign", "Brevo", "MailerLite", "Omnisend", "Smartlead",
  "Airtable", "Notion", "Google Apps Script", "Looker Studio", "ServiceTitan", "Vagaro",
  "Shopify", "Framer", "Figma", "Twilio", "Stripe", "Puppeteer", "ElevenLabs",
];

/* ---------- certifications ---------- */

const certs = [
  "GoHighLevel CRM & Automation",
  "GoHighLevel Sales Funnel & Landing Page",
  "GoHighLevel Email Deliverability",
  "GoHighLevel A2P 10DLC Compliance",
  "GoHighLevel SaaS Mode & White Label",
  "HubSpot Design Certification",
];

/* ---------- about ---------- */

const about = {
  title: "One person builds the automation, the page and the creative",
  paras: [
    "I am Joseph Akintayo, a GoHighLevel and marketing automation specialist working out of Lagos. Forty-plus GHL systems delivered across fifty-seven Upwork contracts, every one custom — I don’t resell a recycled snapshot.",
    "Most of my work sits in the unglamorous middle of a funnel: the workflow that fires at 2am, the dedupe rule that stops one customer becoming three contacts, the DMARC record that decides whether a campaign lands in an inbox or a spam folder. It is the part clients rarely see and always feel.",
    "I work with coaches and consultants, agencies, real estate teams, clinics and med spas, insurance, home services, e-commerce brands and education businesses — anyone running paid traffic into a lead-to-close pipeline.",
  ],
  facts: [
    ["Based in", "Lagos, Nigeria · WAT (UTC+1)"],
    ["Hours", "US & UK overlap, same-day replies"],
    ["Languages", "English (native) · Spanish, French, Portuguese (basic)"],
    ["Industries", "Coaching · agencies · real estate · clinics · insurance · home services · e-commerce · education"],
  ],
  result: {
    figure: "40%",
    body:
      "A fitness coaching client was losing bookings to no-shows and slow follow-up. I rebuilt the booking flow in GoHighLevel, added automated reminders, and built a lead-response workflow triggering within minutes of opt-in. No-shows dropped 40% in the first month.",
  },
};

/* ---------- accent palettes ----------
   Switch the whole site's accent by changing `activePalette` below and
   running `node build.js`. Each palette needs a dark and a light variant:
   `accent` is the fill, `text` is the accent used as ink or a small mark
   (darker in light mode so it stays readable), `ink` is what sits ON the
   fill, `dim` is the tint behind live states. */

const palettes = {
  red: {
    dark:  { accent: "#DD4444", accent2: "#CC3366", text: "#DD4444", ink: "#FFFFFF", dim: "rgba(221,68,68,.12)" },
    light: { accent: "#C32B2B", accent2: "#A81F52", text: "#C32B2B", ink: "#FFFFFF", dim: "rgba(195,43,43,.09)" },
  },
  blue: {
    // fill is deep enough that WHITE ink passes AA on it (5.8:1); `text` stays
    // bright because it sits on the dark ground, not on the fill.
    dark:  { accent: "#1F5FD0", accent2: "#1A47A8", text: "#72A6FF", ink: "#FFFFFF", dim: "rgba(77,141,247,.15)" },
    light: { accent: "#1B5FD9", accent2: "#0F3F9C", text: "#14529E", ink: "#FFFFFF", dim: "rgba(27,95,217,.10)" },
  },
  amber: {
    dark:  { accent: "#F5C542", accent2: "#E09B1F", text: "#F7CE5B", ink: "#1A1300", dim: "rgba(245,197,66,.14)" },
    light: { accent: "#E0A413", accent2: "#B87700", text: "#8A5B00", ink: "#1A1300", dim: "rgba(224,164,19,.12)" },
  },
};

const activePalette = "blue";

/* ---------- funnel gallery (landing page) ----------
   Real GoHighLevel funnels and landing pages. These are build examples from
   the library, not tied to the named case studies below. */

const gallery = {
  eyebrow: "Built in GoHighLevel",
  title: "Funnel and landing page builds",
  lede:
    "Pages built page by page in GoHighLevel — layout, section structure and the flow from opt-in to thank-you. These are build examples carrying placeholder branding and demo copy, not live client funnels; client accounts stay private. The structure is the work.",
  items: [
    { file: "funnel-coach-connect.jpg",   label: "Coaching — 3-page discovery funnel" },
    { file: "funnel-gym-fitness.jpg",     label: "Gym & fitness — 2-page lead capture" },
    { file: "funnel-smart-finance.jpg",   label: "Finance — 2-page opt-in flow" },
    { file: "funnel-saas.jpg",            label: "SaaS — 2-page product funnel" },
    { file: "funnel-masterclass.jpg",     label: "Masterclass — 9-page launch funnel" },
    { file: "funnel-weight-loss.jpg",     label: "Weight loss — 4-page offer funnel" },
    { file: "funnel-seo-agency.jpg",      label: "SEO agency — 6-page sales funnel" },
    { file: "funnel-construction.jpg",    label: "Construction — 2-page site build" },
  ],
};

/* ============================================================
   FIELD NOTES
   Method pieces, not case studies. Each one explains a technical
   area and is illustrated by a real screenshot, but names no
   client and claims no outcome, because those facts are not
   available for this material. Keep it that way.
   ============================================================ */

const notesIntro = {
  eyebrow: "Field notes",
  title: "Two things that quietly decide whether a system works",
  lede:
    "Not client stories — method. These are the parts of a build that are invisible when done right and expensive when skipped, written up with a screenshot from a real account.",
};

const notes = [
  {
    slug: "a2p-10dlc-registration",
    index: "N1",
    kind: "Field note",
    title: "A2P 10DLC: the registration that decides whether your SMS arrives at all",
    summary:
      "US carriers do not deliver application-to-person SMS from unregistered brands. Registration is paperwork with a technical failure mode, and it is the single most common reason a GoHighLevel SMS build goes quiet after launch.",
    tags: ["A2P 10DLC", "SMS compliance", "Deliverability"],
    shots: [
      { file: "a2p-numbers.jpg", alt: "GoHighLevel Manage Numbers showing one A2P verified local number and a toll-free number in verification",
        caption: "Two numbers on one account: a local number through A2P and carrier-verified, and a toll-free number still in verification. The phone numbers are blurred; the status badges are the point." },
    ],
    sections: [
      {
        h: "What it actually is",
        p: [
          "A2P 10DLC is the registration regime US carriers apply to application-to-person messaging sent over standard 10-digit long codes. You register the brand, then register each campaign describing what you will send and how people opted in. Carriers assign a trust score, and that score sets your throughput and your filtering.",
          "The part people miss: this is not a GoHighLevel setting. It is a carrier process that GoHighLevel submits on your behalf. Approval is not instant, rejection is common, and until it clears your messages are either throttled hard or silently filtered.",
        ],
      },
      {
        h: "Why it fails",
        p: [
          "Almost always for reasons that look like clerical detail and are not.",
        ],
        list: [
          ["Brand details that do not match the EIN record", "The legal name, address and EIN have to match the IRS record exactly. An abbreviated street or a trading name instead of the registered one is enough to bounce the submission."],
          ["A campaign description that does not match the messages", "If the registered use case says appointment reminders and the account sends promotions, filtering follows. The description is a commitment, not a formality."],
          ["Opt-in evidence that does not exist", "Carriers want to see how consent was collected. A form with no visible consent language, or a list bought from elsewhere, fails this and should."],
          ["No opt-out handling", "STOP must work and must be honoured automatically. This is both a compliance requirement and a trust-score input."],
        ],
      },
      {
        h: "Local versus toll-free",
        p: [
          "They are different regimes and people conflate them. A local 10-digit number goes through A2P 10DLC registration. A toll-free number goes through a separate toll-free verification with its own form and its own queue.",
          "Toll-free verification tends to be slower but gives higher throughput once cleared, which makes it the better choice for volume. Running both — a local number for conversational follow-up and a toll-free for broadcast — is a common and sensible split, and it is what the screenshot shows mid-flight.",
        ],
      },
      {
        h: "Why it belongs at the start of a build",
        p: [
          "Registration takes days to weeks, and nothing you build on top of SMS can be properly tested until it clears. Treating it as a launch-week task is how a finished automation sits idle waiting for a carrier.",
          "It is also the cheapest insurance in the stack. An unregistered sender does not get an error. It gets silence, and silence is the hardest failure to diagnose after the fact.",
        ],
      },
    ],
  },

  {
    slug: "payment-gateway-integration",
    index: "N2",
    kind: "Field note",
    title: "Connecting a payment gateway is the easy half",
    summary:
      "GoHighLevel will take NMI, Authorize.net or Stripe. Choosing between them, and handling what happens after a payment succeeds or fails, is where the actual work sits.",
    tags: ["Stripe", "Payments", "Integration"],
    shots: [
      { file: "payment-gateways.jpg", alt: "GoHighLevel payments integrations screen offering NMI, Authorize.net and Stripe",
        caption: "The integrations screen: NMI and Authorize.net take raw API credentials, Stripe uses a connect flow. A demo account — the key fields are empty." },
    ],
    sections: [
      {
        h: "The choice in front of you",
        p: [
          "Three options, and they are not interchangeable. Stripe connects through an OAuth flow, so no keys are copied by hand and the connection can be revoked from either side. NMI and Authorize.net take API credentials pasted into fields — a gateway ID and security key, or a login ID and transaction key.",
          "That difference matters beyond convenience. Pasted credentials live in the account until someone rotates them, and whoever set them up had them in their clipboard. If an agency sets up a client's gateway this way, the client should rotate the keys at handover.",
        ],
      },
      {
        h: "Sandbox is not optional",
        p: [
          "Both credential-based gateways expose separate sandbox fields, and they exist so you can drive a full transaction without moving money.",
          "Test the failure path, not just the success. A declined card, an expired card and a duplicate submission each take a different route through whatever automation sits behind the checkout, and the decline path is the one that is almost never exercised before launch.",
        ],
      },
      {
        h: "What happens after the payment",
        p: [
          "This is the part that is actually the build. A gateway returning success is the start of the work, not the end of it.",
        ],
        list: [
          ["The success path", "Tag the contact, move the pipeline stage, grant access to whatever was bought, start onboarding, and record the amount against the opportunity so reporting means something."],
          ["The failure path", "A decline should not dead-end. It needs a retry window, a message that does not read like an accusation, and an exit after a set number of attempts so the contact is not stuck in limbo."],
          ["Refunds and chargebacks", "Both need to reverse whatever access the success path granted. A system that onboards on payment but never offboards on refund quietly leaks product."],
          ["Subscriptions", "Recurring billing adds renewal, dunning and cancellation, each of which is its own branch. Failed renewals are where most of the revenue leaks, and they are usually the least built part."],
        ],
      },
      {
        h: "One thing worth checking early",
        p: [
          "Whether the gateway you want is supported for the currency and country the business actually operates in. It is a two-minute check that occasionally changes the whole plan, and it is much cheaper before the funnel is built than after.",
        ],
      },
    ],
  },
];

/* ============================================================
   CASE STUDIES
   `schematic` is the key of the diagram drawn on the page.
   ============================================================ */

const work = [
  {
    slug: "vistas-nps-loop",
    index: "01",
    client: "Vistas Golf & Country Club",
    industry: "Private members’ club",
    title: "Turning a survey archive into a same-day service recovery loop",
    summary:
      "A multi-stage NPS automation that scores every member response, routes detractors to a named human within minutes, and gives leadership a live view of satisfaction by segment.",
    tags: ["Google Apps Script", "Looker Studio", "Brevo"],
    schematic: "nps",
    shots: [],
    meta: [
      ["Client", "Vistas Golf & Country Club"],
      ["Sector", "Hospitality / membership"],
      ["Role", "Automation architect & build"],
      ["Platforms", "Google Sheets · Apps Script · Looker Studio · Brevo"],
    ],
    sections: [
      {
        h: "The situation",
        p: [
          "The club was already collecting member satisfaction scores. The problem was what happened next, which was nothing. Responses landed in a spreadsheet and sat there until someone had time to read them, which in practice meant a detractor could tell the club exactly what was wrong and still wait weeks for anyone to notice.",
          "By the time a low score was spotted, the member had usually had another bad month. The survey was measuring churn rather than preventing it.",
        ],
      },
      {
        h: "What I built",
        p: [
          "A three-part system that turns a submitted response into an action the same day, with no one needing to open the sheet.",
        ],
        list: [
          ["Scoring and alert logic in Google Apps Script", "Every new response is scored on submission and classified as promoter, passive or detractor. Detractors raise an alert immediately, carrying the member’s name, their score and their verbatim comment, so whoever picks it up already has the context to make the call."],
          ["A Looker Studio dashboard with calculated fields", "Net score, response rate and segment breakdowns are derived in the dashboard rather than maintained by hand in the sheet. Leadership sees movement over time without anyone building a report."],
          ["Segmented follow-up in Brevo", "Each band gets its own sequence. Detractors get service recovery and a human touchpoint, passives get a targeted follow-up, promoters get an advocacy and review ask at the moment they are most likely to say yes."],
        ],
      },
      {
        h: "How the logic runs",
        p: [
          "The trigger is the form submission itself, not a scheduled sweep. That distinction is the whole point of the build: a nightly batch would reintroduce exactly the delay the club was trying to remove.",
          "Branching happens once, at scoring time, and writes a status back to the row. Everything downstream — the alert, the Brevo sequence, the dashboard segment — reads that single status field, so there is one place to change the thresholds if the club ever wants to move them.",
        ],
      },
      {
        h: "Where it landed",
        p: [
          "The club moved from a passive archive of scores to a loop that closes. Every detractor response now raises a named alert on the day it arrives, each satisfaction band has a follow-up written for it, and the dashboard replaced the manual reporting the data used to require.",
        ],
      },
    ],
  },

  {
    slug: "sagitta-retention-engine",
    index: "02",
    client: "Sagitta Fitness and Wellness",
    industry: "CrossFit & Pilates studio · Australia",
    title: "An attendance-driven retention engine with Green, Amber and Red states",
    summary:
      "A full GoHighLevel system for an Australian studio: a 30-day onboarding sequence, a retention engine that reads attendance and moves members between three states, and auto-reply handling for inbound messages.",
    tags: ["GoHighLevel", "Workflow automation", "Retention"],
    schematic: "rag",
    shots: [
      { file: "ghl-workflow-list.jpg", alt: "A GoHighLevel automation workflow list",
        caption: "A GoHighLevel workflow list from one of my builds — separate workflows per trigger rather than one long sequence. Account name redacted." },
      { file: "ai-chatbot.jpg", alt: "A GoHighLevel workflow builder canvas",
        caption: "Inside the workflow builder: a contact-created trigger running out to SMS, email, a conversation-status update, a drip step and a webhook." },
    ],
    meta: [
      ["Client", "Sagitta Fitness and Wellness"],
      ["Sector", "Fitness — CrossFit & Pilates"],
      ["Region", "Australia"],
      ["Role", "Full GHL system design & build"],
    ],
    sections: [
      {
        h: "The situation",
        p: [
          "Studio churn almost never announces itself. A member does not cancel out of nowhere; they come three times a week, then twice, then once, then they stop, and the cancellation arrives weeks after the behaviour that predicted it. Attendance data showed all of this and nothing in the business was reading it.",
          "The first thirty days were the other half of the problem. A new member who establishes a habit in month one tends to stay; one who does not tends to leave quietly.",
        ],
      },
      {
        h: "What I built",
        p: [
          "Three connected systems inside one GoHighLevel account.",
        ],
        list: [
          ["A 30-day onboarding sequence", "Structured around the first month rather than the first week, with milestones placed where new members usually drop off instead of spread evenly across the calendar."],
          ["An attendance-based retention engine", "Attendance sets a member state — Green, Amber or Red — and each state has its own workflow. The thresholds are configurable rather than hard-coded into the workflow logic, so the studio can tune them against their own class timetable."],
          ["Auto-reply and response management", "Inbound messages get an immediate acknowledgement and are routed by intent, so nothing sits unanswered over a weekend and staff are not triaging a shared inbox by hand."],
        ],
      },
      {
        h: "How the three states work",
        p: [
          "The engine is a state machine, not a campaign. A member is always in exactly one of three states, movement between them is driven by attendance, and each transition is what fires the messaging — not a date on a calendar.",
        ],
        list: [
          ["Green — attending at or above threshold", "The member is healthy. Messaging here is community and referral, because this is the only point in the lifecycle when asking for something is welcome."],
          ["Amber — attendance slipping", "The early warning band, and the one that pays for the build. The member gets a check-in written to sound like a coach rather than a system, plus a specific class suggestion rather than a general nudge."],
          ["Red — lapsed past the window", "A win-back sequence runs, and a task lands on a human’s list. Automation opens the door here; it does not try to close the member on its own."],
        ],
      },
      {
        h: "Where it landed",
        p: [
          "The studio went from reacting to cancellations to acting on attendance. Slipping members are now identified while they are still members, every new sign-up walks through a structured first month, and inbound messages get an answer whether or not the studio is open.",
        ],
      },
    ],
  },

  {
    slug: "aos-vagaro-migration",
    index: "03",
    client: "AOS Aesthetics",
    industry: "Aesthetics clinic",
    title: "A Vagaro-to-GoHighLevel migration with two stages that fire, not label",
    summary:
      "A six-stage Member Experience Pipeline built during a platform migration, where Delinquent and Churned are trigger stages that start recovery workflows rather than labels someone reads later.",
    tags: ["GoHighLevel", "Vagaro migration", "Pipeline design"],
    schematic: "pipeline6",
    shots: [
      { file: "pipeline-stages.jpg", alt: "A GoHighLevel opportunities pipeline with stage columns",
        caption: "A GoHighLevel opportunities board with stages as columns — Raw Leads, New Price, Spoke/Not Booked, Cold. Lead names and the account are blurred." },
      { file: "pipeline-snapshot.jpg", alt: "A GoHighLevel snapshot configuration screen",
        caption: "The snapshots screen, used to carry a pipeline structure between accounts. Snapshot and sub-account names are blurred." },
    ],
    meta: [
      ["Client", "AOS Aesthetics"],
      ["Sector", "Aesthetics & med spa"],
      ["Role", "Migration & pipeline architecture"],
      ["Platforms", "Vagaro → GoHighLevel"],
    ],
    sections: [
      {
        h: "The situation",
        p: [
          "Member history lived in Vagaro, which handled bookings well and told the clinic nothing about where a member sat in their lifecycle. A lapsed member and a brand-new one looked much the same in the day-to-day view, and recovery depended on somebody remembering.",
          "A migration is the one moment when a business can fix its data model rather than carry it across unchanged, so the pipeline was designed before anything was moved.",
        ],
      },
      {
        h: "What I built",
        p: [
          "A six-stage Member Experience Pipeline in GoHighLevel, with Vagaro records mapped into contacts and custom fields so lifecycle position survived the move instead of being rebuilt by hand afterwards.",
          "The design decision worth naming is at the end of the pipeline. Delinquent and Churned are built as trigger stages: a member entering either one starts a workflow immediately. In most pipelines those two stages are where records go to be forgotten — a tidy label on an outcome that has already happened. Here, entry is the event.",
        ],
        list: [
          ["Stages 01–04 — the member experience", "The lifecycle from first contact through to established member. Each stage has an entry condition and an exit criterion, so a record cannot sit between two stages with nobody owning it."],
          ["Stage 05 — Delinquent (trigger)", "Entry fires a recovery sequence and raises a task. This is the stage where a payment or attendance problem is still solvable, so the automation is designed to act, not to record."],
          ["Stage 06 — Churned (trigger)", "Entry starts a win-back track on a longer cadence and removes the member from active-member messaging, so the clinic stops sending community content to people who have left."],
        ],
      },
      {
        h: "Why migrations usually go wrong here",
        p: [
          "The common failure is a one-to-one field copy. Everything arrives, nothing means anything, and the new system is the old system with a different interface and a migration invoice attached.",
          "Mapping to a pipeline first forces the question of what each record is for. Fields that had no job did not come across; fields the pipeline needed and Vagaro did not hold were created before import rather than backfilled afterwards.",
        ],
      },
      {
        h: "Where it landed",
        p: [
          "The clinic came out of the migration with lifecycle position visible at a glance and two automatic recovery paths running at the end of the pipeline. Delinquent and Churned stopped being a report someone reads at month end and became the moment a sequence starts.",
        ],
      },
    ],
  },

  {
    slug: "cold-outreach-infrastructure",
    index: "04",
    client: "Cold outreach infrastructure",
    industry: "Agency / outbound",
    title: "Seven domains, seventy inboxes, and two weeks of warmup before a single send",
    summary:
      "A full sending infrastructure buildout: seven domains authenticated with DKIM, DMARC and SPF, seventy inboxes provisioned, and a two-week Smartlead warmup ramp completed before any campaign traffic was allowed through.",
    tags: ["Deliverability", "Smartlead", "DKIM / DMARC / SPF"],
    schematic: "inbox",
    thumb: "spf-glockapps.jpg",
    shots: [
      { file: "dns-records.jpg", alt: "DNS management console showing SPF, DKIM and DMARC records",
        caption: "DNS for a sending domain: ALIAS, CNAME, MX and the TXT records carrying SPF, DKIM and DMARC. Host names and values are blurred." },
      { file: "spf-mxtoolbox.jpg", alt: "MXToolbox SPF check passing",
        caption: "An SPF record audited record by record — every mechanism resolving and passing. The audited domain is blurred." },
      { file: "spf-glockapps.jpg", alt: "GlockApps deliverability test results",
        caption: "GlockApps seed-list testing across providers, run before campaign traffic is allowed through." },
      { file: "inbox-rate.jpg", alt: "An inbox placement test result",
        caption: "A warmup dashboard mid-ramp: 610 sent, 393 received, mailbox temperature climbing, inbox-versus-spam tracked daily." },
    ],
    meta: [
      ["Scope", "7 sending domains · 70 inboxes"],
      ["Sector", "Outbound / agency"],
      ["Role", "Infrastructure buildout"],
      ["Platforms", "Smartlead · DNS · email auth"],
    ],
    sections: [
      {
        h: "The situation",
        p: [
          "Outbound at volume fails for a reason that has nothing to do with the copy. Send too much from one domain, or from a domain with no sending history, and the mail goes to spam regardless of what it says. The campaign looks like a messaging problem and gets rewritten, repeatedly, while the actual cause sits in DNS.",
          "Worse, a burned primary domain takes the company’s real mail with it. Separating sending infrastructure from the brand domain is not an optimisation; it is the thing that stops one aggressive campaign taking down internal email.",
        ],
      },
      {
        h: "What I built",
        p: [
          "Seven sending domains, each kept separate from the client’s primary domain, carrying roughly ten inboxes apiece for seventy in total.",
        ],
        list: [
          ["Authentication per domain", "SPF, DKIM and DMARC configured on every domain rather than on a template and copied. A DMARC policy that is published but never checked is decoration; each record was verified against live sends."],
          ["Inbox provisioning at volume", "Seventy inboxes set up with consistent naming and sending profiles, so per-inbox volume stays low enough to look like a person and not a pipe."],
          ["A two-week Smartlead warmup", "The ramp ran in full before campaign traffic was permitted. No inbox sent a single cold email until it had a sending history behind it."],
        ],
      },
      {
        h: "Why the two weeks are not negotiable",
        p: [
          "Warmup is the part clients most often want to shorten, because it is two weeks of visible cost with no visible output. It is also the only part that cannot be bought back later: an inbox that starts cold-sending on day one builds a reputation that then has to be repaired, which takes longer than warming it properly would have.",
          "Running the ramp to completion was the condition of the build. The infrastructure was handed over once every inbox had cleared it, not before.",
        ],
      },
      {
        h: "Where it landed",
        p: [
          "The client received a sending estate with every domain authenticated, every inbox provisioned and warmed through a complete cycle, and campaign volume distributed across seventy inboxes instead of concentrated where it would be flagged.",
        ],
      },
    ],
  },

  {
    slug: "framer-ghl-journeys",
    index: "05",
    client: "Automotive repair group",
    industry: "Automotive service",
    title: "Six customer journeys specified as IF/THEN tables before a single workflow was built",
    summary:
      "Scoped and documented as delivery specialist: a Framer-to-GoHighLevel CRM integration mapping six distinct customer journey types, each with a full IF/THEN logic table covering entry, branching and exit.",
    tags: ["Framer → GHL", "Logic specification", "Delivery"],
    schematic: "logic",
    shots: [],
    meta: [
      ["Client", "Automotive repair company"],
      ["Sector", "Automotive service"],
      ["Role", "Delivery specialist — scoping & documentation"],
      ["Platforms", "Framer · GoHighLevel · webhooks"],
    ],
    sections: [
      {
        h: "The situation",
        p: [
          "The marketing site was built in Framer and the CRM was GoHighLevel, with nothing reliable between them. An enquiry and a booking request arrived looking identical, so both were handled as general enquiries, and the difference between someone comparing prices and someone ready to hand over a car was invisible at the point it mattered most.",
          "The brief was not to build workflows quickly. It was to define, in writing, what the system should do in every case — so it could be built once, by anyone, and checked against something.",
        ],
      },
      {
        h: "What I delivered",
        p: [
          "Six distinct customer journey types, each specified as a complete IF/THEN logic table before implementation began.",
        ],
        list: [
          ["Entry condition", "What has to be true for a contact to enter this journey, written tightly enough that two journeys cannot both claim the same contact."],
          ["Branch logic", "Every decision point as an explicit IF/THEN row, including the branches nobody wants to think about: no response, a partial form, a duplicate submission, a contact already live in another journey."],
          ["Exit criteria", "What ends the journey, and what happens to the contact afterwards. A journey with no defined exit is how people end up receiving a booking reminder for a car they collected a month ago."],
          ["Field and webhook mapping", "Which Framer form field lands in which GHL field, with types and defaults, so the integration had one source of truth instead of being reverse-engineered from the live form."],
        ],
      },
      {
        h: "Why specify it first",
        p: [
          "Automation hides its own bugs. A broken workflow does not throw an error; it quietly does nothing, or does the wrong thing to someone who never tells you. The only way to find that is to have written down what should have happened.",
          "Specifying the branches up front also exposes the gaps while they are still cheap. Three of the hardest questions on this build — what happens to a duplicate, what happens when a journey is abandoned halfway, what happens when one contact qualifies for two journeys — surfaced during the logic tables, not in production.",
        ],
      },
      {
        h: "Where it landed",
        p: [
          "The client received a complete, buildable specification: six journeys, their logic tables, and the field mapping between Framer and GoHighLevel. A spec that documents its own edge cases is also the handover document, which is the point.",
        ],
      },
    ],
  },

  {
    slug: "dedupe-and-dispatch",
    index: "06",
    client: "Integration builds",
    industry: "E-commerce & home services",
    title: "Stopping one customer from becoming three contacts",
    summary:
      "Two integration builds: a Shopify-to-GoHighLevel deduplication and merge workflow in Zapier, and a GoHighLevel-to-ServiceTitan integration pushing qualified work into a field service system.",
    tags: ["Zapier", "Shopify", "ServiceTitan"],
    schematic: "dedupe",
    shots: [],
    meta: [
      ["Scope", "Two integration builds"],
      ["Sector", "E-commerce · home services"],
      ["Role", "Integration design & build"],
      ["Platforms", "Shopify · Zapier · GoHighLevel · ServiceTitan"],
    ],
    sections: [
      {
        h: "The situation",
        p: [
          "A naive Shopify-to-CRM connection creates a contact per order. A returning customer who checks out with a different email, or the same email with a different capitalisation, or a phone number formatted another way, becomes two or three records. Each one then receives the welcome sequence, the segmentation breaks, and the reporting quietly overstates how many customers the business has.",
          "The second build had the opposite shape: GoHighLevel held the lead and the qualification, and ServiceTitan was where the work actually got scheduled, with no connection between them.",
        ],
      },
      {
        h: "What I built",
        p: [],
        list: [
          ["Shopify → GHL deduplication and merge", "Every inbound customer is matched against existing GHL contacts before anything is created. Matching normalises the data first — case, whitespace, phone formatting — because most duplicates are not different people, they are the same person typed differently."],
          ["Merge rather than overwrite", "On a match, the record is enriched instead of replaced. Order history accumulates on one contact; the fields that should win on conflict are decided by rule rather than by whichever record was written last."],
          ["GHL → ServiceTitan dispatch", "Qualified work moves from the CRM into the field service system with the context attached, so the office is not rekeying a job that already exists in another tab."],
        ],
      },
      {
        h: "The part that takes the time",
        p: [
          "The happy path in a dedupe workflow takes an afternoon. The rest of it is the match rules and the conflict rules: what counts as the same person, which field wins when two records disagree, and what to do with a near-match that should be flagged for a human rather than merged automatically.",
          "Getting that wrong in the other direction is worse than duplicates. A merge rule that is too aggressive collapses two real customers into one, and unlike a duplicate, that is not something you can undo from the audit trail.",
        ],
      },
      {
        h: "Where it landed",
        p: [
          "Order data flows into a single contact per customer rather than one per checkout, so segmentation and lifecycle messaging work from a true record. On the dispatch side, qualified work reaches ServiceTitan with its context intact instead of being retyped.",
        ],
      },
    ],
  },

  {
    slug: "klaviyo-template-system",
    index: "07",
    client: "Dutch natural flower brand",
    industry: "E-commerce / DTC",
    title: "A Figma-to-Klaviyo template system that stays editable after handover",
    summary:
      "A modular email template system for a Dutch natural flower brand, designed in Figma and rebuilt as live, editable Klaviyo blocks rather than sliced images — so the brand can ship campaigns without a designer.",
    tags: ["Klaviyo", "Figma", "Email design"],
    schematic: "modules",
    shots: [],
    meta: [
      ["Client", "Dutch natural flower brand"],
      ["Sector", "E-commerce / DTC"],
      ["Role", "Email template system design & build"],
      ["Platforms", "Figma · Klaviyo"],
    ],
    sections: [
      {
        h: "The situation",
        p: [
          "Beautiful email designs usually arrive as images. They look right in the inbox preview, they are unreadable with images blocked, they are invisible to screen readers, and every small change means going back to the designer. A brand that ships weekly ends up either paying for every send or quietly stopping sending.",
          "A flower brand has a particular version of this problem: the product is visual, so the pull toward image-heavy email is strong, and the seasonal calendar means the template gets reused constantly with different content.",
        ],
      },
      {
        h: "What I built",
        p: [
          "A hybrid workflow. The design is settled in Figma, where it is fast to iterate and easy to review, then rebuilt in Klaviyo as modular blocks rather than exported as artwork.",
        ],
        list: [
          ["Live text, not baked text", "Headlines and body copy are real text in the template. They render with images off, they are selectable and readable by assistive technology, and they can be edited by whoever is sending the campaign."],
          ["A module library", "Hero, product row, editorial block, testimonial, footer — each one self-contained, so a campaign is assembled from blocks rather than built from scratch or copied from the last send and edited around."],
          ["Design tokens carried across", "Type scale, spacing and colour come from the Figma file as a defined set rather than being eyeballed per module, so two campaigns built by two different people still look like the same brand."],
        ],
      },
      {
        h: "Where it landed",
        p: [
          "The brand can build a campaign from existing modules without a design round trip, and the emails degrade properly when images are blocked. The Figma file remains the place design decisions are made; Klaviyo is where they are implemented once and then reused.",
        ],
      },
    ],
  },

  {
    slug: "ghl-system-audit",
    index: "08",
    client: "Men's health brand",
    industry: "Audit, under The Smart Scale Digital",
    title: "107 automations, 48 of them switched off, and no lifecycle holding them together",
    summary:
      "A full GoHighLevel audit of an account with the automation count of a mature system and the structure of a new one: 107 workflows, 45% inactive, many with no trigger at all, and no customer lifecycle connecting any of it.",
    tags: ["GoHighLevel", "System audit", "Lifecycle design"],
    schematic: "audit",
    shots: [],
    meta: [
      ["Engagement", "Audit & evaluation phase"],
      ["Delivered under", "The Smart Scale Digital"],
      ["Sector", "Direct-to-consumer men's health"],
      ["Output", "10-page report + 1-page summary"],
    ],
    sections: [
      {
        h: "The situation",
        p: [
          "The account did not look neglected. It looked busy. 107 automations, integrations into Zapier, n8n and a set of webhooks, a lead scoring system, AI tools, a pipeline, a WordPress site feeding leads in. By every surface measure it was a mature GoHighLevel build.",
          "It behaved like an early-stage one. Leads arrived and were not consistently followed up. Staff were unclear who owned what. The owner could not answer basic questions about where leads came from or where they stalled.",
          "The brief was to find out why, and to say so in writing.",
        ],
      },
      {
        h: "What the audit found",
        p: [
          "The headline number is the one that reframes the whole engagement: of 107 automations, 59 were published and 48 were drafts. Forty-five percent of the system was switched off, and nobody knew which half was which.",
        ],
        list: [
          ["Workflows with no trigger", "Several automations — both draft and live — had no entry condition at all. They could never fire. They sat in the list looking like capability."],
          ["Automations running in isolation", "The live workflows were largely standalone. None passed a contact to the next step, so there was no path through the system, only a set of disconnected events."],
          ["WordPress leads arriving nowhere", "Leads came in from the website with no consistent workflow entry point, no standard tagging and no immediate response. They were captured, then effectively parked."],
          ["A manual pipeline", "Stages existed but were moved by hand. Nothing automated stage movement, so the pipeline recorded work someone remembered to do rather than driving it."],
          ["Lead scoring with no consequence", "Scores were being calculated and then ignored. They changed no routing, no priority and no follow-up intensity, so a high-intent lead was treated exactly like a cold one."],
          ["No task or ownership layer", "No automatic task creation, no staff assignment, no completion tracking. Accountability depended entirely on memory."],
          ["Logic scattered outside the CRM", "Zapier, n8n and raw webhooks were doing work GoHighLevel could do natively, which multiplied the number of places a failure could hide."],
          ["AI bolted on rather than built in", "AI tools were present but not embedded in any workflow, firing at the wrong points in the journey rather than at first response or qualification."],
        ],
      },
      {
        h: "The actual problem",
        p: [
          "Ten problems were listed, but they were symptoms of one. The system had been built as a collection of tools and automations rather than as a connected workflow system reflecting how the business actually converts a lead into a patient.",
          "That distinction decides what you do next. If the problem is missing features, you buy and build more. If the problem is missing structure, more building makes it worse — and this account was the proof, because it had already built 107 times.",
        ],
      },
      {
        h: "What I recommended",
        p: [
          "A lifecycle-based workflow system: not one central workflow, but several connected ones, each owning a stage and handing off to the next.",
        ],
        list: [
          ["The lifecycle", "Lead → Engage → Book → Show → Convert → Nurture → Reactivate, with a dedicated workflow per stage rather than one monolith trying to branch its way through everything."],
          ["A contract for every workflow", "Each one trigger-based, updating the pipeline stage, applying and removing its tags, creating tasks where a human is needed, and explicitly passing the contact to the next workflow. That last clause is what turns a set of automations into a system."],
          ["The pipeline demoted to a view", "Stage movement automated by the workflows, so the pipeline becomes a tracking surface rather than a data entry chore."],
          ["Scoring wired to consequences", "Scores driving priority handling, staff notification and follow-up intensity, so the number finally changes what happens to the lead."],
          ["Logic pulled back into GoHighLevel", "Reducing webhook and external-tool dependency where the platform can do the work, cutting the number of failure points."],
        ],
      },
      {
        h: "The roadmap",
        p: [
          "Seven phases, deliberately ordered so that nothing gets built on top of a mess: system mapping first, then tag cleanup, then the workflow build, then pipeline and task automation, then integration consolidation, then AI, and reporting last.",
          "Mapping is phase one for the same reason the audit existed. The account had never had its ideal process written down, so every previous build had been a guess about what the system should do.",
        ],
      },
      {
        h: "Where it landed",
        p: [
          "The client received a ten-page audit and a one-page summary they could act on, with the automation inventory quantified, ten named problems, a target architecture and a phased plan.",
          "The conclusion was the part worth paying for: the system had the volume of a mature setup but not the structure of one, and the next phase was not more tools. It was organising what already existed into something connected.",
        ],
      },
    ],
  },
];

module.exports = { site, hero, proof, leaks, services, process, stack, certs, about, gallery, work, notes, notesIntro, palettes, activePalette };
