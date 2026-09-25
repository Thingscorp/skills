---
name: review
description: >-
  use this when a plan or diff needs a severity-graded review before
  it lands — P0/P1/P2, do not manufacture findings, BLOCKED when
  scope is ambiguous, decisions become ADRs
license: MIT
metadata:
  portability: portable
---
# review

Grade a plan or a diff. One process. Do not dispatch workers. Do not
rewrite the work under review.

This is not quality-loop (inventory a shipped product) and not ralph-loop
(drain a ticket queue).

## When

- A plan is about to be executed.
- A diff is about to land on a topic branch.
- An adopt/skip verdict on a library needs a recorded reason.

Stop and ask if the scope is ambiguous. Do not guess a target.

## Severity

| Grade | Meaning | Action |
|---|---|---|
| P0 | Breaks correctness, security, data, or the locked goal | Must fix before land |
| P1 | Real defect or missing check; not an emergency | Fix or explicitly waive |
| P2 | Smell, inconsistency, missing test that is not load-bearing | Note; do not block |

No other grades. If it is not a finding, do not write it.

## How

1. Name the artifact (plan path, diff range, or commit).
2. If scope is unclear — which files, which goal, which branch — emit
   `BLOCKED` and the question. Stop.
3. Read the artifact and the surrounding contract (`allowed_paths`,
   locked criteria, tests). Do not review files outside that scope.
4. List findings. Each one: grade, location, what is wrong, what would
   make it pass. Evidence from the artifact, not from taste.
5. Do **not** manufacture findings. Empty is a valid review: `No P0/P1`.
6. Distill decision-grade findings (adopt/skip, invariant, lesson) into
   an ADR or atomic note next to the project docs. Typos and one-off
   defects stay in the review. A write-only artifacts dump is a graveyard.
7. Hand the report back. Do not commit, push, or start the next ticket.

## Report shape

```markdown
### review
**Target** …
**Scope** …
**Verdict** land / fix-P0 / fix-P1 / BLOCKED

| Grade | Location | Finding | Passes when |
|---|---|---|---|
| P0 | … | … | … |

**Decisions to record** … or none
**Out of scope** …
```

## Rules

- One reviewer process. Swarm and review stay separate.
- Do not invent issues to look thorough.
- Do not fix the diff in the same pass unless the owner asked for a
  review-and-patch and there is no P0 ambiguity.
- Never land with an open P0.

## Anti-patterns

- Reviewing the whole repo because the diff felt related.
- P2 style nits dressed up as P0.
- Writing findings to a dump directory that nothing reads.
- Dispatching workers from the review.
- Approving by vibe when tests or the locked goal were not checked.

## Related

ralph-loop · quality-loop · to-spec · handoff · unix-compound
