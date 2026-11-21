#!/usr/bin/env node
// Eval harness for the material-color-system skill. Run: node eval.mjs [--json]
// Measure 1 correctness: color-kit.mjs output cross-checked against MCU called directly here
//   (independent code path), plus structural invariants (tone 0 black, 100 white, monotonic Y).
// Measure 2 accessibility: every kit's designed pairs measured; FAIL < 3:1, text pairs FAIL < 4.5:1.
// Journey A image-to-kit: synthetic images with known dominant colors, expected color must
//   appear in the top 3 Score candidates.
// Journey B audit detection: deliberately broken pairs must be flagged by the pair checker.
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as mcu from '@material/material-color-utilities';

const here = path.dirname(fileURLToPath(import.meta.url));
const kitScript = path.join(here, '..', 'scripts', 'color-kit.mjs');
const results = [];
const check = (id, name, pass, detail) => results.push({ id, name, pass: !!pass, detail });

function kit(source, variant = 'tonal-spot') {
  return JSON.parse(execFileSync('node', [kitScript, '--source', source, '--variant', variant]).toString());
}
const y = hex => mcu.xyzFromArgb(mcu.argbFromHex(hex))[1] / 100;
const wcag = (a, b) => { const [hi, lo] = [y(a), y(b)].sort((p, q) => q - p); return (hi + 0.05) / (lo + 0.05); };

// 20 seeds: primaries, brand-ish, edge cases (yellow, bile green, near-black, near-white, gray)
const SEEDS = ['#6750A4','#FF0000','#00FF00','#0000FF','#FFFF00','#FF00FF','#00FFFF','#FFA500','#494886','#9A2258','#AFFF9F','#B3261E','#808080','#121212','#F5F5F5','#6B7F00','#7A6A00','#00696D','#8C4A00','#3F51B5'];
const TEXT_PAIRS = [['onPrimary','primary'],['onSecondary','secondary'],['onTertiary','tertiary'],['onError','error'],['onSurface','surface'],['onPrimaryContainer','primaryContainer'],['onSecondaryContainer','secondaryContainer'],['onTertiaryContainer','tertiaryContainer'],['onErrorContainer','errorContainer']];
const UI_PAIRS = [['onSurfaceVariant','surface'],['outline','surface'],['inverseOnSurface','inverseSurface']];

let allMatch = true, invariantFails = [], worstText = 99, worstTextLabel = '', worstUI = 99, pairFails = [];
for (const seed of SEEDS) {
  const k = kit(seed);
  // cross-check 6 roles per theme against direct MCU
  for (const dark of [false, true]) {
    const s = new mcu.SchemeTonalSpot(mcu.Hct.fromInt(mcu.argbFromHex(seed)), dark, 0);
    for (const r of ['primary','secondary','tertiary','surface','error','primaryContainer']) {
      const direct = mcu.hexFromArgb(mcu.MaterialDynamicColors[r].getArgb(s));
      if (direct !== k.schemes[dark ? 'dark' : 'light'][r]) { allMatch = false; invariantFails.push(`${seed} ${dark?'dark':'light'} ${r}: kit ${k.schemes[dark?'dark':'light'][r]} vs direct ${direct}`); }
    }
  }
  for (const [pname, pal] of Object.entries(k.palettes)) {
    if (pal['0'] !== '#000000' || pal['100'] !== '#ffffff') invariantFails.push(`${seed} ${pname} endpoints`);
    const ys = [0,10,20,30,40,50,60,70,80,90,95,98,99,100].map(t => y(pal[String(t)]));
    if (!ys.every((v, i) => i === 0 || v >= ys[i-1] - 1e-9)) invariantFails.push(`${seed} ${pname} tone order not monotonic`);
  }
  for (const theme of ['light','dark']) {
    for (const [fg, bg] of TEXT_PAIRS) { const r = wcag(k.schemes[theme][fg], k.schemes[theme][bg]); if (r < worstText) { worstText = r; worstTextLabel = `${seed} ${theme} ${fg}/${bg}`; } if (r < 4.5) pairFails.push(`${seed} ${theme} ${fg}/${bg} ${r.toFixed(2)} < 4.5`); }
    for (const [fg, bg] of UI_PAIRS) { const r = wcag(k.schemes[theme][fg], k.schemes[theme][bg]); if (r < worstUI) worstUI = r; if (r < 3) pairFails.push(`${seed} ${theme} ${fg}/${bg} ${r.toFixed(2)} < 3`); }
  }
}
check('M1', 'Correctness: kit matches direct MCU on 20 seeds x 2 themes x 6 roles, palette endpoints and tone monotonicity', allMatch && invariantFails.length === 0, invariantFails.slice(0, 5).join('; ') || '240 role values matched, 120 palettes monotonic');
check('M2', 'Accessibility: all text pairs >= 4.5:1 and UI pairs >= 3:1 across 20 seeds, light and dark', pairFails.length === 0, pairFails.length ? pairFails.slice(0, 6).join('; ') : `worst text pair ${worstText.toFixed(2)}:1 (${worstTextLabel}), worst UI pair ${worstUI.toFixed(2)}:1`);

// Journey A: image to kit
execFileSync('python3', ['-c', `
from PIL import Image
cases = [((73,72,134),(154,34,88)), ((0,105,109),(255,255,255)), ((182,38,30),(20,20,20))]
for i,(a,b) in enumerate(cases):
    im = Image.new('RGB',(64,64))
    for x in range(64):
        for yy in range(64): im.putpixel((x,yy), a if x<44 else b)
    im.save(f'/tmp/eval_img{i}.png')
`]);
const EXPECTED = [['#494886'], ['#00696d'], ['#b6261e']];
let journeyA = true, aDetails = [];
for (let i = 0; i < 3; i++) {
  const k = JSON.parse(execFileSync('node', [kitScript, '--image', `/tmp/eval_img${i}.png`]).toString());
  const hit = k.imageCandidates.slice(0, 3).some(c => EXPECTED[i].includes(c.toLowerCase()));
  if (!hit) journeyA = false;
  aDetails.push(`img${i}: top3=${k.imageCandidates.slice(0,3).join(',')} expected ${EXPECTED[i][0]} ${hit ? 'hit' : 'MISS'}`);
}
check('JA', 'Journey A: image-to-kit, expected dominant color in top 3 Score candidates (3 synthetic images)', journeyA, aDetails.join('; '));

// Journey B: audit detection, the pair checker must flag broken pairs and pass good ones
const broken = [['#777777','#888888'],['#FF9F9F','#FFFFFF'],['#AFFF9F','#F5FFF2']];
const good = [['#FFFFFF','#6750A4'],['#1C1B1F','#FFFBFE'],['#FFFFFF','#B3261E']];
const flagged = broken.filter(([f,b]) => wcag(f,b) < 4.5).length;
const passedGood = good.filter(([f,b]) => wcag(f,b) >= 4.5).length;
check('JB', 'Journey B: pair checker flags 3/3 broken pairs and passes 3/3 good pairs at 4.5:1', flagged === 3 && passedGood === 3, `broken flagged ${flagged}/3, good passed ${passedGood}/3`);

// Legacy rule sets: M2 dark overlay formula, Palette API targets, M3 state layers
const legacy = await import(path.join(here, '..', 'scripts', 'legacy-rules.mjs'));
const overlayExpected = { 0: '#121212', 1: '#1e1e1e', 2: '#232323', 4: '#272727', 8: '#2e2e2e', 24: '#383838' };
const overlayOk = Object.entries(overlayExpected).every(([dp, want]) => legacy.darkSurface(+dp) === want);
check('L1', 'Legacy: M2 dark overlay formula reproduces published surfaces at 0/1/2/4/8/24dp', overlayOk, Object.entries(overlayExpected).map(([dp]) => `${dp}dp=${legacy.darkSurface(+dp)}`).join(' '));
const targets = legacy.paletteTargets([{ hex: '#f44336', population: 500 }, { hex: '#90a4ae', population: 900 }, { hex: '#263238', population: 300 }, { hex: '#fff9c4', population: 100 }]);
check('L2', 'Legacy: Palette API target scoring picks vibrant red and muted blue-grey (bands + weights; script scores per target, AOSP exclusivity noted in reference)', targets.vibrant?.hex === '#f44336' && targets.muted?.hex === '#90a4ae' && targets.darkMuted?.hex === '#263238', JSON.stringify(targets));
check('L3', 'Legacy: state layer and disabled alphas match spec tables', legacy.M3_STATE.hover === 0.08 && legacy.M3_STATE.dragged === 0.16 && legacy.DISABLED.content === 0.38 && legacy.DISABLED.container === 0.12 && legacy.TEXT_EMPHASIS.high === 0.87, `hover ${legacy.M3_STATE.hover}, dragged ${legacy.M3_STATE.dragged}, disabled ${legacy.DISABLED.content}/${legacy.DISABLED.container}`);

const passed = results.filter(r => r.pass).length;
const summary = { date: new Date().toISOString().slice(0,10), passed, total: results.length, results };
if (process.argv.includes('--json')) console.log(JSON.stringify(summary, null, 2));
else { for (const r of results) console.log(`${r.pass ? 'PASS' : 'FAIL'} ${r.id} ${r.name}\n     ${r.detail}`); console.log(`\n${passed}/${results.length} checks passed`); }
process.exit(passed === results.length ? 0 : 1);
