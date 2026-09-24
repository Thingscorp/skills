---
name: ralph-loop
description: >-
  use this when a ticket queue must be worked across sessions — run the
  self-verifying Ralph loop: one item per iteration, gate outside the
  worker, optional judgment gates for the small calls, commit only gate-passing work
portability: portable
---
# ralph-loop

Execute a queue of vertical tickets across sessions with a self-verifying
loop. Live agent context is disposable; durable state lives in the station's
`.ralph/` directory (plan, items, prompt, loop state, progress log). One
iteration completes exactly one ticket. Resolve `station_dir` from config,
never hardcode it.

## When

- A to-spec ticket queue (or any discrete item list) must be worked to done
  across sessions without losing state.
- Each ticket needs independent verification before it lands.
- When a grill-execute-clear feature outgrows one session, graduate its
  mini-spec to to-spec, then run the resulting tickets here.

## The loop (engine protocol)

The assistant is the engine. A fresh subagent is the worker for each item.
Never let the worker verify its own work.

1. Read the station state: `.ralph/loop.md`, `.ralph/items.json`,
   `.ralph/plan.md`, `.ralph/prompt.md`, `.ralph/progress.md`.
2. Optionally run a work-select gate: pick the best next item and reorder
   the queue. Review means the engine picks. Gate error means FIFO order stands.
3. Take the next item: take the lock, mark the item running, print the brief.
   Stop if no actionable items remain.
4. Spawn ONE fresh subagent for that item only, with the brief and the full
   prompt contract: one item, its `allowed_paths` plus one progress entry,
   run the gate command and require exit 0 with final line `ALL GATES PASS`,
   never set `passes: true`, never commit or push, `blocked: true` only for
   a real external blocker.
5. When the worker returns, verify outside the worker before committing:
   does the diff implement the item's intent?
   - auto-pass: re-run the gate itself, scope-check the diff against
     `allowed_paths`, reject `protected_paths`, commit, set
     `passes: true`, append an engine progress entry, release the lock.
   - fail-iteration: do not commit. Record the outcome, release the lock,
     report and move on.
   - review: read the diff with the frontier model and decide.
   - If the worker or the gate failed instead of returning work, triage:
     auto-retry means respawn the worker with the hint; auto-skip already
     requeued the item; escalate means stop and tell the owner; review means
     deliberate with the frontier model.
6. If the worker claims a real external blocker, judge the claim before
   blocking the item. Send-back means respawn with the hint.
7. After each iteration decide continue vs stop. Thrashing → escalate to the
   owner. Repeat from step 2.

## Optional judgment gates

Small semantic questions (select, verify, triage, blocker, continue) can be
asked by a judgment helper so the frontier model doesn't have to. Code owns
the workflow; the helper only supplies judgments. Question text, criteria,
and probability thresholds live in one human-reviewable config file next to
the driver. Gate exits: 0 acted, 1 review (engine decides), 2 escalate to
the owner, 3 gate error — on error each gate falls back to the pre-helper
behavior and says so. Reword a question and re-run representative cases when
a gate's answers feel off; keep uncalibrated sets advisory until proven on
real cases. Batch questions that share state. Branch only on typed answers,
never on free-form text.

## Rules

- One item per iteration. No batching, no drive-bys.
- The gate runs outside the worker; acceptance is exit 0 plus the exact
  final line `ALL GATES PASS`.
- The engine commits; the worker never commits, pushes, merges, or rebases.
- Never push or merge without the owner's explicit go-ahead for that action.
- Never commit secrets, tokens, passwords, or `.env` files.
- A failed verification is a failed iteration: leave the tree as the worker
  left it, record the outcome, release the lock, and report.

## Anti-patterns

- Letting the worker verify its own work — taking a builder's "success"
  report at face value without re-running the checks on the actual output.
- Committing a diff the engine has not gate-verified itself.
- Treating a typed gate answer as free-form text to interpret loosely.
- Starting the next iteration while the lock is still held.

## Related

to-spec · grill-execute-clear · handoff · compact
