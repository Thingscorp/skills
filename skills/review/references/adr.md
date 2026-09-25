# ADR template (Nygard-short)

Use from the `review` skill. One decision per file.
Path: `docs/adr/NNNN-short-slug.md` in the **target git repo**.

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

## Drivers (MADR sense)

A driver is a **force that can knock an option out** before anyone picks a
winner. Test: you could score every option against it without knowing the
choice. Good: `p95 < 200ms`, `no new vendor`, `keep the current schema`.
Bad: `better DX`, `Postgres is the best fit`, restating the Decision.
Two to four. If you need a matrix, the ADR is too big — split or cut.
Drivers that later flip the call are a new ADR, not an edit.

## Git is the version control

- One markdown file per ADR, committed next to the code they bind.
- `Proposed` may iterate on a branch / PR. Merge of an Accepted ADR is
  the acceptance event. Git history is the audit. No `last updated` stamp.
- After Accepted: do not amend, rebase, or force-push that file's body.
  Status-line commits only.
- Supersede = two-file commit (new Accepted + old Status line). Do not
  squash away the Status change.
- Do not store the only copy in a wiki.

## Supersedes

Field on the **new** file. Status change on the **old** file.
Only an **Accepted** ADR that answered the **same question** and has a
**lower number**. No self-link. No hop over an already-superseded ADR.
Related-but-different → Context. Proposed drafts are edited or Rejected.

Same question, new answer → supersede. Question gone → deprecate.
