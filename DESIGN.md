# Design notes

Visual language: dark showroom stages, light editorial sections, one yellow accent (`#ffc000`), hard edges, no rounded cards.

## Tokens

Defined in `css/tokens.css` — colors, Barlow Condensed type scale, 8px spacing grid.

## Surfaces

| Class | Use |
|-------|-----|
| `surface-dark` | Hero, footer, timeline blocks |
| `surface-white` | Main reading sections |
| `surface-marble` | Alternate light grey sections |

## Components

See `css/components.css` — navigation, tiles, article editorial layout, car specs, gallery lightbox, cult marquee.

## Typography

Headings and labels use uppercase condensed display type. Body copy on article and history pages uses normal sentence case (`text-transform: none` on editorial blocks).
