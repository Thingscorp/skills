# ADR template (Nygard-short)

Use from the `review` skill. One decision per file.
Path: `docs/adr/NNNN-short-slug.md`

```markdown
# ADR-NNNN: <decision in one line>

Date: YYYY-MM-DD
Status: Proposed

## Context
What forced the call. Neutral. Tensions, not a pitch.

## Options considered
- A — why it lost or won
- B — …

## Decision
What we will do from now on.

## Consequences
Easier: …
Forbidden: …

## Confirmation
One check a later agent can run.

## Supersedes
ADR-NNNN
```

Omit Options / Confirmation / Supersedes when empty.

Status: `Proposed` | `Accepted` | `Rejected` | `Deprecated` | `Superseded by ADR-NNNN`.

## Supersede vs deprecate

- Same question, new answer → new file + old Status `Superseded by ADR-M`.
- Question gone → old Status `Deprecated`. No replacement file.
- Proposal died → `Rejected`. Keep the file.

Two-file commit after owner accepts:
1. ADR-M Accepted, `Supersedes: ADR-N`.
2. ADR-N Status line only → `Superseded by ADR-M`.

Accepted body does not change. Never delete. Date is the decision date.
Do not adopt full MADR (YAML RACI, per-option Good/Bad matrices) unless
the owner asked for an audit-grade comparison.
