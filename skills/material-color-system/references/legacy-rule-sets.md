# Legacy rule sets: what the old generators actually encoded

Comprehensive capture from the pre-M3 and adjacent generator ecosystem. Each set states its source, its exact numbers, and whether it is superseded by HCT roles or still live as a rule. Executable versions of the starred sets live in `scripts/legacy-rules.mjs` and are covered by `eval/eval.mjs`.

## 1. The 2014 fixed palettes (Material Design 1)

19 families (Red, Pink, Purple, Deep Purple, Indigo, Blue, Light Blue, Cyan, Teal, Green, Light Green, Lime, Yellow, Amber, Orange, Deep Orange, Brown, Grey, Blue Grey). Chromatic families carry 14 steps: 50, 100, 200, 300, 400, **500 (the baseline, use as primary)**, 600, 700 (darker variant, status bar), 800, 900, plus accents A100, A200, A400, A700. Brown, Grey, Blue Grey have no accents. Swatches were published with black/white check marks: a white check means white text is legible on that step, a black check means black text is. Rule that survives: never use a step for text-bearing surfaces without its check, the palette itself is not contrast-safe (Yellow 500 on white fails badly).

## 2. M2 color system rules (m2.material.io/design/color/the-color-system)

- Theme = primary + optional secondary, each with light and dark variants. Primary is the most frequently displayed color; variants exist to distinguish two same-color elements (app bar vs system bar, FAB icon vs its container).
- Secondary is optional and applied sparingly: FABs, selection controls, selected text, progress, links, headlines. No secondary? Primary does accent duty alone.
- Non-brand roles are fixed in function: surface (cards, sheets, menus), background (behind scrollable content, baseline #FFFFFF), error (baseline #B00020).
- "On" colors default to pure #FFFFFF / #000000 picks in M2, chosen per surface for legibility. M3 replaces the binary pick with paired tones.
- Three tests for any color application, in order: **hierarchical** (important elements stand out most), **legible** (text and icons meet standards on colored backgrounds), **expressive** (brand shown at memorable moments, not everywhere).
- Alternative colors may theme sections or sibling apps, used cautiously: cohesion cost rises with each extra source.
- The M2 palette generator (the "Material palette generator" linked from this page) generated an expanded palette from a primary input, adjusting hue, chroma, and lightness, with analogous / complementary / triadic relations to the primary, plus lighter/darker accessibility variants. This is the direct ancestor of MCU variants: relation first, shades second.

## 3. M2 dark theme spec (m2.material.io/design/color/dark-theme) *

Four defining properties, all numeric:

- **Contrast floor:** dark surface vs 100% white text at least **15.8:1**, chosen so body text still passes 4.5:1 on the lightest elevated surface (24dp).
- **Base surface #121212**, dark grey, never pure black (black kills shadow perception and depth range; OLED true black is an explicit exception with a scroll-blur caution).
- **Depth by overlay:** white overlay on the surface color by elevation: 0dp 0%, 1dp 5%, 2dp 7%, 3dp 8%, 4dp 9%, 6dp 11%, 8dp 12%, 12dp 14%, 16dp 15%, 24dp 16%. Resulting greys by the formula: #121212, #1E1E1E, #232323, #252525, #272727, #2C2C2C, #2E2E2E, #333333, #363636, #383838. One known variance: Google's precomputed Android resource tables list 16dp as #343434, the formula gives #363636, a rounding difference in their resources. The formula is the authority. Overlays are **never** applied to primary/secondary colored surfaces, and shadows stay dark, no light glows.
- **Desaturation:** dark accents come from the **200 to 50** range of the family, not the saturated 500 to 900 range. Saturated color vibrates optically on dark and fails 4.5:1. Full-saturation brand color is allowed on at most **one or two** small elements (logo, one branded button).
- Baseline dark error **#CF6679**, made by lightening light-theme #B00020 with a 40% white overlay.
- Branded dark surface recipe: overlay primary at low opacity on #121212 (the spec's example: 8% baseline primary gives #1F1B24).
- Text on dark, by emphasis: high **87%** white, medium and hint **60%**, disabled **38%**. On light, the mirrored black alphas: 87 / 60 / 38, with secondary text often quoted at 54% in MD1-era text.
- App bars in dark theme take the dark surface, not primary. Bright colors are reserved for small surfaces.

M3 supersedes the overlay table with surfaceContainer tone steps, but the 15.8:1 floor, the desaturation rule, the 200-50 accent range, and the 87/60/38 emphasis alphas remain the fastest audit checks for any non-Material dark UI.

## 4. Android Palette API (2014, androidx.palette) *

The first image-to-UI generator most developers met. Modified median-cut quantization (ColorCutQuantizer) to at most 16 swatches from a downscaled bitmap, then six **targets** scored in HSL:

| Target | Luma band (min, target, max) | Saturation band |
|---|---|---|
| Vibrant | normal (0.30, 0.50, 0.70) | target 1.00, min 0.35 |
| LightVibrant | light (0.55, 0.74, 1.00) | vibrant |
| DarkVibrant | dark (0.00, 0.26, 0.45) | vibrant |
| Muted | normal | target 0.30, max 0.40 |
| LightMuted | light | muted |
| DarkMuted | dark | muted |

Score per target = weighted closeness: saturation weight 0.24, luma weight 0.52, population weight 0.24 (AOSP Target.java constants; some ports quote 3/6/1 normalized weights for the same shape). Outside the band is a hard exclusion, not a low score. A swatch serves one target exclusively by default. Default filter rejects near-black, near-white, and skin-line hues before scoring. Each swatch also computes its own title/body text colors by contrast. Lessons that carry into MCU Score: bands before ranking, population is the weakest weight, and a category may legitimately return nothing, so callers need a fallback chain (DarkVibrant, then MutedDark, then dominant, then default).

## 5. State layers and interaction alphas *

States are overlays of the **content (on) color** at fixed opacity, never new colors and never a darker shade of the container:

| Generation | Hover | Focus | Pressed | Dragged | Selected | Disabled content | Disabled container | Scrim |
|---|---|---|---|---|---|---|---|---|
| M3 (current spec) | 8% | 10% | 10% | 16% | (role swap) | 38% | 12% | 32% |
| M2 / MD1 era | 4 to 8% | 12% | 12 to 16% | 8% | 8 to 12% | 38% | 12% | 32% |

M2 values varied by component spec, which is exactly why M3 fixed one table. Rules common to both: a disabled element takes **no** state layer; the ripple uses the same alphas as the pressed/dragged layers; state color is always the element's content color, so states survive any scheme change.

## 6. Text and icon emphasis alphas (MD1/M2, still used in audits)

On light surfaces, black at: **87%** primary text, **54 to 60%** secondary text, **38%** disabled and hint, **12%** dividers. Icons: 54% active, 38% inactive on light; on dark, white 100/70/50 in MD1 icon spec, superseded by the 87/60/38 text table in M2 dark spec. Any audit that finds five different grays for secondary text has usually rediscovered these alphas as five accidents: collapse them to the table.

## 7. Adobe Leonardo (the contrast-first rival generator)

The other complete answer to the same problem, worth keeping beside HCT: a palette is defined by **key colors plus target contrast ratios against a named background**, not by tones. Ratios are the API (gray [2, 3, 4.5, 8], blue [3, 4.5]); interpolation between keys happens in a chosen perceptual space (LCH, Lab, OKLCH, CAM02, HSLuv); negative ratios generate lighter-than-background colors for dark themes; a theme is one BackgroundColor plus Colors, with global lightness, contrast multiplier, and saturation knobs, and WCAG2 or APCA (WCAG3) as the formula. Where it beats tone arithmetic: multi-brand systems where each hue must hit an exact ratio on an exact background, and data-viz scales with colorblind-safe cycling. Where HCT wins: whole-UI role systems and dark/light symmetry. The skill's fix_contrast follows Leonardo's principle inside the HCT world: define the target ratio, solve for the color, never eyeball it.

## 8. What the community generators converged on (2015 to today)

Independent reimplementations (Material Palette Generator, monsi-style tonal generators, Tailwind shade generators, PaletteBro, Culori/OKLCH tools) all converged on the same skeleton, which is the strongest evidence for the core rules: hold hue, sweep lightness in a perceptual space (Lab then, OKLCH/HCT now), damp chroma toward both extremes (the sin-curve / gamut shape), anchor the scale at the input as the 500 step, and treat contrast checking as a separate mandatory step after generation. Generators that varied saturation freely or swept in RGB/HSL are the ones whose output looked muddy, and they died out.
