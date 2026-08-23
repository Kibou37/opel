# OPEL — Digital Museum

Private static website dedicated to Opel automobiles produced **before 2007**.

English only. No installer. No admin panel. No internet required for browsing (fonts load from Google when online; system fonts are used as fallback).

## How to open (for the owner)

1. Open the project folder.
2. Double-click **`Open site.bat`**  
   — or open **`index.html`** in Chrome / Edge / Firefox.

That is all.

## What’s included

| Section | Path |
|---------|------|
| Home | `index.html` |
| Collection + search | `pages/collection.html` |
| Car page | `pages/car.html?id=kadett-c` |
| History of Opel | `pages/history.html` |
| Timeline | `pages/timeline.html` |
| World of Opel | `pages/world/index.html` |
| Gallery | `pages/gallery.html` |
| About | `pages/about.html` |

## How to add content

Edit **`js/data.js`**:

- **Cars** → `cars` array  
- **Articles** → `articles` array (+ categories in `worldCategories`)  
- **Timeline** → `timeline` array  
- **History / About** → `history` / `about` objects  

### Photos

1. Put images in `media/cars/` (example: `media/cars/kadett-c/hero.jpg`).
2. Set `"image": "media/cars/kadett-c/hero.jpg"` on the car object.
3. For gallery items, add paths later the same way.

### Engine sounds

1. Put MP3 files in `media/sounds/`.
2. Point each engine’s `sound` field to that file.
3. On the car page: **hover** the engine card for animation + hint; **click** to play sound.

## Design

Visual language inspired by premium automotive showrooms (dark / light stages, uppercase condensed typography, single yellow accent, hard edges). See `DESIGN.md`.

## Notes

- Search works by model name, generation, and year — without page reload.
- Placeholders stand in until real photos arrive.
- Non-commercial personal collection.

## GitHub Pages

Repository: [github.com/Kibou37/opel](https://github.com/Kibou37/opel)

Live site (after Pages is enabled): **https://kibou37.github.io/opel/**

### One-time setup in GitHub

1. Open **Settings → Pages** in the repository.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Wait for the workflow **Deploy GitHub Pages** to finish (Actions tab).
4. Open the site URL above.

Each push to `main` redeploys the site automatically.
