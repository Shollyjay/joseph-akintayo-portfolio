/* Build: content.js + src/* -> dist/
   index.html is written as an artifact fragment (the Artifact host
   supplies <!doctype>/<head>/<body>); the case study pages under
   dist/work/ are written as complete standalone documents. */

const fs = require("fs");
const path = require("path");
const { site, hero, proof, leaks, services, process: steps, stack, certs, about, gallery, work, notes, notesIntro, contact, palettes, activePalette } = require("./content");
const { schematics } = require("./src/schematics");
const { icons } = require("./src/icons");
const ico = (k) => icons[k] || "";

/* A shot only renders if its file is really in assets/work/. That way the
   page never shows a broken image while screenshots are still being added. */
const SHOT_DIR = path.join(__dirname, "assets", "work");
const HAS_GALLERY = require("./content").gallery.items.some((g) =>
  fs.existsSync(path.join(SHOT_DIR, g.file)));
function presentShots(w) {
  if (!w.shots || !w.shots.length) return [];
  return w.shots.filter((s) => fs.existsSync(path.join(SHOT_DIR, s.file)));
}

const CSS = fs.readFileSync(path.join(__dirname, "src/site.css"), "utf8");
const JS = fs.readFileSync(path.join(__dirname, "src/site.js"), "utf8");

/* The accent palette is emitted after the main stylesheet, overriding the
   accent tokens in each of the three theme states (system-dark, system-light
   and the explicit toggle) so the cascade shape stays identical. */
function paletteCSS() {
  const pal = palettes[activePalette] || palettes.red;
  const vars = (v) => `--accent:${v.accent};--accent-2:${v.accent2};--accent-text:${v.text};` +
                      `--accent-ink:${v.ink};--accent-dim:${v.dim};`;
  return `\n/* accent palette: ${activePalette} */\n` +
    `:root{${vars(pal.dark)}}\n` +
    `@media (prefers-color-scheme: light){:root:not([data-theme="dark"]){${vars(pal.light)}}}\n` +
    `:root[data-theme="light"]{${vars(pal.light)}}\n`;
}
const CSS_ALL = CSS + paletteCSS();


const FONTS =
  '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300..700&display=swap">';

const ARROW =
  '<svg class="arr" width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const GO =
  '<svg class="w-go" width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const BACKARR =
  '<svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M11 7H3M6 3L2 7l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const TICK =
  '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const THEME_BTN = `<button id="themeToggle" class="icon-btn" type="button" aria-label="Switch colour theme">
  <svg class="i-moon" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13.5 9.6A5.8 5.8 0 0 1 6.4 2.5 5.8 5.8 0 1 0 13.5 9.6z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>
  <svg class="i-sun" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.3"/><path d="M8 1v1.6M8 13.4V15M15 8h-1.6M2.6 8H1M12.9 3.1l-1.1 1.1M4.2 11.8l-1.1 1.1M12.9 12.9l-1.1-1.1M4.2 4.2L3.1 3.1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
</button>`;

function nav(prefix) {
  const p = prefix || "";
  return `<header class="nav">
  <div class="wrap">
    <div class="nav-in">
      <a class="brand" href="${p || "#top"}"><span class="dot"></span>${site.name}</a>
      <nav class="nav-links" aria-label="Sections">
        <a href="${p}#work">Work</a>\n        <a href="${p}#notes">Notes</a>${HAS_GALLERY ? `\n        <a href="${p}#gallery">Funnels</a>` : ""}
        <a href="${p}#services">Services</a>
        <a href="${p}#process">Process</a>
        <a href="${p}#about">About</a>
      </nav>
      ${THEME_BTN}
      <a class="btn btn-primary" href="${p}#contact">Free audit ${ARROW}</a>
    </div>
  </div>
</header>`;
}

function footer(prefix) {
  const p = prefix || "";
  return `<footer class="foot">
  <div class="wrap foot-in">
    <span>© ${site.year} ${site.name} · ${site.location}</span>
    <span>${site.tz}</span>
    <span><a href="${site.upwork}" target="_blank" rel="noopener">Upwork</a> · <a href="${p}#contact">Contact</a></span>
  </div>
</footer>`;
}

/* ---------------- index ---------------- */

function buildIndex() {
  const pipeNodes = hero.stages
    .map(
      (s, i) => `<div class="node" data-stage="${s}">
            <span class="n">0${i + 1}</span>
            <span class="t">${s}</span>
            <span class="bar"><i></i></span>
          </div>`
    )
    .join("\n          ");

  const stats = proof
    .map(
      (s, i) => `<div class="card stat reveal" style="grid-column:span 3">
          ${ico(s.icon)}
          <div class="v"><span data-count="${s.value}">0</span>${s.suffix ? `<span>${s.suffix}</span>` : ""}</div>
          <div class="l">${s.label}</div>
          <div class="n">${s.note}</div>
        </div>`
    )
    .join("\n        ");

  const leakCards = leaks.items
    .map(
      (l) => `<article class="card leak reveal" style="grid-column:span 6">
          <div class="eye st eye-row">${ico(l.icon)}<span>${l.stage}</span></div>
          <h3>${l.title}</h3>
          <p>${l.body}</p>
        </article>`
    )
    .join("\n        ");

  const svcCards = services
    .map(
      (s) => `<article class="card svc reveal" id="svc-${s.id}" style="grid-column:span 4">
          <span class="ico-tile">${ico(s.icon)}</span>
          <div class="eye">${s.num} · Service</div>
          <h3>${s.title}</h3>
          <p class="lede">${s.lede}</p>
          <ul>${s.points.map((p) => `<li>${p}</li>`).join("")}</ul>
        </article>`
    )
    .join("\n        ");

  /* work bento: first card is the featured accent tile spanning half,
     the rest fill a 3-up grid */
  const workCards = work
    .map((w, i) => {
      const feat = i === 0;
      const span = feat ? 6 : i === 1 ? 6 : 4;
      const ps = presentShots(w);
      const pick = (w.thumb && ps.find((s) => s.file === w.thumb)) || ps[0];
      const thumb = pick
        ? `<span class="shot-thumb"><img src="assets/work/${pick.file}" alt="${pick.alt || w.title}" loading="lazy"></span>`
        : "";
      return `<a class="card work-card reveal${feat ? " work-feat" : ""}" href="work/${w.slug}.html" style="grid-column:span ${span}">
          ${thumb}
          <div class="w-top">
            <span class="w-i">${w.index} — ${w.client}</span>
            ${GO}
          </div>
          <h3>${w.title}</h3>
          <p>${w.summary}</p>
          <div class="tags">${w.tags.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
        </a>`;
    })
    .join("\n        ");

  const stepCards = steps
    .map(
      (s, i) => `<article class="card step reveal" style="grid-column:span ${i < 2 ? 6 : 4}">
          <div class="step-head"><span class="ico-tile">${ico(s.icon)}</span><div class="eye n">Step ${s.n}</div></div>
          <h3>${s.title}</h3>
          <p>${s.body}</p>
        </article>`
    )
    .join("\n        ");

  const facts = about.facts
    .map((f) => `<div class="fact"><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`)
    .join("");

  const certList = certs.map((c) => `<div class="cert">${TICK}<span>${c}</span></div>`).join("");

  const tickerItems = stack.map((s) => `<span>${s}</span>`).join("");

  const galleryItems = gallery.items.filter((g) => fs.existsSync(path.join(SHOT_DIR, g.file)));
  const gallerySection = galleryItems.length
    ? `
  <!-- funnel gallery -->
  <section class="sect" id="gallery">
    <div class="wrap">
      <div class="sect-head reveal">
        <div class="eye">${gallery.eyebrow}</div>
        <h2>${gallery.title}</h2>
        <p>${gallery.lede}</p>
      </div>
      <div class="row">
        ${galleryItems
          .map(
            (g, i) => `<figure class="card gal reveal" style="grid-column:span ${i < 2 ? 6 : 4};margin:0">
          <span class="gal-frame"><img src="assets/work/${g.file}" alt="${g.label}" loading="lazy"></span>
          <figcaption>${g.label}</figcaption>
        </figure>`
          )
          .join("\n        ")}
      </div>
    </div>
  </section>`
    : "";

  return `<title>${site.name}</title>
${FONTS}
<style>
${CSS_ALL}
</style>

<a class="skip" href="#main">Skip to content</a>
${nav("")}

<main id="main">
  <!-- hero -->
  <section class="sect" id="top">
    <div class="wrap row">
      <div class="card hero-card" style="grid-column:span 8">
        <div class="eye">${hero.eyebrow}</div>
        <h1>Lead systems don't leak at the ad. They leak <span class="hl">between the click and the call.</span></h1>
        <p class="lede">${hero.lede}</p>
        <div class="hero-ctas">
          ${hero.ctas
            .map(
              (c) =>
                `<a class="btn ${c.kind === "primary" ? "btn-primary" : "btn-ghost"}" href="${c.href}">${c.label} ${ARROW}</a>`
            )
            .join("\n          ")}
        </div>
      </div>
      <figure class="card portrait" style="grid-column:span 4;margin:0">
        <img src="assets/joseph-hero.jpg" alt="${site.name}, GoHighLevel and marketing automation specialist" width="1100" height="1534">
        <figcaption class="tag"><span class="live"></span>Lagos, Nigeria — available for new work</figcaption>
      </figure>
    </div>
  </section>

  <!-- ticker -->
  <section class="sect" style="padding-block:4px">
    <div class="wrap">
      <div class="ticker" aria-hidden="true"><div class="ticker-in">${tickerItems}</div></div>
    </div>
  </section>

  <!-- stats -->
  <section class="sect" id="proof">
    <div class="wrap row">
      ${stats}
    </div>
  </section>

  <!-- pipeline -->
  <section class="sect">
    <div class="wrap row">
      <div class="card reveal" id="pipe" style="grid-column:span 12">
        <div class="pipe-head">
          <span>The lead journey · <span id="pipeStage">Ad seen</span></span>
          <span>elapsed <b id="pipeClock">T+00.0s</b></span>
        </div>
        <div class="pipe-track">
          ${pipeNodes}
        </div>
      </div>
    </div>
  </section>

  <!-- leaks -->
  <section class="sect" id="leaks">
    <div class="wrap">
      <div class="sect-head reveal">
        <div class="eye">The problem</div>
        <h2>${leaks.title}</h2>
        <p>${leaks.lede}</p>
      </div>
      <div class="row">
        ${leakCards}
      </div>
    </div>
  </section>

  <!-- services -->
  <section class="sect" id="services">
    <div class="wrap">
      <div class="sect-head reveal">
        <div class="eye">Specialization</div>
        <h2>Three layers, built by one person so nothing is lost between them</h2>
        <p>Most teams brief the ad to one freelancer, the page to another and the follow-up to a third, then wonder why the handoffs leak. I build all three against the same map.</p>
      </div>
      <div class="row">
        ${svcCards}
      </div>
    </div>
  </section>

  <!-- work -->
  <section class="sect" id="work">
    <div class="wrap">
      <div class="sect-head reveal">
        <div class="eye">Showcase</div>
        <h2>Eight systems, written up properly</h2>
        <p>Each one has its own page: the situation, what got built, the logic behind it, and where it landed.</p>
      </div>
      <div class="row">
        ${workCards}
      </div>
    </div>
  </section>

${gallerySection}

  <!-- field notes -->
  <section class="sect" id="notes">
    <div class="wrap">
      <div class="sect-head reveal">
        <div class="eye">${notesIntro.eyebrow}</div>
        <h2>${notesIntro.title}</h2>
        <p>${notesIntro.lede}</p>
      </div>
      <div class="row">
        ${notes
          .map(
            (n) => `<a class="card work-card reveal" href="notes/${n.slug}.html" style="grid-column:span 6">
          <div class="w-top">
            <span class="w-i eye-row">${ico(n.icon)}<span>${n.kind}</span></span>
            ${GO}
          </div>
          <h3>${n.title}</h3>
          <p>${n.summary}</p>
          <div class="tags">${n.tags.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
        </a>`
          )
          .join("\n        ")}
      </div>
    </div>
  </section>

  <!-- process -->
  <section class="sect" id="process">
    <div class="wrap">
      <div class="sect-head reveal">
        <div class="eye">How I work</div>
        <h2>Five steps, and the audit comes first</h2>
        <p>The order matters more than the list. Creative pointed at a broken follow-up only spends the budget faster.</p>
      </div>
      <div class="row">
        ${stepCards}
      </div>
    </div>
  </section>

  <!-- about -->
  <section class="sect" id="about">
    <div class="wrap row">
      <figure class="card portrait reveal" style="grid-column:span 4;margin:0;min-height:360px">
        <img src="assets/joseph-about.jpg" alt="Portrait of ${site.name}" width="900" height="1268" loading="lazy">
        <figcaption class="tag"><span class="live"></span>Top Rated on Upwork</figcaption>
      </figure>
      <div class="card about-copy reveal" style="grid-column:span 8">
        <div class="eye">More about me</div>
        <h2>${about.title}</h2>
        ${about.paras.map((p) => `<p>${p}</p>`).join("\n        ")}
        <dl class="facts">${facts}</dl>
      </div>
      <div class="card reveal" style="grid-column:span 5">
        <div class="eye">Credentials</div>
        <h3>Certifications</h3>
        <div class="certs">${certList}</div>
      </div>
      <div class="card result reveal" style="grid-column:span 7">
        <div class="eye" style="color:rgba(255,255,255,.75)">A result</div>
        <div class="fig">${about.result.figure}</div>
        <p>${about.result.body}</p>
      </div>
    </div>
  </section>

  <!-- contact -->
  <section class="sect contact" id="contact">
    <div class="wrap row">
      <div class="card contact-card reveal" style="grid-column:span 7">
        <div class="eye">Next step</div>
        <h2>Send me what is running now. I will send back an audit.</h2>
        <p class="lede">The GoHighLevel account, the landing page, the ads, or all three. You get back where the journey leaks and a roadmap of what to fix first, in order — before anything is agreed.</p>
        <div class="links">
          <a class="btn btn-primary" href="${contact.bookingUrl}" target="_blank" rel="noopener">${ico("calendar")} ${contact.bookingLabel} ${ARROW}</a>
          <a class="btn btn-ghost" href="${contact.resume}" download target="_blank" rel="noopener">${ico("download")} Résumé</a>
          <a class="btn btn-ghost" href="${site.upwork}" target="_blank" rel="noopener">Upwork ${ARROW}</a>
        </div>
        <dl class="facts" style="margin-top:4px">
          <div class="fact"><dt class="eye-row">${ico("calendar")}<span>Call</span></dt><dd>${contact.bookingNote}</dd></div>
          <div class="fact"><dt class="eye-row">${ico("download")}<span>Résumé</span></dt><dd>${contact.resumeNote}</dd></div>
          <div class="fact"><dt class="eye-row">${ico("clock")}<span>Hours</span></dt><dd>${site.tz}</dd></div>
        </dl>
        <div class="copybox" style="margin-top:6px">
          <div class="copyrow">
            <div><div class="k eye-row">${ico("mail")}<span>Email</span></div><div class="v">${site.email}</div></div>
            <button type="button" data-copy="${site.email}">Copy</button>
          </div>
          <div class="copyrow">
            <div><div class="k eye-row">${ico("phone")}<span>Phone / WhatsApp</span></div><div class="v">${site.phone}</div></div>
            <button type="button" data-copy="${site.phone}">Copy</button>
          </div>
        </div>
      </div>

      <div class="card reveal" style="grid-column:span 5">
        <span class="ico-tile">${ico("send")}</span>
        <div class="eye">${contact.form.eyebrow}</div>
        <h3>${contact.form.title}</h3>
        <p class="muted" style="font-size:var(--t-sm)">${contact.form.note}</p>
        <form id="contactForm" class="form" novalidate
              data-endpoint="${contact.formEndpoint}"
              data-key="${contact.formAccessKey || ""}"
              data-to="${site.email}"
              data-ok="${contact.form.ok}"
              data-failed="${contact.form.failed}"
              data-sending="${contact.form.sending}"
              data-submit="${contact.form.submit}">
          ${contact.form.fields
            .map((f) =>
              f.type === "textarea"
                ? `<label class="field">
            <span class="field-label">${f.label}${f.required ? ' <i aria-hidden="true">*</i>' : ""}</span>
            <textarea id="f-${f.id}" name="${f.id}" rows="4" ${f.required ? "required" : ""} placeholder="${f.placeholder || ""}"></textarea>
            <span class="field-err" hidden></span>
          </label>`
                : `<label class="field">
            <span class="field-label">${f.label}${f.required ? ' <i aria-hidden="true">*</i>' : ""}</span>
            <input id="f-${f.id}" name="${f.id}" type="${f.type}" ${f.autocomplete ? `autocomplete="${f.autocomplete}"` : ""} ${f.required ? "required" : ""} placeholder="${f.placeholder || ""}">
            <span class="field-err" hidden></span>
          </label>`
            )
            .join("\n          ")}
          <button class="btn btn-primary" type="submit">${ico("send")} ${contact.form.submit}</button>
          <p class="form-status" role="status" aria-live="polite" hidden></p>
        </form>
      </div>
    </div>
  </section>
</main>

${footer("")}
<script>
${JS}
</script>
`;
}

/* ---------------- case study ---------------- */

function buildCase(w, next) {
  const sch = schematics[w.schematic];
  const meta = w.meta.map((m) => `<div><dt>${m[0]}</dt><dd>${m[1]}</dd></div>`).join("");

  const blocks = w.sections
    .map((s) => {
      const paras = (s.p || []).map((p) => `<p>${p}</p>`).join("\n          ");
      const spec = s.list
        ? `<div class="spec">${s.list
            .map((row) => `<div class="spec-row"><h4>${row[0]}</h4><p>${row[1]}</p></div>`)
            .join("")}</div>`
        : "";
      return `<section class="card block reveal" style="grid-column:span 12">
          <h2>${s.h}</h2>
          ${paras}
          ${spec}
        </section>`;
    })
    .join("\n        ");

  const sh = presentShots(w);
  const shots = sh.length
    ? `
  <section class="sect">
    <div class="wrap row">
      <div class="card reveal" style="grid-column:span 12">
        <div class="eye">From the build</div>
        <div class="shots${sh.length === 1 ? " one" : ""}">
          ${sh
            .map(
              (s) => `<figure class="shot">
            <span class="shot-frame"><img src="../assets/work/${s.file}" alt="${(s.alt || "").replace(/"/g, "&quot;")}" loading="lazy"></span>
            ${s.caption ? `<figcaption>${s.caption}</figcaption>` : ""}
          </figure>`
            )
            .join("\n          ")}
        </div>
      </div>
    </div>
  </section>`
    : "";

  const body = `<a class="skip" href="#main">Skip to content</a>
${nav("../index.html")}

<main id="main">
  <section class="sect" id="top">
    <div class="wrap row">
      <div class="card cs-hero" style="grid-column:span 8">
        <a class="back" href="../index.html#work">${BACKARR} All work</a>
        <div class="eye">${w.index} · ${w.client} · ${w.industry}</div>
        <h1>${w.title}</h1>
        <p class="lede">${w.summary}</p>
      </div>
      <div class="card" style="grid-column:span 4">
        <div class="eye">At a glance</div>
        <dl class="meta">${meta}</dl>
      </div>
    </div>
  </section>

  <section class="sect">
    <div class="wrap row">
      <div class="card schematic reveal" style="grid-column:span 12">
        <div class="eye schematic-cap">${sch.caption}</div>
        <div class="schematic-scroll">${sch.svg}</div>
      </div>
    </div>
  </section>
${shots}
  <section class="sect">
    <div class="wrap row">
        ${blocks}
    </div>
  </section>

  <section class="sect">
    <div class="wrap row">
      <a class="card next-link reveal" href="${next.slug}.html" style="grid-column:span 12">
        <div>
          <div class="k">Next case study — ${next.index}</div>
          <h3>${next.title}</h3>
        </div>
        ${GO}
      </a>
    </div>
  </section>
</main>

${footer("../index.html")}`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${w.client} · ${site.name}</title>
<meta name="description" content="${w.summary.replace(/"/g, "&quot;")}">
${FONTS}
<style>
:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
html,body{margin:0}
img{max-width:100%}
[hidden]{display:none!important}
${CSS_ALL}
</style>
</head>
<body>
${body}
<script>
${JS}
</script>
</body>
</html>
`;
}


/* ---------------- field note page ---------------- */

function buildNote(n, next) {
  const shots = (n.shots || []).filter((sh) => fs.existsSync(path.join(SHOT_DIR, sh.file)));
  const shotBlock = shots.length
    ? `
  <section class="sect">
    <div class="wrap row">
      <div class="card reveal" style="grid-column:span 12">
        <div class="eye">From a real account</div>
        <div class="shots${shots.length === 1 ? " one" : ""}">
          ${shots
            .map(
              (sh) => `<figure class="shot">
            <span class="shot-frame"><img src="../assets/work/${sh.file}" alt="${(sh.alt || "").replace(/"/g, "&quot;")}" loading="lazy"></span>
            ${sh.caption ? `<figcaption>${sh.caption}</figcaption>` : ""}
          </figure>`
            )
            .join("\n          ")}
        </div>
      </div>
    </div>
  </section>`
    : "";

  const blocks = n.sections
    .map((sec) => {
      const paras = (sec.p || []).map((x) => `<p>${x}</p>`).join("\n          ");
      const spec = sec.list
        ? `<div class="spec">${sec.list
            .map((row) => `<div class="spec-row"><h4>${row[0]}</h4><p>${row[1]}</p></div>`)
            .join("")}</div>`
        : "";
      return `<section class="card block reveal" style="grid-column:span 12">
          <h2>${sec.h}</h2>
          ${paras}
          ${spec}
        </section>`;
    })
    .join("\n        ");

  const body = `<a class="skip" href="#main">Skip to content</a>
${nav("../index.html")}

<main id="main">
  <section class="sect" id="top">
    <div class="wrap row">
      <div class="card cs-hero" style="grid-column:span 8">
        <a class="back" href="../index.html#notes">${BACKARR} All notes</a>
        <div class="eye eye-row">${ico(n.icon)}<span>${n.kind}</span></div>
        <h1>${n.title}</h1>
        <p class="lede">${n.summary}</p>
      </div>
      <div class="card" style="grid-column:span 4">
        <div class="eye">What this is</div>
        <p class="muted" style="font-size:var(--t-sm)">A method note, not a client case study. It explains how this part of a build works and what breaks it. It names no client and claims no result, because this piece of work has neither attached to it.</p>
        <div class="tags">${n.tags.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
      </div>
    </div>
  </section>
${shotBlock}
  <section class="sect">
    <div class="wrap row">
        ${blocks}
    </div>
  </section>

  <section class="sect">
    <div class="wrap row">
      <a class="card next-link reveal" href="${next.slug}.html" style="grid-column:span 12">
        <div>
          <div class="k">Next note</div>
          <h3>${next.title}</h3>
        </div>
        ${GO}
      </a>
    </div>
  </section>
</main>

${footer("../index.html")}`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${n.title.slice(0, 60)} · ${site.name}</title>
<meta name="description" content="${n.summary.replace(/"/g, "&quot;")}">
${FONTS}
<style>
:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
html,body{margin:0}
img{max-width:100%}
[hidden]{display:none!important}
${CSS_ALL}
</style>
</head>
<body>
${body}
<script>
${JS}
</script>
</body>
</html>
`;
}

/* ---------------- run ---------------- */

/* GitHub Pages can only serve the repo root or /docs, so the build output
   lives in docs/. It is the deployable site, not documentation. */
const dist = path.join(__dirname, "docs");
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(path.join(dist, "work"), { recursive: true });
fs.mkdirSync(path.join(dist, "assets"), { recursive: true });

/* Two forms of the homepage:
   - dist/index.html is a complete document, which is what every real host
     needs (GitHub Pages, Netlify, Vercel). Without the doctype it renders in
     quirks mode and, with no viewport meta, breaks on phones.
   - .artifact/index.html is the same page as a bare fragment, because the
     Claude artifact host supplies its own <!doctype>/<head>/<body> wrapper
     and a second one would nest. */
const indexFragment = buildIndex();

/* the fragment is head-ish markup (title, fonts, styles) followed by the
   page itself, starting at the skip link */
const splitAt = indexFragment.indexOf('<a class="skip"');
if (splitAt < 0) throw new Error("could not split the index fragment");
const headPart = indexFragment.slice(0, splitAt).trim();
const bodyPart = indexFragment.slice(splitAt).trim();

const standaloneIndex = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="${site.name} — ${site.role}. Based in ${site.location}.">
<meta property="og:title" content="${site.name} — ${site.role}">
<meta property="og:description" content="${hero.lede.replace(/"/g, "&quot;").slice(0, 200)}">
<meta property="og:type" content="website">
<meta property="og:image" content="assets/joseph-hero.jpg">
<meta name="twitter:card" content="summary_large_image">
<style>
:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
html,body{margin:0}
img{max-width:100%}
[hidden]{display:none!important}
</style>
${headPart}
</head>
<body>
${bodyPart}
</body>
</html>
`;

fs.writeFileSync(path.join(dist, "index.html"), standaloneIndex);
fs.mkdirSync(path.join(__dirname, ".artifact"), { recursive: true });
fs.writeFileSync(path.join(__dirname, ".artifact", "index.html"), indexFragment);

work.forEach((w, i) => {
  const next = work[(i + 1) % work.length];
  fs.writeFileSync(path.join(dist, "work", w.slug + ".html"), buildCase(w, next));
});

fs.mkdirSync(path.join(dist, "notes"), { recursive: true });
notes.forEach((n, i) => {
  const next = notes[(i + 1) % notes.length];
  fs.writeFileSync(path.join(dist, "notes", n.slug + ".html"), buildNote(n, next));
});

(function copyAssets(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const f of fs.readdirSync(src)) {
    const sp = path.join(src, f), dp = path.join(dest, f);
    if (fs.statSync(sp).isDirectory()) copyAssets(sp, dp);
    else fs.copyFileSync(sp, dp);
  }
})(path.join(__dirname, "assets"), path.join(dist, "assets"));

const sizes = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else sizes.push([path.relative(dist, p), (st.size / 1024).toFixed(1) + " KB"]);
  }
})(dist);
console.log("built " + sizes.length + " files");
sizes.forEach((s) => console.log("  " + s[0].padEnd(38) + s[1]));
