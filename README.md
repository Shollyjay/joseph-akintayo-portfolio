# Joseph Akintayo — portfolio site

Static site. No framework, no build dependencies, no npm install. Node is used
only to stamp out the pages from one content file.

## Structure

```
content.js          every word on the site — edit this, not the HTML
src/site.css        all styling (design tokens live at the top)
src/site.js         theme toggle, scroll reveals, hero pipeline animation
src/schematics.js   the seven case-study diagrams (inline SVG)
assets/             the two portraits
build.js            assembles dist/
dist/               the finished site — this is what you deploy
```

## Rebuild after an edit

```bash
node build.js
```

That regenerates `dist/index.html` and `dist/work/*.html`.

## The screenshots

17 images live in `assets/work/`, already optimised and redacted. They are
committed, so the site builds with no external source and no download step.

`build.js` only renders images that exist on disk, so a missing file never
produces a broken image.

Where they appear:

- **Funnel gallery** on the landing page — the 8 `funnel-*` images.
- **Work card thumbnails** — case studies 02, 03 and 04. A case study can name
  its card image with a `thumb` field; otherwise the first shot is used.
- **"From the build"** gallery on three case studies.

### Adding or replacing an image

Drop the file into `assets/work/`, then reference it in `content.js` — either
in `gallery.items` for the funnel grid, or in a case study's `shots` array for
its "From the build" section. Run `node build.js`. Nothing else to configure.

Keep new images around 1500px wide and under ~150KB, and check them for client
data first — see below.

### What was redacted, and why

Five screenshots were full browser captures of live GoHighLevel accounts. The
browser chrome was cropped off, and these were blurred before anything was
published:

| Image | Removed |
|---|---|
| `pipeline-stages` | ~20 real lead names across the board, the client account name in the sidebar, and the location ID in the URL |
| `pipeline-snapshot` | Snapshot names and the whole Sub Account column (client business names) |
| `ghl-workflow-list` | The client account name and its city in the sidebar |
| `dns-records` | The sending domain throughout, plus its DKIM and DMARC values |
| `spf-mxtoolbox` | The audited domain |

The specific values are deliberately not written down here — this file is
committed, and naming them would undo the redaction for anyone who reads the
repo. They were listed in the chat where the work was done.

The blur is destructive (downsample then blur), not a drawn-over overlay, so
the text cannot be recovered from the files in this repo. **The originals,
wherever you keep them, still contain all of it** — check any screenshot for
lead names, account names, sub-account columns and sending domains before you
reuse it anywhere.

One thing to confirm: `ghl-workflow-list` still shows its workflow names. They
read as internal process labels, but one of them could be a client brand — you
know the account. Blur it if so.

### What the funnel images actually are

The 8 `funnel-*` images are **template showcases, not live client funnels** —
they carry "Logoipsum" placeholder logos, "John Doe / Jane Doe" testimonials
and lorem ipsum body copy, with a "N PAGES" badge in the corner. The gallery
copy says so plainly and sells the structure rather than claiming client
deployments. Don't change that line to imply these are live client sites.

### Case studies with no screenshot

Four have none — the NPS loop, the Framer journey spec, the dedupe work and
the Klaviyo templates. No matching screenshot was available. The schematic
carries those pages. Add a `shots` entry in `content.js` if you get images.

Captions describe what each screenshot *shows* and never claim it is the named
client's account, because that could not be verified. If an image genuinely is
that client's, say so in the caption.

## Deploy

`dist/` is a plain static folder. Drag it into Netlify Drop, or point Vercel,
Cloudflare Pages or GitHub Pages at it. It needs no server.

Note: `dist/index.html` is published here as a Claude artifact, where the host
supplies the `<!doctype>`, `<head>` and `<body>` wrapper. If you deploy to your
own host instead, wrap `index.html` the way the case study pages are wrapped —
copy the first ten lines and the last three lines of any file in `dist/work/`.
A one-line change in `build.js` (`buildIndex`) can do this permanently.

## Things to confirm before you send this to a client

1. **AOS Aesthetics pipeline stages 01–04.** I only had the two trigger stages
   (Delinquent, Churned) from your resume, so the first four are shown as
   numbered lifecycle stages. Put the real names in `content.js` under
   `aos-vagaro-migration`, and in `src/schematics.js` → `pipeline6`.
2. **Outcome numbers.** Every case study ends with what shipped, not with an
   invented metric. The only percentage anywhere on the site is the 40% no-show
   drop, which is your own wording from Upwork. If you have real figures for
   any project, the "Where it landed" section is where they go.
3. **Client permission** for the named clients (Vistas, Sagitta, AOS).
4. **Your rate.** Deliberately not on the site. Your Upwork rate is $15/hr and
   the proposals in your resume are $3,500–$8,500; those two numbers tell very
   different stories to a buyer.

## Colour and type

Design tokens are the first block in `src/site.css`. The visual direction
follows the Gridly template: a flat near-black ground (#0F0F0F) with every
block drawn as a bento card — a 1px white-8% hairline, 30px radius, 20px
gutter — rather than a filled panel. Type is Inter throughout at weight 500,
with small letter-spaced uppercase eyebrows above the card titles.

### Changing the accent

Accent palettes live in `content.js`. Switch the whole site with one line:

```js
const activePalette = "blue";    // "blue" | "amber" | "red"
```

then `node build.js`. Each palette carries a dark and a light variant with
four roles: `accent` (fills), `text` (accent used as ink or a small mark —
darker in light mode so it stays readable), `ink` (what sits on the fill) and
`dim` (the tint behind live states). Adding a palette means adding one entry.

Blue is the current choice, and the two blue roles are deliberately different
values. `accent` (the fill: #1F5FD0 dark, #1B5FD9 light) is deep enough that
**white** ink passes AA on it — 5.8:1. `text` (#72A6FF dark, #14529E light) is
the accent used as ink or a small mark on the page background, so it goes the
other way: bright on the dark ground, dark on light cards.

This matters. An earlier pass used a brighter fill (#4D8DF7) with near-black
ink, which technically passed at 5.7:1 but read as muddy. White on that same
fill would have been *worse* — only 3.25:1, a fail. Deepening the fill is what
makes white work; swapping the ink alone does not. If you ever change the
accent, check both roles rather than picking one hex.

Borders, focus rings and the pipeline's live-state use `text`, not `accent`,
so they stay visible against the dark cards.

Contrast now: 5.8:1 white on the fill, 8.4:1 white on the featured tile's
gradient end, 7.9:1 accent text on the dark ground, 7.7:1 on light cards.
Buttons are weight 600 — small text on a colour fill needs it.

Trade-off worth knowing: GoHighLevel's own UI is blue, so the work screenshots
are full of blue and the featured tile sits next to them. If that section ever
feels flat, `amber` separates hardest from the screenshots.

The accent is used sparingly either way: one featured work tile, the result
tile, the primary button, and the highlighted half of the headline.

Light mode is not in the original template, so it is a built counterpart on
the same bones: white cards on #F1F1F1 and hairlines at black-10%.

Dark and light both ship. The toggle is in the header; with no choice saved the
site follows the visitor's system setting. The choice persists in
`localStorage`.

## Accessibility and motion

- Skip link, visible focus rings, real text everywhere (no text baked into images).
- Every diagram carries an `aria-label` describing what it shows.
- `prefers-reduced-motion` turns off the hero animation, the marquee and the
  scroll reveals.
