# ADR template (Nygard-short)

Use from the `review` skill. One decision per file.
Path: `docs/adr/NNNN-short-slug.md` in the **target git repo**.

```markdown
# ADR-NNNN: <decision in one line>

Date: YYYY-MM-DD
Status: Proposed

## Context
What forced the call. Neutral. Tensions, not a pitch.
C4 level this binds (if a boundary moves): Context | Container | Component.

## Drivers
- Constraint any winner must meet (not praise for the chosen option)

## Options considered
- A — why it lost or won
- B — …

## Decision
What we will do from now on.
Optional Y-line: In the context of …, facing …, we chose …, accepting ….

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

## Which template

| Template | Use |
|---|---|
| Nygard-short (this file) | Default. One decision, minutes to write. |
| Y-statement | One sentence inside Decision, or a log line. Not a replacement file. |
| MADR extras | Drivers / Options / Confirmation only when they earn the lines. |
| Full MADR / Tyree-Akerman | Do not. Audit-grade matrices are out of scope for this skill. |

## C4 (structure, not a decision)

C4 is four zoom levels: Context → Container → Component → Code.
An ADR records a *call*. A C4 diagram records *shape*. Do not paste a
diagram into the ADR.

- If the call moves a system or deployable boundary, name the level in
  Context. That is almost always **Container** (an app or data store that
  must be running — not Docker).
- Do not start at Component or Code. Code diagrams go stale; generate
  them from source if you need them.
- A directory tree is not a C4 diagram.

## Drivers (MADR sense)

A driver is a **force that can knock an option out** before anyone picks.
Test: you could score every option against it without knowing the winner.
Good: `p95 < 200ms`, `no new vendor`, `keep the current schema`.
Bad: `better DX`, `Postgres is the best fit`.
Two to four. Matrix → split or cut. Force set flips the call → new ADR.

## Git is the version control

- One markdown file per ADR, next to the code they bind.
- `Proposed` may iterate on a branch. Merge of Accepted is acceptance.
- After Accepted: no amend / rebase / force-push of that body.
- Supersede = two-file commit. Do not squash away the Status change.
- Do not store the only copy in a wiki.

## Supersedes

Field on the **new** file. Status change on the **old** file.
Only an **Accepted** ADR that answered the **same question** and has a
**lower number**. No self-link. No hop over an already-superseded ADR.
Related-but-different → Context. Proposed drafts are edited or Rejected.
