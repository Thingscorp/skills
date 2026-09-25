# ADR-0002: Harness-neutral core, one named adapter

Date: 2026-09-24
Status: Superseded by ADR-0007

## Context
README claims any harness that loads SKILL.md. A Claude-first public description and missing harness-matrix files contradicted that.

## Drivers
- Portable doctrine must not name a vendor command as the only path
- One tested adapter is allowed if it is labeled as such
- Do not claim a matrix we will not maintain

## Decision
Core skills are harness-neutral. The only adapter in this repo is `claude-code-habits`. There is no `docs/HARNESS-MATRIX.md` and no `harness/` tree. Supported install paths are `npx skills` and `gh skill`.

## Consequences
Easier: one position across README, AGENTS.md, plugin description.
Forbidden: documenting Claude marketplace as the primary install; pointing at missing adapter files.
