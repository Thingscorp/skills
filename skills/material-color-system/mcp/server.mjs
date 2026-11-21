#!/usr/bin/env node
// Material Color System MCP server (stdio, JSON-RPC, zero extra deps beyond the skill's MCU install).
// Tools: color_kit_from_source, color_kit_from_image, tonal_palette, harmonize, fix_contrast, audit_palette.
// Run: node server.mjs   (point any MCP client at this command, cwd = this folder's parent skill dir)
import { createInterface } from 'node:readline';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, sourceFromImage, mcu } from '../scripts/color-kit.mjs';
import { paletteTargets, darkSurface, stateLayer } from '../scripts/legacy-rules.mjs';

const hexOf = a => mcu.hexFromArgb(a);
const argb = h => mcu.argbFromHex(h.replace(/^#?/, '#'));
const wcag = (a, b) => { const y = x => mcu.xyzFromArgb(argb(x))[1] / 100; const [hi, lo] = [y(a), y(b)].sort((p, q) => q - p); return +(((hi + 0.05) / (lo + 0.05)).toFixed(2)); };

const TOOLS = [
  { name: 'color_kit_from_source', description: 'Full light+dark role kit from one source hex (MCU HCT schemes).', inputSchema: { type: 'object', properties: { source: { type: 'string' }, variant: { type: 'string' }, contrast: { type: 'number' } }, required: ['source'] } },
  { name: 'color_kit_from_image', description: 'Score-ranked candidates from an image, plus a content-variant kit from the top candidate.', inputSchema: { type: 'object', properties: { imagePath: { type: 'string' } }, required: ['imagePath'] } },
  { name: 'tonal_palette', description: 'One tonal palette (tones 0-100) for a hex.', inputSchema: { type: 'object', properties: { source: { type: 'string' } }, required: ['source'] } },
  { name: 'harmonize', description: 'Rotate a design color hue toward a source hue in HCT when within 15-180 degrees (Material harmonization).', inputSchema: { type: 'object', properties: { design: { type: 'string' }, source: { type: 'string' } }, required: ['design', 'source'] } },
  { name: 'fix_contrast', description: 'Walk a foreground color tone in HCT until it meets a target WCAG ratio against a background.', inputSchema: { type: 'object', properties: { fg: { type: 'string' }, bg: { type: 'string' }, target: { type: 'number' } }, required: ['fg', 'bg'] } },
  { name: 'audit_palette', description: 'Check fg/bg pairs against a target ratio; also returns Palette-API targets for a candidate list and M2 dark surfaces on request.', inputSchema: { type: 'object', properties: { pairs: { type: 'array', items: { type: 'object', properties: { fg: { type: 'string' }, bg: { type: 'string' }, target: { type: 'number' } } } } }, required: ['pairs'] } },
];

function call(name, a) {
  switch (name) {
    case 'color_kit_from_source': return build(argb(a.source), a.variant || 'tonal-spot', a.contrast || 0);
    case 'color_kit_from_image': { const ranked = sourceFromImage(a.imagePath); const kit = build(ranked[0], 'content', 0); kit.imageCandidates = ranked.map(hexOf); return kit; }
    case 'tonal_palette': { const h = mcu.Hct.fromInt(argb(a.source)); const p = new mcu.TonalPalette(h.hue, Math.max(h.chroma, 1)); return Object.fromEntries([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100].map(t => [t, hexOf(p.tone(t))])); }
    case 'harmonize': { const d = mcu.Hct.fromInt(argb(a.design)), s = mcu.Hct.fromInt(argb(a.source)); const diff = Math.abs(((d.hue - s.hue + 540) % 360) - 180); const dist = 180 - diff; if (dist < 15 || dist > 180) return { result: a.design, rotated: 0, note: 'outside harmonize window' }; const dir = ((s.hue - d.hue + 540) % 360) - 180 > 0 ? 1 : -1; const rot = Math.min(dist * 0.5, 15); const out = mcu.Hct.from(d.hue + dir * rot, d.chroma, d.tone); return { result: hexOf(out.toInt()), rotated: +rot.toFixed(1) }; }
    case 'fix_contrast': { const target = a.target || 4.5; let h = mcu.Hct.fromInt(argb(a.fg)); const bgY = mcu.xyzFromArgb(argb(a.bg))[1] / 100; const dir = bgY > 0.18 ? -1 : 1; for (let i = 0; i <= 100; i++) { const cand = mcu.Hct.from(h.hue, h.chroma, Math.max(0, Math.min(100, h.tone + dir * i))); const hx = hexOf(cand.toInt()); if (wcag(hx, a.bg) >= target) return { result: hx, ratio: wcag(hx, a.bg), tone: Math.round(cand.tone) }; } return { result: null, note: 'unreachable at this hue/chroma' }; }
    case 'audit_palette': return { pairs: a.pairs.map(p => ({ ...p, ratio: wcag(p.fg, p.bg), pass: wcag(p.fg, p.bg) >= (p.target || 4.5) })), darkSurfaces: Object.fromEntries([0, 1, 4, 8, 24].map(dp => [dp + 'dp', darkSurface(dp)])) };
    default: throw new Error('unknown tool ' + name);
  }
}

const send = obj => process.stdout.write(JSON.stringify(obj) + '\n');
createInterface({ input: process.stdin }).on('line', line => {
  if (!line.trim()) return;
  let msg; try { msg = JSON.parse(line); } catch { return; }
  const { id, method, params } = msg;
  if (method === 'initialize') return send({ jsonrpc: '2.0', id, result: { protocolVersion: '2024-11-05', capabilities: { tools: {} }, serverInfo: { name: 'material-color-system', version: '1.0.0' } } });
  if (method === 'notifications/initialized') return;
  if (method === 'tools/list') return send({ jsonrpc: '2.0', id, result: { tools: TOOLS } });
  if (method === 'tools/call') {
    try { const r = call(params.name, params.arguments || {}); return send({ jsonrpc: '2.0', id, result: { content: [{ type: 'text', text: JSON.stringify(r) }] } }); }
    catch (e) { return send({ jsonrpc: '2.0', id, result: { isError: true, content: [{ type: 'text', text: String(e.message || e) }] } }); }
  }
  if (id !== undefined) send({ jsonrpc: '2.0', id, error: { code: -32601, message: 'method not found: ' + method } });
});
