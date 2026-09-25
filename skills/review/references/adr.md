# ADR template (Nygard-short)

Use from the `review` skill. One decision per file.
Path: `docs/adr/NNNN-short-slug.md`

```markdown
# ADR-NNNN: <decision in one line>

Date: YYYY-MM-DD
Status: Proposed

## Context
What forced the call. Neutral. Tensions, not a pitch.

## Drivers
- Constraint that knocks out or ranks an option (measurable).
(omit when Context already names the forces)

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

Omit Drivers / Options / Confirmation / Supersedes when empty.

Status: `Proposed` | `Accepted` | `Rejected` | `Deprecated` | `Superseded by ADR-NNNN`.

## Drivers vs options vs consequences

| Section | When |
|---|---|
| Drivers | Pre-decision criteria. 2–4 bullets. A driver is a hard constraint or ranking force ("must stay offline", "no new runtime", "p99 under 10ms"). Not a vibe. |
| Options | Candidate answers. Why each lost or won against the drivers. |
| Consequences | After the pick: what got easier, what is now forbidden. |

Do not write Drivers that restate Context. Do not write a Good/Bad matrix per option.

## Supersedes rules

- Same question, new answer → supersede. Question gone → deprecate. Proposal died → reject.
- Only an `Accepted` ADR can be superseded. `Proposed` is edit-or-reject, not supersede.
- Do not supersede `Rejected` or `Deprecated`. Those are closed.
- Do not self-supersede. M ≠ N.
- M must name N and say why the old call is now wrong.
- N's Status line becomes `Superseded by ADR-M`. That is the only edit on N.
- If M later changes, write P that supersedes M. Do not retarget P at N.
- Split replacement: M and P both `Supersedes: N`; N lists both.
- Bidirectional or it did not happen.

Two-file commit after owner accepts:
1. ADR-M Accepted, `Supersedes: ADR-N`.
2. ADR-N Status line only → `Superseded by ADR-M`.

Accepted body does not change. Never delete. Date is the decision date.
Do not adopt full MADR (YAML RACI, per-option Good/Bad matrices) unless
the owner asked for an audit-grade comparison.
