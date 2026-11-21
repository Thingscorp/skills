# MCP spec: material-color server

**Status: BUILT and proven over stdio (2026-11-21).** Implementation: `mcp/server.mjs`, zero deps beyond the skill's MCU install. Run: `node ~/workspace/custom-skills/material-color-system/mcp/server.mjs`. Verified live: initialize handshake, tools/list returns the implemented tools (audit_ui_colors stays a skill-side procedure, it needs the caller's eyes), fix_contrast and audit_palette returned correct measured results in the proof run.

A thin MCP wrapper over the bundled engine (`scripts/color-kit.mjs` logic, `@material/material-color-utilities`). Build it when an agent or app needs color as a callable tool rather than a chat skill. Same math, two surfaces: skill for judgment, MCP for execution.

## Tools

| Tool | Input | Output |
|---|---|---|
| `color_kit_from_source` | `{ source: hex, variant?: enum, contrast?: -1..1, spec?: "2021"\|"2025" }` | `{ hct, palettes{6 x 13 tones}, schemes{light,dark: role->hex}, contrastPairs[{pair, ratio}] }` |
| `color_kit_from_image` | `{ image: base64 or path, variant?: "content", candidates?: int }` | ranked source candidates (Score order) + kit for candidate 1 + kit per candidate on request |
| `tonal_palette` | `{ source: hex, hueShift?: deg, chroma?: number }` | one 13-tone ladder |
| `harmonize` | `{ color: hex, source: hex }` | harmonized hex (hue rotated toward source, half difference, max 15 deg) + a tonal palette for it |
| `fix_contrast` | `{ fg: hex, bg: hex, target?: 4.5 }` | closest same-hue/chroma fg at a tone meeting target, with measured ratio; places by tone delta, accepts by ratio |
| `audit_palette` | `{ colors: hex[], pairs?: [[fg,bg]...] }` | per-color HCT, nearest role guess, dislike flags, pair ratios, CVD collision warnings |
| `audit_ui_colors` | `{ screenshot: image }` | sampled colors clustered to roles, surface/accent area proportions, pairing violations with replacement hexes |

## Rules the server enforces (not the caller)

- No tool returns a palette without its measured pair ratios.
- `fix_contrast` never changes hue or chroma, only tone.
- Image tools return all ranked candidates; choosing silently for the user hides the one judgment call that matters.
- Every response carries `engine: "@material/material-color-utilities"` and the spec version, so a kit can be reproduced exactly later.

## Build notes

Node, official MCP SDK, stdio transport. Reuse the functions in `../scripts/color-kit.mjs`; image sampling via Pillow (`sample_pixels.py`) or `sharp` if the server must be Node-only. No network calls, no API key: the whole server is local math, which is the point. The 2017 Color Tool and Material Theme Builder were hosted tools that can disappear; an MCP server in the repo cannot.
