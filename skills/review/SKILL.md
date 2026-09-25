---
name: review
description: >-
  use this when a plan or diff needs a severity-graded review before it
  lands — P0/P1/P2, do not manufacture findings, BLOCKED on ambiguous
  scope, decision-grade findings become ADRs
license: MIT
metadata:
  portability: portable
---
# review

Read a plan or a diff. Report what is actually wrong. Do not invent work.
The reviewer is one process. It does not dispatch workers.

## When

- A plan is about to be executed and needs a severity pass.
- A diff is about to land and needs a P0/P1/P2 read.
- An adopt/skip or architecture call needs a written verdict.

Not for: inventorying a shipped product (`quality-loop`), draining a ticket
queue (`ralph-loop`), or running parallel lanes (`ralph-swarm`).

## Scope first

Name the artifact under review (plan path, diff range, PR, adopt/skip
note). If scope is missing or two artifacts are tangled, stop:

```
BLOCKED: scope is ambiguous. Name one plan or one diff.
```

Do not guess the target.

## Severity

| Grade | Meaning | Action |
|---|---|
| P0 | Breaks the stated goal, a locked invariant, security, or data integrity | Must fix before land |
| P1 | Real defect or missing check that will bite the next session | Fix or explicitly waive |
| P2 | Taste, naming, future work | Optional |

No other grades. If it is not a finding, it is not in the report.

## Rules

- Do not manufacture findings. Empty report with `No findings.` is valid.
- Cite the file, line, or plan section. No vibes.
- Do not rewrite the artifact. Review is read + report.
- Do not start a swarm, a loop, or a second agent from this skill.
- Do not commit, push, or merge the reviewed work.

## ADR capture

A review dump that nobody reads is a graveyard. Findings that encode a
decision become ADRs.

**Capture test** — write an ADR only when all of these are true:

1. The finding changes a future call (architecture, adopt/skip, invariant,
   process), not just this diff.
2. A later agent could make the opposite call without this note.
3. It is not already in `AGENTS.md` or an existing ADR.

**Stay in the report (no ADR):** typos, missing tests, off-by-ones, P2 taste,
one-off fixes, restating a rule that already lives in the repo.

**Incident note, not ADR:** a run failed for operational reasons (lock, quota,
provider). One paragraph in the project progress log. No `docs/adr/` file.

### Versioning

The chain is the version. Do not semver an ADR body.

- File: `docs/adr/NNNN-short-slug.md` in the *target* repo. `NNNN` is the next
  integer in that folder (four digits, zero-padded). Never reuse a number.
- Status only: `Proposed` → `Accepted` → `Deprecated` or `Superseded by ADR-NNNN`.
- Proposed until the owner accepts. Then flip Status to Accepted.
- Accepted body is immutable. Allowed edits: Status line, typo in a name,
  adding `Superseded by ADR-NNNN`. Anything else → a new ADR.
- To change the call: write ADR-M that states `Supersedes: ADR-N`. Set ADR-N
  Status to `Superseded by ADR-M`. Keep both files.
- Never delete an ADR. Rejected stays on disk as `Rejected` so the option is
  not rediscovered.
- Truth is the full chain, not the latest file alone.

Do not invent a global knowledge vault from this skill. Do not use a heavy
consultation template. Context / Decision / Consequences is enough.

**Shape:**

```markdown
# ADR-NNNN: <decision in one line>

Date: YYYY-MM-DD
Status: Proposed

## Context
What forced the call.

## Decision
What we will do from now on.

## Consequences
What this makes easier, and what it forbids.

## Supersedes
ADR-NNNN (omit if none)
```

One decision per file. Link the path from the finding.
List candidates under **Decisions to capture** first. Write the file only
after the owner accepts (then Status: Accepted in the same commit).

## Report shape

```markdown
# Review: <artifact>
**Scope** …
**Verdict** land / fix-P0 / fix-P1 / BLOCKED

## Findings
- P0 `path` — …
- P1 `path` — …

## Decisions to capture
- ADR candidate: <one-line decision> — why a later agent would miss this

## Out of scope
- …
```

If there are no findings, write `No findings.` and stop.

## Anti-patterns

- Inventing nits so the review looks thorough.
- Reviewing two diffs because they were "nearby."
- Embedding worker dispatch in the reviewer.
- Writing findings into `artifacts/` and never capturing the decision.
- An ADR per P2 nit.
- Relitigating taste as P0.
- Editing an Accepted ADR body instead of superseding.
- Deleting a Rejected or Superseded ADR.
- Dating files instead of numbering them (`20260924-foo.md` collides and does not index).

## Related

quality-loop · ralph-loop · ralph-swarm · to-spec · handoff · steering-push-vs-point
