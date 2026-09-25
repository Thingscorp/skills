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
- Constraint any winner must meet (not praise for the chosen option)

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
If there is only one option, skip the ADR — that is an implementation.

Status: `Proposed` | `Accepted` | `Rejected` | `Deprecated` | `Superseded by ADR-NNNN`.

## Supersedes

Field on the **new** file. Status change on the **old** file.
Only an **Accepted** ADR that answered the **same question** and has a
**lower number**. No self-link. No hop over an already-superseded ADR
(supersede the current head of the chain). Related-but-different →
Context, not this field. Proposed drafts are edited or Rejected, not
superseded.

Same question, new answer → supersede.
Question gone → deprecate.

Two-file commit after owner accepts:
1. ADR-M Accepted, `Supersedes: ADR-N`.
2. ADR-N Status line only → `Superseded by ADR-M`.

## Drivers vs options vs consequences

| Field | When | What |
|---|---|---|
| Drivers | Before the choice | Constraints that judge every option |
| Options | Real fork existed | Named alternatives |
| Consequences | After the choice | What the winner makes easier / forbids |

Accepted body does not change. Never delete. Date is the decision date.
