# ADR template (Nygard-short)

Use from the `review` skill. One decision per file.
Path: `docs/adr/NNNN-short-slug.md` in the *target* repo. Git is the log.

```markdown
# ADR-NNNN: <decision in one line>

Date: YYYY-MM-DD
Status: Proposed

## Context
What forced the call. Neutral. Tensions, not a pitch.

## Drivers
- Constraint any winner must meet (not praise for the chosen option)

## Options considered
- A — why it lost or won against the drivers
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

## Drivers

MADR Decision Drivers are forces that exist **before** a winner is picked.
Test: you can use the bullet to reject an option without naming the winner.

Good: `must stay on the current schema`, `no new runtime`, `p99 under 10ms`.
Bad: `Postgres is battle-tested` (that is an argument for an option).

2–4 bullets. If Context already names the forces, omit this section.
Do not write a driver×option matrix.

## Version control

- ADRs live next to the code they bind. Not a wiki, not `artifacts/`.
- `Proposed` = open change (PR). Merge to the default branch = `Accepted`.
- Number is assigned when the file is created, not when it merges.
- Git history is the audit. Date is the decision date, never "last updated."
- Do not rebase, force-push, or amend an Accepted body. Status-line commits only.
- Supersede is two files in one commit after the owner accepts.
- Do not vendor an `adr` CLI from this skill.

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

Accepted body does not change. Never delete.
