# Framework glossary — single source of truth

Core skills are self-contained (they install standalone), so each one restates
the figures it needs. This file is the **canonical definition** those
restatements must match. `tools/validate.py` checks core skills against it —
if you change a figure here, update every core skill that quotes it.

## Smart zone / dumb zone

- **Smart zone** = the early part of a context window where the model still
  does hard reasoning well.
- **Dumb-zone onset** ≈ **150,000 tokens** (working figure; a slope, not a
  cliff). Older recordings sometimes cite ~100–120k; models advertise ~1M.
- Past ~150k mid-task: **bail / change approach** — handoff, compact with a
  one-line focus to finish a thin slice, or otherwise re-enter the smart
  zone. Never "just continue" grinding hard work.

## Primary vs secondary source

- **Primary source** = the live session — full grilled/implementation
  reasoning, everyone "in the room."
- **Secondary source** = a summary after compact or a handoff doc — a
  **lossy historian**. Useful for maneuverability; always drops some *why*.

## Phase-boundary decision tree (ordered)

1. **Continue?** Still in smart zone *and* the primary context is still
   needed → continue.
2. Else if next context is **irrelevant** → **clear** (cheapest; most room).
3. Else if work crosses **agent / directory / person** → **handoff**.
4. Else if the next chunk runs **AFK** (no human) → **subagent**.
5. Else → **compact** with a one-sentence focus (residual default;
   implement→QA is the cast-iron case).

"Review" walks the tree: same-agent QA → compact; AFK automated review →
subagent; cross-agent/person → handoff. Never outsource mid-phase boundaries
to auto-compaction — mid-phase auto-compact is dangerous.

## Spec lifetime

- Specs and tickets live in the **issue tracker** (GitHub Issues, Linear,
  …), **outside the repo**. Never commit living `SPEC.md` into the codebase.
- **Archive, don't delete** specs when code ships. Code is primary; dense
  outdated specs drift and agents trust them over code.

## Install namespacing

Skill directories use plain names (`compact`, `handoff`, …). When installing
into a harness, namespace them only if the dest already has a collision.
The default install is `npx skills add Thingscorp/skills`.
