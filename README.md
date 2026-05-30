Project: Oliver Hitchens — Static website

This repository contains a production-ready static website generated from the temporary `reference_material/` content.

Files of interest:
- site/: final static website ready for deployment
- site/assets/: CSS, JS and search index

How to preview locally:

1. Serve the `site/` directory with a simple HTTP server (Python 3):

```bash
python3 -m http.server --directory site 8000
# then open http://localhost:8000 in your browser
```

Deployment guidance:

- GitHub Pages (recommended):
  - Option A: Copy the contents of `site/` to the `docs/` folder in this repository and enable GitHub Pages to serve from `docs/` (main branch -> /docs).
  - Option B: Push the contents of `site/` to a `gh-pages` branch and enable Pages to serve from that branch.

- Cloudflare Pages:
  - Create a new Pages project and point the build output to the `site/` directory. Use a simple build command (none required) and set the build output directory to `/site`.

Notes:
- Favicon and logo are in `site/assets/images/logo_image.gif`.
- The search is client-side and uses `site/assets/search_index.json`.
- YouTube videos are lazy loaded: only thumbnails are loaded initially; an iframe is created when the user clicks Play.
