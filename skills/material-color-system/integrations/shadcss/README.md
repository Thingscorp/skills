# shadcss integration

shadcss (and shadcn-style systems) theme components through a fixed set of CSS variables. This integration maps the kit's roles onto those variables once, so a generated kit becomes a drop-in theme. The generator stays in this repo; shadcss keeps its zero-runtime design and consumes only the emitted CSS.

## Generate a theme

```bash
node generate-theme.mjs --source '#6750A4' > theme.css
```

Output is a `:root` block (light) and a `.dark` block with the 19 standard variables: background, foreground, card, popover, primary, secondary, muted, accent, destructive (each with its `-foreground`), border, input, ring.

## Role mapping

| Variable | Kit role | Why |
|---|---|---|
| `--background` | surface | the canvas role |
| `--foreground` | onSurface | paired text tone, contrast-verified against surface |
| `--card`, `--popover` | surfaceContainerLow | one step above the canvas, same in both systems |
| `--primary`, `--ring` | primary | the action color |
| `--primary-foreground` | onPrimary | verified pair |
| `--secondary` | secondaryContainer | shadcn secondary is a quiet fill, the container tone matches that job |
| `--accent` | tertiaryContainer | accent is a hover/quiet fill, not the raw tertiary |
| `--muted` | surfaceVariant | the neutral quiet fill |
| `--destructive` | error | with onError as its foreground |

Every foreground/background pair in the emitted file is one of the kit's designed pairs, so the contrast verification in `eval/` covers this theme too.

## Example

`example-theme.css` in this folder is generated from the default seed `#6750A4`, unedited, by the command above. Regenerate it whenever the mapping changes; never hand-edit its values. If a shipped example ever differs from fresh generator output, the example is wrong.
