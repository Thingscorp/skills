# Roles and tone assignments

Tones are palette.tone. P = primary, S = secondary, T = tertiary, E = error, N = neutral, NV = neutral variant. 2021 spec values; the bundled script (MCU 0.3.0) is the authority when a value differs, and surface container tones follow the 2025 spec in newer MCU versions.

| Role | Light | Dark | Pair / use |
|---|---|---|---|
| primary | P40 | P80 | highest emphasis fill, text, icon on surface |
| onPrimary | P100 | P20 | text/icon on primary |
| primaryContainer | P90 | P30 | standout container, FAB |
| onPrimaryContainer | P30 (2025) / P10 (2021) | P90 | text/icon on primaryContainer |
| secondary | S40 | S80 | less prominent fills, selected states |
| onSecondary | S100 | S20 | |
| secondaryContainer | S90 | S30 | tonal buttons, chips |
| onSecondaryContainer | S30 / S10 (2021) | S90 | |
| tertiary | T40 | T80 | contrasting accent, badges |
| onTertiary | T100 | T20 | |
| tertiaryContainer | T90 | T30 | |
| onTertiaryContainer | T30 / T10 (2021) | T90 | |
| error | E40 | E80 | errors, destructive |
| onError | E100 | E20 | |
| errorContainer | E90 | E30 | |
| onErrorContainer | E30 / E10 (2021) | E90 | |
| surface | N98 | N6 | default background |
| onSurface | N10 | N90 | body text on any surface/container |
| onSurfaceVariant | NV30 | NV80 | secondary text, icons |
| surfaceVariant | NV90 | NV30 | differentiated surface (legacy role) |
| surfaceContainerLowest | N100 | N4 | nested / recessed |
| surfaceContainerLow | N96 | N10 | cards on surface |
| surfaceContainer | N94 | N12 | default container, nav |
| surfaceContainerHigh | N92 | N17 | dialogs, menus |
| surfaceContainerHighest | N90 | N22 | highest emphasis container |
| surfaceDim | N87 | N6 | dimmed background variant |
| surfaceBright | N98 | N24 | bright background variant |
| outline | NV50 | NV60 | important borders, dividers |
| outlineVariant | NV80 | NV30 | subtle borders |
| inverseSurface | N20 | N90 | snackbar, tooltip background |
| inverseOnSurface | N95 | N20 | text on inverseSurface |
| inversePrimary | P80 | P40 | action on inverseSurface |
| scrim, shadow | N0 | N0 | overlays |

Fixed roles (same in light/dark, for colors that must not shift): primaryFixed = P90, onPrimaryFixed = P10, primaryFixedDim = P80; same pattern for secondary and tertiary.

## Component defaults worth memorizing

Filled button: primary / onPrimary. Tonal button: secondaryContainer / onSecondaryContainer. FAB: primaryContainer / onPrimaryContainer. Chip selected: secondaryContainer. Card: surfaceContainerLow on surface. Nav bar: surfaceContainer. Dialog: surfaceContainerHigh. Text field container: surfaceContainerHighest. Snackbar: inverseSurface / inverseOnSurface / inversePrimary.

## Token tiers

Reference: `md.ref.palette.primary40`. System: `md.sys.color.primary` (CSS: `--md-sys-color-primary`). Component: `md.comp.filled-button.container.color`. In web projects without Material components, keep two tiers: palette variables (generated, never hand-edited) and semantic variables (the role names your components actually use).
