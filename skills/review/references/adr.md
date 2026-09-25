# ADR template (Nygard, short)

Use from the `review` skill. One decision per file.
Path: `docs/adr/NNNN-short-slug.md`

```markdown
# ADR-NNNN: <decision in one line>

Date: YYYY-MM-DD
Status: Proposed

## Context
What forced the call. Neutral. Tensions, not a pitch.

## Decision
What we will do from now on.

## Consequences
Easier: …
Forbidden: …

## Supersedes
ADR-NNNN
```

Status values: `Proposed` | `Accepted` | `Rejected` | `Deprecated` | `Superseded by ADR-NNNN`.

Lifecycle: Proposed → Accepted → Deprecated or Superseded.
Accepted body does not change. New conclusion = new numbered file that
points at the old one. Never delete.
