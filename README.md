# Joseph Akintayo — portfolio site

**Live:** https://shollyjay.github.io/joseph-akintayo-portfolio/

Static site. No framework, no build dependencies, no npm install. Node is used
only to stamp out the pages from one content file.

## Structure

```
content.js          every word on the site — edit this, not the HTML
src/site.css        all styling (design tokens live at the top)
src/site.js         theme toggle, scroll reveals, hero pipeline animation
src/schematics.js   the seven case-study diagrams (inline SVG)
assets/             the two portraits
build.js            assembles docs/
docs/               the finished site — this is what you deploy
```

## Rebuild after an edit

```bash
node build.js
```

That regenerates `docs/index.html` and `docs/work/*.html`.

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

`docs/` is a complete, self-contained static site — `index.html` and the case
study pages are all full HTML documents, and every asset is local. No build
step is needed on the host.

**Netlify Drop** (fastest, no account needed to preview): drag the `docs`
folder onto <https://app.netlify.com/drop>. You get a live URL immediately.

**GitHub Pages**: Settings → Pages → Source: *Deploy from a branch*, branch
`main`, folder `/docs`. (Pages only serves the repo root or `/docs`, which is
why the build output is named `docs/` rather than `dist/` — it is the site,
not documentation.) The site appears at
`https://<username>.github.io/<repo>/` within a minute or two. Naming the repo
`<username>.github.io` instead serves it at the root domain.

**Vercel / Cloudflare Pages**: point either at the repo with no build command
and `docs` as the output directory.

A custom domain is a CNAME at whichever host you pick; GitHub Pages also wants
a `CNAME` file in `docs/` containing the bare domain.

### Two homepage builds

`build.js` writes the homepage twice from the same source:

- `docs/index.html` — a complete document with doctype, charset, viewport and
  Open Graph meta. **This is the one you host.**
- `.artifact/index.html` — the same page as a bare fragment, for the Claude
  artifact host, which supplies its own wrapper. Git-ignored; never deploy it.

The case study pages under `docs/work/` are complete documents in both cases.
