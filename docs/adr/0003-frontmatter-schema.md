# ADR-0003: One frontmatter schema

Date: 2026-09-24
Status: Accepted

## Context
AUTHORING required `metadata.portability`. Nine skills put `portability` at the top level. Spec validators reject unknown keys.

## Drivers
- Folder name equals `name`
- Description starts with a `use this` trigger
- House fields live under `metadata`

## Decision
Every SKILL.md uses:

```yaml
name: dashed-name
description: >-
  use this when …
license: MIT
metadata:
  portability: portable   # or claude-code
```

`python3 tools/validate.py` rejects drift.

## Consequences
Easier: one convention.
Forbidden: top-level `portability`.
