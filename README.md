# OPEL — Digital Museum

Static site about Opel automobiles produced **before 2007**. English only.

## Open locally

Double-click **`Open site.bat`** or open **`index.html`** in a browser.

## Structure

| Section | File |
|---------|------|
| Home | `index.html` |
| Collection | `pages/collection.html` |
| Car page | `pages/car.html?id=…` |
| History | `pages/history.html` |
| Timeline | `pages/timeline.html` |
| World of Opel | `pages/world/index.html` |
| Gallery | `pages/gallery.html` |
| About | `pages/about.html` |

## Content files (`js/`)

| File | Contents |
|------|----------|
| `data.js` | Cars, articles, timeline, site config |
| `car-content-patches.js` | Car page copy |
| `opc-article-patches.js` | OPC articles |
| `concepts-article-patches.js` | Concept car articles |
| `site-content-patches.js` | History, about, rare/motorsport/facts articles |
| `site-content-images.js` | History/timeline/article images |
| `pages.js` | Page rendering |
| `app.js` | Header, footer, search |

## Media

- Car photos → `media/cars/<id>/hero.jpg`
- Engine sounds → `media/sounds/*.mp3` (set `sound` on each engine in data)
- Photo sources → `media/CREDITS.md`

## Design

See `DESIGN.md` and `css/tokens.css`.

## GitHub Pages

Live: **https://kibou37.github.io/opel/** — deploys from `main` via GitHub Actions.
