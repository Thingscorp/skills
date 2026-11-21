# Core theory: three-pass synthesis

## Pass 1: the surface system (what M3 documents)

Source -> key colors -> tonal palettes -> roles -> UI. Roles are paint-by-number numbers; elements keep their role assignment forever, schemes change underneath them. Light and dark are two tone maps over the same palettes. Contrast levels (standard / medium / high) are a third map. Customization happens at exactly three points: choose the source, remap a role to an element, add harmonized custom colors. Everything else is generated.

## Pass 2: the machinery underneath (MCU)

- **HCT** = CAM16 hue + CAM16 chroma + CIELAB L* as tone. CAM16 gives hue linearity (equal hue steps look equal) that HSL lacks; L* gives perceptual lightness, so tone differences predict contrast: delta 40 guarantees at least 3:1, delta 50 about 4.5:1. Caveat found in independent testing: delta 50's worst case is 4.478:1 at the light end, so place by delta, accept by measured ratio.
- **TonalPalette solving**: for a requested (hue, chroma, tone), HctSolver finds the sRGB color; out-of-gamut requests return the max-chroma in-gamut color at that tone. Palettes therefore bend chroma down near tone 0 and 100 automatically.
- **Quantization (image -> colors)**: QuantizerCelebi = Wu quantizer seeds + weighted k-means (Wsmeans) in Lab, dedup and triangle-inequality optimizations. Output is a color-to-population map, max ~128 clusters.
- **Score (colors -> source)**: filters unsuitable colors (population share, tone extremes, chroma floor), then ranks by proportion excited by the color, chroma distance from target (~48), and hue scoring. This is why wallpaper extraction picks a usable theme color instead of the statistically dominant muddy average.
- **Variants are palette recipes**: each Scheme* class is just different (hue rotation, chroma cap) tuples for the six palettes. TonalSpot: primary chroma min(source,36), secondary 16, tertiary hue+60 chroma 24, neutral 6, neutralVariant 8. Vibrant raises caps; Expressive/FruitSalad/Rainbow rotate hues away from source; Fidelity/Content preserve source tone/chroma and place the source itself in primaryContainer.
- **DynamicColor / MaterialDynamicColors**: roles are functions of (scheme, dark, contrastLevel), with ContrastCurve and ToneDeltaPair constraints, so a role's tone shifts as contrast level rises while its pair relationship holds. Spec versions 2021 / 2025 exist; pin one per project.
- **Blend.harmonize**: hue rotation toward source, half the angular difference, max 15 degrees, in HCT. Also harmonizeDesignColor and CAM16-UCS blending for mixing two colors perceptually evenly.
- **DislikeAnalyzer**: dark, high-chroma yellow-greens (the "bile zone") are near-universally disliked; fix is raising tone until acceptable.
- **TemperatureCache**: complementary, analogous, and temperature (warm/cool) relationships computed in HCT for chart and multi-hue work.

## Pass 3: what the old layers teach, and what to keep

- 2014: color as a fixed library (19 families x 50-900 + A-accents). Lesson that survives: a ramp, not a swatch. Every color you ship needs its ladder, because states, containers, and dark mode all live on the ladder.
- 2017 Color Tool: primary + secondary + variants, previewed on real components, with WCAG legibility printed next to every pair. Lesson: never present a palette without its pair ratios and a component preview. The audit mode in the skill is this tool, rebuilt for agents.
- 2021 Material You / Monet: the source moves from designer to user content (wallpaper). Lesson: extraction quality is a ranking problem (Score), not an average. Averaging an image gives mud; quantize, filter, rank.
- What "just worked" was never the hues. It was three invariants: (1) relationships defined in a perceptual space, so they survive hue swaps; (2) roles fixed by tone, so light/dark/contrast are free; (3) neutrals derived from the source, so the whole UI shares one DNA. Any modern system (Tailwind, shadcn, custom CSS) can hold these invariants without adopting Material components: generate the palettes with MCU, map roles to your own token names, keep the tone assignments.
- Modern extension beyond Material: pair HCT kits with OKLCH for gradients (interpolate in OKLCH/HCT, never RGB), APCA as a second contrast opinion for text-heavy surfaces, and color-vision-deficiency simulation for categorical/chart palettes. These complement, never replace, the tone system.
