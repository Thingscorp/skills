# ADR template

Use this only when the review skill says **capture**. One decision per file.

Path: `docs/adr/NNNN-short-slug.md` (next free number in that directory).

```markdown
# NNNN. <decision in one line>

**Date** YYYY-MM-DD
**Status** accepted | superseded by NNNN

## Context
What problem, constraint, or fork forced a choice.

## Decision
What we will do. One sentence if it fits.

## Consequences
What becomes easier, what becomes harder, what is now out of bounds.
```

Rules:

- Write it when the decision is made, not weeks later.
- Short. If it needs a design doc, it is not an ADR.
- Supersede with a new file. Do not edit history except to point Status at the successor.
- Adopt/skip a library is an ADR. A missing assertion is not.
