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
|---|---|---|
| P0 | Breaks the stated goal, a locked invariant, security, or data integrity | Must fix before land |
| P1 | Real defect or missing check that will bite the next session | Fix or explicitly waive |
| P2 | Taste, naming, future work | Optional |

No other grades. If it is not a finding, it is not in the report.

## Rules

- Do not manufacture findings. Empty report with `No findings.` is valid.
- Cite the file, line, or plan section. No vibes.
- Do not rewrite the artifact. Review is read + report.
- Do not start a swarm, a loop, or a second agent from this skill.
- Do not commit, push, or merge.

## Decision memory

A review dump that nobody reads is a graveyard.

- Typo, missing test, off-by-one → stays in the report.
- A finding that encodes a **decision or lesson** → distill one ADR (or
  atomic note) and link it from the finding. Adopt/skip verdicts are ADRs.
  Swarm/loop closeout provenance is an incident note.
- Findings that encode a decision become ADRs.

ADR is short: context, decision, reason, consequences. Append-only.
Supersede; do not silently rewrite.

## Report shape

```markdown
# Review: <artifact>
**Scope** …
**Verdict** land / fix-P0 / fix-P1 / BLOCKED

## Findings
- P0 `path` — …
- P1 `path` — …

## Decisions to capture
- ADR: …

## Out of scope
- …
```

If there are no findings, write `No findings.` and stop.

## Anti-patterns

- Inventing nits so the review looks thorough.
- Reviewing two diffs because they were "nearby."
- Embedding worker dispatch in the reviewer.
- Writing findings into `artifacts/` and never capturing the decision.
- Relitigating taste as P0.

## Related

quality-loop · ralph-loop · ralph-swarm · to-spec · handoff
