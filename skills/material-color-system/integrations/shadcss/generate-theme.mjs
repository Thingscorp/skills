#!/usr/bin/env node
// Emit a shadcss / shadcn-style theme file from a source color, using the kit engine.
// Usage: node generate-theme.mjs --source '#6750A4' [--variant tonal-spot] > theme.css
// Mapping (kit role -> variable): primary->--primary, onPrimary->--primary-foreground,
// secondaryContainer->--secondary, onSecondaryContainer->--secondary-foreground,
// tertiaryContainer->--accent, onTertiaryContainer->--accent-foreground,
// error->--destructive, onError->--destructive-foreground, surface->--background,
// onSurface->--foreground, surfaceContainerLow->--card, onSurface->--card-foreground,
// surfaceContainerLow->--popover, onSurface->--popover-foreground,
// surfaceVariant->--muted, onSurfaceVariant->--muted-foreground,
// outline->--border, surfaceVariant->--input, primary->--ring
import { build, mcu } from '../../scripts/color-kit.mjs';
const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, arr) => { if (v.startsWith('--')) a.push([v.slice(2), arr[i + 1]]); return a; }, []));
if (!args.source) { console.error('Give --source #RRGGBB'); process.exit(2); }
const kit = build(mcu.argbFromHex(args.source.replace(/^#?/, '#')), args.variant || 'tonal-spot', 0);
const MAP = [['background', 'surface'], ['foreground', 'onSurface'], ['card', 'surfaceContainerLow'], ['card-foreground', 'onSurface'], ['popover', 'surfaceContainerLow'], ['popover-foreground', 'onSurface'], ['primary', 'primary'], ['primary-foreground', 'onPrimary'], ['secondary', 'secondaryContainer'], ['secondary-foreground', 'onSecondaryContainer'], ['muted', 'surfaceVariant'], ['muted-foreground', 'onSurfaceVariant'], ['accent', 'tertiaryContainer'], ['accent-foreground', 'onTertiaryContainer'], ['destructive', 'error'], ['destructive-foreground', 'onError'], ['border', 'outlineVariant'], ['input', 'outlineVariant'], ['ring', 'primary']];
for (const theme of ['light', 'dark']) {
  console.log(theme === 'dark' ? '.dark {' : ':root {');
  for (const [v, role] of MAP) console.log(`  --${v}: ${kit.schemes[theme][role]};`);
  console.log('}');
}
