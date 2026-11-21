# HCT Color Kit

![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)

**Generate a complete, contrast-checked UI color system from one color or image.** It turns a seed into HCT tonal palettes, light and dark roles, CSS variables, and W3C design tokens through a CLI and an MCP server.

Home: `Thingscorp/skills`, folder `material-color-system`. This folder is the whole package: skill, CLI, MCP server, eval harness, and references in one place.

This is an independent project, not affiliated with, endorsed by, or sponsored by Google. Material Design is a trademark of Google LLC and is named here only to describe the design system whose published concepts this project implements. The engine is Google's Apache-2.0 `material-color-utilities` (the HCT color system). See [NOTICE](NOTICE).

## Quickstart

```bash
npm install
node scripts/color-kit.mjs --source '#6750A4' --format css
node scripts/color-kit.mjs --image photo.jpg
npm test
```

Image mode needs Python 3 with Pillow (`pip install Pillow`) for pixel sampling. `npm test` runs the eval harness; all 7 checks must pass.

First lines of real output for the seed above:

```css
:root {
  --md-sys-color-primary: #65558f;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-primary-container: #e9ddff;
  --md-sys-color-surface: #fdf7ff;
  --md-sys-color-on-surface: #1d1b20;
```

## Verified claims

Every claim below is backed by the eval harness in `eval/`, which you can run yourself (`npm test`). Full report: [eval/BASELINE.md](eval/BASELINE.md).

| Claim | Backing |
|---|---|
| The wrapper faithfully exposes the reference engine | Regression check: Eval M1 compares 240 role values across 20 seeds and both themes against direct `material-color-utilities` calls. This is wrapper fidelity, not independent color-science validation |
| Designed pairs meet WCAG thresholds on the tested seed set | Eval M2: all text pairs measure at least 4.5:1 and UI pairs at least 3:1 across 20 seeds in light and dark themes; worst text pair 6.42:1, worst UI pair 4.23:1 |
| Image mode surfaces the expected dominant color | Eval JA: the expected color ranked in Score's top three for 3/3 synthetic test images; real-photo ranking is not yet benchmarked |
| The audit pair checker catches broken pairs | Eval JB: 3/3 deliberately broken pairs flagged, 3/3 good pairs passed |
| Legacy rules are numerically faithful | Eval L1-L3: the M2 dark overlay formula reproduces published surfaces; Palette API target scoring matches the AOSP constants; state and disabled alphas match the spec tables |

## Install

Node 18+. The only npm dependency is `@material/material-color-utilities`. No API keys, no network calls in generation.

## Usage

Variants: `tonal-spot` (default), `vibrant`, `expressive`, `fidelity`, `content` (default for images), `fruit-salad`, `monochrome`, `neutral`, `rainbow`. Add `--contrast 0.5` or `1` for higher-contrast schemes. `--format json` (default) returns roles, tonal palettes, and measured contrast pairs; `--format tokens` returns W3C design tokens.

The MCP server (stdio) exposes `color_kit_from_source`, `color_kit_from_image`, `tonal_palette`, `harmonize`, `fix_contrast`, and `audit_palette`:

```bash
node mcp/server.mjs
```

Contracts in [mcp/SPEC.md](mcp/SPEC.md).

## Configuration

| Flag | Values | Default |
|---|---|---|
| `--source` | `#RRGGBB` | required unless `--image` |
| `--image` | image file path | required unless `--source` |
| `--variant` | the 9 variants above | `tonal-spot`, or `content` for images |
| `--contrast` | `-1` to `1` | `0` |
| `--format` | `json`, `css`, `tokens` | `json` |

Exit codes: 0 success, 2 usage error.

## API reference

The kit JSON carries `source`, `hct` (hue, chroma, tone of the seed), `palettes` (primary, secondary, tertiary, neutral, neutralVariant, error at tones 0 to 100), `schemes.light` and `schemes.dark` (36 roles each), and `contrastPairs` with measured WCAG ratios for the designed pairs. Entrypoint hashes for downstream pinning: [MANIFEST.sha256](MANIFEST.sha256).

## Integrations

- **shadcss / shadcn-style variable systems:** [integrations/shadcss](integrations/shadcss/README.md) maps kit roles onto `--background`, `--primary`, `--accent` and the rest, with a generator that emits a ready-to-drop theme file and a pre-generated example. A generated example theme also ships in `Thingscorp/shadcss-ui` under `themes/hct/`.

## For agents

Load `SKILL.md` in this folder as the skill root; its references resolve relative to it. Reference docs here: [core theory](references/core-theory.md), [roles and tokens](references/roles-and-tokens.md), [legacy rule sets](references/legacy-rule-sets.md), [the modern stack](references/modern-stack.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). The bar: no claim without a check in `eval/`, no hand-picked hex values in examples (generate them), no em-dashes in prose.

## License

MIT, see [LICENSE](LICENSE). This is an independent project, not affiliated with, endorsed by, or sponsored by Google. Material Design is a trademark of Google LLC and is named here only to describe the design system whose published concepts this project implements. The bundled engine, `@material/material-color-utilities`, is Apache-2.0 by Google; see [NOTICE](NOTICE).
