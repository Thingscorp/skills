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

### File and status

- Path: `docs/adr/NNNN-short-slug.md` in the *target* repo. Next integer,
  four digits. Never reuse a number.
- Status: `Proposed` → `Accepted` → `Deprecated` or `Superseded by ADR-NNNN`.
  Also: `Rejected` (proposal died; keep the file).
- Date is the decision date, not a "last updated" stamp.
- Accepted body is immutable. Allowed edits on an old file: Status line,
  typo, adding `Superseded by`. Anything else → a new ADR.
- Never delete. Truth is the full chain.

Default shape is Nygard-short (Context / Decision / Consequences).
Optional extras, only when they earn the lines:

- `## Drivers` — two to four **constraints that judge the options**
  (latency cap, no new vendor, must keep current schema). Not a pitch
  for the winner. Drivers exist before the choice.
- `## Options considered` — two or three named alternatives when the
  call had a real fork. One line each. If there is only one option, you
  are documenting an implementation, not a decision — skip the ADR.
- `## Confirmation` — one line if compliance is cheap to check later.

Skip RACI frontmatter. Skip driver×option matrices.

### Supersedes rules

`## Supersedes` lives on the **new** file. `Status: Superseded by ADR-M`
lives on the **old** file. Do not stuff both meanings into one field.

You may supersede **only**:

- An **Accepted** ADR
- That answered the **same question**
- With a **lower number** than the new file

You may not:

- Supersede yourself
- Supersede `Rejected` or `Deprecated` (those are terminal)
- Supersede an ADR that is already `Superseded by ADR-X` — the next call
  supersedes X, not the original. The chain stays linear at each hop.
- Use `Supersedes` for a related-but-different question. Link that in
  Context instead.
- Edit a `Proposed` ADR by "superseding" it. Either revise the draft or
  mark it `Rejected` and write a new number.

Same question, new answer → supersede.
Question gone → deprecate (no replacement file).
Do not mark Deprecated because you dislike the answer.

**Workflow** (two files, one commit after the owner accepts):

1. Write ADR-M `Proposed` with `Supersedes: ADR-N` and why the old call
   is now wrong. Do not touch N yet.
2. Owner accepts M.
3. Same commit: M `Accepted`. N Status line only → `Superseded by ADR-M`.
4. Split replacements: M and P both `Supersedes: ADR-N`. N lists both.

List candidates under **Decisions to capture** first. Write files only
after the owner accepts.

**Shape:**

```markdown
# ADR-NNNN: <decision in one line>

Date: YYYY-MM-DD
Status: Proposed

## Context
What forced the call.

## Drivers
- Constraint that any winner must meet

## Options considered
- A — …
- B — …

## Decision
What we will do from now on.

## Consequences
Easier: …
Forbidden: …

## Confirmation
How a later pass can see this is still in force.

## Supersedes
ADR-NNNN
```

Omit Drivers / Options / Confirmation / Supersedes when empty.

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
  (supersedes ADR-N / new)

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
- Deleting a Rejected, Deprecated, or Superseded ADR.
- Dating files instead of numbering them.
- Dumping a full MADR (RACI + per-option matrices) for a one-line call.
- Marking Deprecated when a new answer exists — that is Superseded.
- `Supersedes` on a different question.
- Drivers that are just praise for the winner.

## Related

quality-loop · ralph-loop · ralph-swarm · to-spec · handoff · steering-push-vs-point
