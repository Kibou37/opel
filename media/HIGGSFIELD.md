# Higgsfield — style pass for OPEL museum photos

Goal: restyle each `hero-source.jpg` into a **cinematic automotive showroom** look that matches `DESIGN.md`:

- dark stage / matte black background
- single car under spotlight
- high-contrast product photography
- no rounded crop, full vehicle visible
- gallery-grade restraint (not neon, not cyberpunk)

## Blocker right now

Cursor MCP server **`user-magic`** (Higgsfield) is **not authenticated** — auth requests timed out.
Please connect it in Cursor (MCP / Magic → Sign in), then tell me **«Higgsfield готов»** and I will run the image-to-image pass from here.

## Until MCP works — manual on higgsfield.ai

1. Open [higgsfield.ai/soul](https://higgsfield.ai/soul) (Image to Image / Soul).
2. Upload `media/cars/<id>/hero-source.jpg`.
3. Use the prompt below (same for all cars; change only the model name).
4. Prefer style presets close to: **Spotlight**, **Movie**, **Quiet luxury**, **Gallery**, **Night rider**.
5. Keep strength moderate (~0.45–0.65) so the real car shape stays recognizable.
6. Download result → save as `media/cars/<id>/hero.jpg` (overwrite web version).

### Master prompt (EN)

```text
Photorealistic automotive museum hero photograph of an Opel [MODEL NAME],
full car visible, three-quarter front view preferred,
matte black showroom stage, soft overhead spotlight,
cinematic low-key lighting, deep charcoal background,
premium product photography, hard-edged composition,
no text, no logo overlays, no people, no reflections of photographer,
shot on medium format, shallow atmospheric haze, gallery exhibition mood
```

### Negative / avoid

```text
cartoon, illustration, neon lights, cyberpunk, heavy motion blur,
warped body panels, wrong badges, extra wheels, watermark, UI chrome
```

## Cars to process

| Folder | Model line for prompt |
|--------|------------------------|
| `kadett-c` | Opel Kadett C |
| `astra-f` | Opel Astra F |
| `omega-a` | Opel Omega A |
| `calibra` | Opel Calibra |
| `manta-b` | Opel Manta B |
| `senator-a` | Opel Senator |

After files are replaced, refresh the site — paths in `js/data.js` already point to `media/cars/<id>/hero.jpg`.
