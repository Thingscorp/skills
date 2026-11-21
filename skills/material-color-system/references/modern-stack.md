# The modern stack: HCT rules on 2026 plumbing

How the old rules run today. The theory did not change; the delivery did.

## Pipeline

1. **Generate once, in HCT.** Source color or image → `scripts/color-kit.mjs` (MCU) → one kit JSON. Never generate shades in CSS, Sass functions, or HSL by hand downstream; downstream only transports the kit.
2. **Tokens are the single source of truth.** Export W3C Design Tokens (DTCG format, `$value`/`$type`, exactly what `--format tokens` emits). One tokens file per theme set, versioned with the code. Style Dictionary or a plain CSS emit turns tokens into each surface's format. A color that exists in a component but not in tokens is a bug.
3. **Web delivery.** CSS custom properties named by role (`--color-primary`, `--color-surface-container-high`), switched by `[data-theme]` or `color-scheme: light dark` with `@media (prefers-color-scheme)`. In Tailwind v4, declare the same vars in `@theme inline` so utilities resolve to roles, not hex. In shadcn-style systems (including shadcss), map roles onto the existing variable names once, in the theme file, never per component.
4. **Native delivery.** The same tokens emit Android Compose / SwiftUI / Flutter theme values. Android dynamic color (wallpaper-seeded) is this exact pipeline running on-device; if the app supports it, brand kit is the fallback seed, not a competing palette.

## Modern CSS that replaces old hand-rolled rules

- **State layers without new colors:** `background: color-mix(in srgb, var(--color-on-primary) 8%, var(--color-primary))` for hover, 10% focus/pressed, 16% dragged. The legacy alphas, one line, always in sync with the scheme.
- **Derived one-offs:** relative color syntax, `oklch(from var(--color-primary) calc(l - 0.1) c h)`, only for data-viz and gradients, never for role colors (roles come from the kit so contrast pairs stay verified).
- **Gradients in OKLCH**, never HSL: `linear-gradient(in oklch, ...)` kills the gray dead zone HSL gradients cross.
- **User preference media:** `prefers-contrast: more` swaps in the contrast +0.5 or +1.0 kit (generate it, do not approximate); `forced-colors: active` means stop painting backgrounds and let CanvasText/ButtonFace carry meaning, check nothing essential is color-only; `prefers-reduced-transparency` (where supported) replaces scrim-and-blur surfaces with solid surfaceContainer.
- **Wide gamut as enhancement only:** roles ship sRGB. An optional `@media (color-gamut: p3)` layer may raise chroma on brand moments with `color(display-p3 ...)`, and meaning must never depend on it, most screens in the world are still sRGB.

## The verification stack (all four, in order)

1. **WCAG ratio, measured** on every text pair (4.5 body, 3 large/UI). This is the legal and acceptance gate.
2. **APCA Lc as a second signal** (WCAG 3 draft, not a legal standard): catches pairs WCAG passes but humans read badly, especially light text on mid-tone color and dark-mode polarity errors. Report it, do not gate on it yet.
3. **Color vision deficiency simulation** on categorical colors (charts, status sets, avatar sets): deuteranopia, protanopia, tritanopia. Categories that collapse under simulation get a second channel (icon, label, position), never just a chroma bump.
4. **Forced-colors and dark-mode pass:** the UI must survive both with zero information loss. Dark mode is a second kit from the same seed, never an invert filter.

## Data visualization

- Categorical: take Score candidates or key colors, then run the CVD gate; Leonardo's rule applies, cycle hues for maximum simulated difference, minimum 3:1 against the chart background for marks that carry data alone.
- Sequential: one tonal palette, tone is the value axis (0 to 100 reads as magnitude in both themes if you reverse direction per theme).
- Diverging: two tonal palettes from two hues meeting at the neutral palette's mid tone.

## Runtime personalization

The kit is cheap to compute (MCU runs in browser via WASM/JS). The modern pattern Leonardo and Material You share: ship the generator, not just the palette, when users can theme. User picks one photo or one color, the whole role system follows, and accessibility survives because roles, not raw picks, touch text. This is the correct way to offer per-community or per-user theming without a contrast incident.

## Anti-patterns, modern edition

- Raw hex anywhere in a component file.
- Dark mode by `filter: invert`, by swapping to a hand-made second palette, or by opacity tricks on text.
- Opacity text (`color: rgb(0 0 0 / 60%)`) over photos or gradients: the background is unknown, so the ratio is unknown. Use a scrim at 32% plus a solid on-role, or place text on a surface.
- Generating a Tailwind-style 50 to 950 ramp and assigning roles by eye from it. Ramps are for charts and one-off fills; roles come from the scheme.
- APCA-only or WCAG-only sign-off. The stack is four checks, not one.
