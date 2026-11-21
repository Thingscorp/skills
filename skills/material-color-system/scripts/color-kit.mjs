#!/usr/bin/env node
// Material Color System kit generator. Official engine: @material/material-color-utilities (HCT).
// Usage:
//   node color-kit.mjs --source #6750A4 [--variant tonal-spot] [--contrast 0] [--format json|css|tokens]
//   node color-kit.mjs --image photo.jpg [--variant content]   (needs python3+Pillow for pixel sampling)
// Variants: tonal-spot vibrant expressive fidelity content fruit-salad monochrome neutral rainbow
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as mcu from '@material/material-color-utilities';

const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, arr) => {
  if (v.startsWith('--')) a.push([v.slice(2), arr[i + 1]?.startsWith('--') ? 'true' : arr[i + 1]]);
  return a;
}, []));
const variantMap = {
  'tonal-spot': mcu.SchemeTonalSpot, 'vibrant': mcu.SchemeVibrant, 'expressive': mcu.SchemeExpressive,
  'fidelity': mcu.SchemeFidelity, 'content': mcu.SchemeContent, 'fruit-salad': mcu.SchemeFruitSalad,
  'monochrome': mcu.SchemeMonochrome, 'neutral': mcu.SchemeNeutral, 'rainbow': mcu.SchemeRainbow,
};
const ROLES = ['primary','onPrimary','primaryContainer','onPrimaryContainer','secondary','onSecondary','secondaryContainer','onSecondaryContainer','tertiary','onTertiary','tertiaryContainer','onTertiaryContainer','error','onError','errorContainer','onErrorContainer','surface','onSurface','onSurfaceVariant','surfaceVariant','surfaceContainerLowest','surfaceContainerLow','surfaceContainer','surfaceContainerHigh','surfaceContainerHighest','surfaceDim','surfaceBright','outline','outlineVariant','inverseSurface','inverseOnSurface','inversePrimary','scrim','shadow'];
const TONES = [0,10,20,30,40,50,60,70,80,90,95,98,99,100];
const hex = argb => mcu.hexFromArgb(argb);
const kebab = s => s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

function schemeFor(sourceArgb, variant, dark, contrast) {
  const Cls = variantMap[variant] || mcu.SchemeTonalSpot;
  return new Cls(mcu.Hct.fromInt(sourceArgb), dark, contrast);
}
function build(sourceArgb, variant, contrast) {
  const out = { source: hex(sourceArgb), variant, contrast, hct: (() => { const h = mcu.Hct.fromInt(sourceArgb); return { hue: +h.hue.toFixed(1), chroma: +h.chroma.toFixed(1), tone: +h.tone.toFixed(1) }; })(), palettes: {}, schemes: {}, contrastPairs: [] };
  for (const dark of [false, true]) {
    const s = schemeFor(sourceArgb, variant, dark, contrast);
    const name = dark ? 'dark' : 'light';
    out.schemes[name] = {};
    for (const r of ROLES) { try { out.schemes[name][r] = hex(mcu.MaterialDynamicColors[r].getArgb(s)); } catch {} }
    if (!dark) for (const [k, p] of Object.entries({ primary: s.primaryPalette, secondary: s.secondaryPalette, tertiary: s.tertiaryPalette, neutral: s.neutralPalette, neutralVariant: s.neutralVariantPalette, error: s.errorPalette })) {
      out.palettes[k] = Object.fromEntries(TONES.map(t => [t, hex(p.tone(t))]));
    }
    // verify the pairs the system promises, do not trust tone arithmetic alone
    const pairs = [['onPrimary','primary'],['onPrimaryContainer','primaryContainer'],['onSecondary','secondary'],['onTertiary','tertiary'],['onError','error'],['onSurface','surface'],['onSurfaceVariant','surface']];
    const wcag = (a, b) => { const y = x => mcu.xyzFromArgb(mcu.argbFromHex(x))[1] / 100; const [hi, lo] = [y(a), y(b)].sort((p, q) => q - p); return +(((hi + 0.05) / (lo + 0.05)).toFixed(2)); };
    for (const [fg, bg] of pairs) if (out.schemes[name][fg] && out.schemes[name][bg])
      out.contrastPairs.push({ theme: name, pair: `${fg}/${bg}`, ratio: wcag(out.schemes[name][fg], out.schemes[name][bg]) });
  }
  return out;
}
function sourceFromImage(file) {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const raw = execFileSync('python3', [path.join(here, 'sample_pixels.py'), file], { maxBuffer: 64 * 1024 * 1024 }).toString();
  const pixels = JSON.parse(raw);
  const quantized = mcu.QuantizerCelebi.quantize(pixels, 128);
  const ranked = mcu.Score.score(quantized, { desired: 4, fallbackColorArgb: 0xff4285f4, filter: true });
  return ranked; // ARGB ints, best first
}

export { build, sourceFromImage, schemeFor, ROLES, TONES, hex, mcu };

if (import.meta.url === `file://${process.argv[1]}`) {
  let sourceArgb, ranked;
  if (args.image) { ranked = sourceFromImage(args.image); sourceArgb = ranked[0]; }
  else if (args.source) sourceArgb = mcu.argbFromHex(args.source.replace(/^#?/, '#'));
  else { console.error('Give --source #RRGGBB or --image <file>'); process.exit(2); }

  const kit = build(sourceArgb, args.variant || (args.image ? 'content' : 'tonal-spot'), parseFloat(args.contrast || '0'));
  if (ranked) kit.imageCandidates = ranked.map(hex);
  const fmt = args.format || 'json';
  if (fmt === 'css') {
    for (const theme of ['light', 'dark']) {
      console.log(theme === 'dark' ? '\n[data-theme="dark"] {' : ':root {');
      for (const [k, v] of Object.entries(kit.schemes[theme])) console.log(`  --md-sys-color-${kebab(k)}: ${v};`);
      console.log('}');
    }
  } else if (fmt === 'tokens') {
    console.log(JSON.stringify({ color: Object.fromEntries(Object.entries(kit.schemes.light).map(([k, v]) => [k, { $value: v, $type: 'color' }])) }, null, 2));
  } else console.log(JSON.stringify(kit, null, 2));
}
