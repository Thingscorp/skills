---
name: review
description: >-
  use this when a plan or diff needs a severity-graded review before it
  lands — P0/P1/P2, do not manufacture findings, BLOCKED if scope is
  ambiguous, reviewer does not dispatch workers
license: MIT
metadata:
  portability: portable
---
# review

Grade a plan or a diff before it lands. One process. Do not dispatch a swarm.
Do not invent issues to look thorough.

## When

- A change is about to merge or a plan is about to become tickets.
- You need severity, not a vibe.
- Scope is stated (files, intent, invariants). If it is not, stop.

Not for: draining a ticket queue (ralph-loop), inventorying a shipped product
(quality-loop), or composing a domain (unix-compound).

## Preconditions

- Named subject: plan path, PR, or `git diff` range.
- Stated intent and allowed scope.
- If either is missing or contradictory → **BLOCKED**. Ask one clarifying
  question. Do not review a guess.

## Severity

| Grade | Meaning | Gate |
|---|---|---|
| **P0** | Breaks correctness, safety, data, or a locked invariant. | Must fix before land. |
| **P1** | The change fails its own intent or leaves the slice unproven. | Should fix in this change. |
| **P2** | Real, optional. Style, naming, later cleanup. | Record. Do not block. |

No other grades. No "P0.5". No nit dressed as P0.

## How

1. Read the stated intent and scope first. Do not browse the whole repo.
2. Review only what is in scope plus its immediate callers/callees.
3. Every finding cites a path (and line or symbol) and the behavior that fails.
   No citation → not a finding. Delete it.
4. Assign exactly one grade. If two grades fit, take the higher only when the
   higher invariant is actually at risk.
5. Decision-grade findings (a tradeoff, an adopt/skip, a lesson that should
   bind later work) become an ADR stub in the project's decision dir — not a
   note in a write-once artifacts folder. Typos stay in the review.
6. Stop. Do not fix in this skill unless the owner asked for fix-forward and
   there are no P0s left unstated.

## Output

```markdown
### review
**Subject** …
**Scope** …
**Verdict** land / fix-P0 / fix-P1 / BLOCKED

| ID | Grade | Finding | Evidence |
|---|---|---|---|
| R-1 | P0 | … | path:symbol |

**Decisions to record** ADR stubs, or none.
**Out of scope** noted, not graded.
```

Verdict `land` only when there are zero P0s and the owner accepts leftover P1s.

## Rules

- Do not manufacture findings. Empty review is valid.
- Reviewer does not spawn workers, lanes, or a second agent to "go deeper."
- Do not re-open files the subject did not touch unless a P0 invariant requires it.
- Artifacts folders that nobody reads are a graveyard. Decisions go to ADRs.

## Anti-patterns

- Reviewing the whole repo because the diff was small.
- Padding the list so the review "looks complete."
- Embedding swarm/dispatch in the reviewer.
- Filing a typo as P0.
- Writing findings into a directory that is never read again.
- Fixing while reviewing without stating the P0s first.

## Related

ralph-loop · quality-loop · handoff · to-spec · grill-execute-clear
