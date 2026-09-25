# ADR template (Nygard short)

Use from the `review` skill. One decision per file.
Path: `docs/adr/NNNN-short-slug.md`. `NNNN` is the next unused integer
in that folder. Never reuse a number.

Full MADR (RACI, drivers matrix, confirmation) stays out. Steal two
fields only: Status, and optional considered options when the call had
real alternatives.

```markdown
# ADR-NNNN: <decision in one line>

Date: YYYY-MM-DD
Status: Proposed

## Context
What forced the call. Neutral. Tensions, not a pitch.

## Options considered
- A — why not
- B — why not
(omit this section when there was only one serious option)

## Decision
What we will do from now on.

## Consequences
Easier: …
Forbidden: …

## Supersedes
ADR-NNNN (omit if none)
```

Status: `Proposed` | `Accepted` | `Rejected` | `Deprecated` | `Superseded by ADR-NNNN`.

## Which status

| Status | Use when |
|---|---|
| Proposed | Written, owner has not accepted. Only state you freely edit. |
| Accepted | In force. Body is frozen. |
| Rejected | Considered and refused. Keep the file so the debate does not restart. |
| Deprecated | No longer applies and nothing replaced it (system gone). |
| Superseded by ADR-M | A later ADR replaced this call. |

## Supersede workflow

Same change, two files. Do not edit ADR-N's Decision or Consequences.

1. Confirm ADR-N is `Accepted`. If it is still `Proposed`, edit N — that
   is not a supersede.
2. Next number M = max existing NNNN + 1.
3. Write `docs/adr/MMMM-short-slug.md` with Status `Accepted` (owner
   already agreed) and `## Supersedes` → ADR-N.
4. On ADR-N, change **only** `Status: Superseded by ADR-M`.
5. Leave ADR-N's body intact. Truth is N then M, not M alone.

Partial change of one consequence still gets a new ADR that supersedes
the whole record. Do not patch a paragraph in N.

Never delete. Date is a field, not the filename.
