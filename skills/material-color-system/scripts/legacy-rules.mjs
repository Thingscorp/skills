#!/usr/bin/env node
// Executable versions of the legacy rule sets in references/legacy-rule-sets.md.
// composite(fgHex, alpha, bgHex)          alpha-blend one color over another
// darkSurface(elevationDp)                M2 dark theme: #121212 + white overlay table -> hex
// paletteTarget(candidates)               Android Palette API targets (AOSP constants), HSL scoring
// stateLayer(contentHex, state, bgHex)    M3 state layer composite for hover/focus/pressed/dragged
const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const hexOf = ([r, g, b]) => '#' + [r, g, b].map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
export const composite = (fg, alpha, bg) => hexOf(rgb(fg).map((v, i) => v * alpha + rgb(bg)[i] * (1 - alpha)));

export const M2_OVERLAY = { 0: 0, 1: 0.05, 2: 0.07, 3: 0.08, 4: 0.09, 6: 0.11, 8: 0.12, 12: 0.14, 16: 0.15, 24: 0.16 };
export const darkSurface = dp => composite('#ffffff', M2_OVERLAY[dp] ?? 0, '#121212');

export const M3_STATE = { hover: 0.08, focus: 0.10, pressed: 0.10, dragged: 0.16 };
export const stateLayer = (content, state, container) => composite(content, M3_STATE[state], container);
export const DISABLED = { content: 0.38, container: 0.12 };
export const TEXT_EMPHASIS = { high: 0.87, medium: 0.60, disabled: 0.38, divider: 0.12 };

// Android Palette targets, AOSP Target.java: bands are hard exclusions, then
// score = 0.24*sat closeness + 0.52*luma closeness + 0.24*population share.
const LUMA = { dark: [0, 0.26, 0.45], normal: [0.30, 0.50, 0.70], light: [0.55, 0.74, 1] };
const SAT = { vibrant: [0.35, 1, 1], muted: [0, 0.30, 0.40] };
function hsl(hex) {
  const [r, g, b] = rgb(hex).map(v => v / 255), mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
  if (mx === mn) return [0, 0, l];
  const d = mx - mn, s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
  let h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, s, l];
}
export function paletteTargets(candidates) { // candidates: [{hex, population}]
  const maxPop = Math.max(...candidates.map(c => c.population));
  const out = {};
  for (const [name, [lt, st]] of Object.entries({ vibrant: ['normal', 'vibrant'], lightVibrant: ['light', 'vibrant'], darkVibrant: ['dark', 'vibrant'], muted: ['normal', 'muted'], lightMuted: ['light', 'muted'], darkMuted: ['dark', 'muted'] })) {
    let best = null;
    for (const c of candidates) {
      const [, s, l] = hsl(c.hex), [lmin, ltgt, lmax] = LUMA[lt], [smin, stgt, smax] = SAT[st];
      if (l < lmin || l > lmax || s < smin || s > smax) continue;
      const score = 0.24 * (1 - Math.abs(s - stgt)) + 0.52 * (1 - Math.abs(l - ltgt)) + 0.24 * (c.population / maxPop);
      if (!best || score > best.score) best = { hex: c.hex, score: +score.toFixed(3) };
    }
    if (best) out[name] = best;
  }
  return out;
}
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('dark surfaces', Object.fromEntries(Object.keys(M2_OVERLAY).map(dp => [dp + 'dp', darkSurface(+dp)])));
  console.log('state hover on primary container', stateLayer('#21005d', 'hover', '#eaddff'));
}
