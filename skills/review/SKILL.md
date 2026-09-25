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

## ADR capture

A review dump that nobody reads is a graveyard. Capture at decision time.
Template: `references/adr.md`.

**Write an ADR** when the finding is expensive to reverse, constrains future
work, picks one option over another that someone will ask about, adopts or
drops a dependency, or supersedes an earlier ADR.

**Leave it in the report** when it is a typo, lint, missing test on this
change, taste/P2, or reversible this session.

**Incident note, not ADR** when it is swarm/loop closeout provenance
(what ran, what failed, what to try next).

Shape: Status (accepted | superseded) · Context · Decision · Consequences.
Append-only. New file supersedes the old. Do not silently rewrite.
Lives in the project (`docs/adr/NNNN-slug.md`), not in a write-only dump.

If the project already has the same decision and it has not changed, link it.
Do not mint a duplicate.

## Report shape

```markdown
# Review: <artifact>
**Scope** …
**Verdict** land / fix-P0 / fix-P1 / BLOCKED

## Findings
- P0 `path` — …
- P1 `path` — …

## Decisions to capture
- ADR `docs/adr/NNNN-slug.md` — …
- skip — typo / one-off / already recorded

## Out of scope
- …
```

If there are no findings, write `No findings.` and stop.

## Anti-patterns

- Inventing nits so the review looks thorough.
- Reviewing two diffs because they were "nearby."
- Embedding worker dispatch in the reviewer.
- Writing every nit into `docs/adr/`.
- Leaving a real decision only in a dated dump nobody will open.
- Relitigating taste as P0.

## Related

quality-loop · ralph-loop · ralph-swarm · to-spec · handoff
