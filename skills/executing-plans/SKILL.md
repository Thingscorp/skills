---
name: executing-plans
description: >-
  use this when a written plan exists and you will work it in this session —
  task by task in order, a check at each step, a ledger throughout
license: MIT
metadata:
  portability: portable
---
# executing-plans

Execute the plan yourself, task by task, in this session. The plan already
did the thinking. Execute it exactly, prove each step with a test you
watched fail and then pass, and leave a record that survives your own
forgetting.

**Why in-session:** a fresh implementer per task pays a full context
rebuild per task. In-session execution pays one context, plus one
fresh-context review of the whole branch at the end. What it keeps from the
heavier method, by other means: the brief is the spec, the ledger is the
record, the test cycle is the per-task gate, and the final reviewer is the
second pair of eyes.

Do not pause to check in between tasks. The owner chose in-session
execution to spend less, not to answer "should I continue?" after every
task. Narrate at most one short line between tool calls; the ledger and the
tool results carry the record.

Use this when the plan's tasks are mostly independent and this session can
hold them. Two cases change the method, and both outrank this skill:

- **Context limit.** The `handoff` decision tree outranks any single
  skill's default, this one included. As the session approaches the
  smart-zone limit (~150k tokens), do not "just continue": stop at a task
  boundary and follow the tree (compact with a one-line focus, or hand
  off). The ledger is what makes the plan resumable from there.
- **A long plan.** If the plan is long enough that its later tasks would
  run on a compacted context even with the ledger, prefer a queued loop
  (`ralph-loop`) over in-session execution, and say so before starting.

Redirect long command output to a file in the plan's scratch directory and
read its tail. Everything you print, and every tool result, stays resident
in your context for the rest of the session.

## Rulings, not stalls

Conflicts, ambiguities, and plan defects get decided, not stalled on. The
spec is the binding authority, the plan is its argument, and your judgment
settles what neither answers. Record every decision in the ledger as
`Ruling: <what you decided> — <why> — <what it costs if wrong>`, and keep
going. Deviating from the plan without a ledgered ruling is a decision made
in secret.

Four things stop you, and only these: an irreversible or destructive
operation; a security-sensitive action; a side effect outside this worktree
that norms say you ask about first (a merge, a push to a shared branch, a
publish); and a plan so broken that every path forward is a guess.

## Setup

1. Work in an isolated workspace or branch. Never start implementation on
   a main branch without the owner's explicit consent.
2. Read the plan once. Note its Global Constraints. Create one todo per
   task. If the plan names a spec, read it too: conflicts inside the plan
   resolve against the spec. A plan with no reachable spec gets a ledger
   note saying so; rulings made without one are provisional.
3. **Open the ledger.** Conversation memory does not survive compaction. An
   executor that loses its place re-implements tasks whose commits already
   exist. Keep the ledger in a git-ignored scratch directory for this plan,
   by default `.plans/<plan-name>/progress.md` at the repo root, never
   committed: its first line names the plan file. A task with a completion
   line in the ledger is done; after compaction, trust the ledger and
   `git log` over your own recollection.
4. **Pre-flight scan.** Before Task 1, check the plan's Interfaces blocks:
   for every task that consumes what an earlier task produces, one ledger
   row naming the two tasks, what one produces against what the other
   consumes, and what you found. Tasks that share nothing get no row; a
   plan whose tasks share nothing gets the single line
   `Pre-flight: no shared interfaces`. Rule on each conflict the scan
   surfaces, with the spec as authority, and record the ruling beside its
   row.

## The task loop

**Take the task.** Read its full text from the plan, including ones you
remember from setup: what you remember is a summary, the plan has the exact
values, signatures, and test cases. Mark its todo in progress. Bookkeeping
rides along with work: a ledger append in the same motion as the commit,
never as a step of its own.

**Work the steps in order.** The plan's steps are already in
fail-first order. A test step's code is written first and run first.
Watching it fail is a step, not a formality: a test that passes before the
implementation exists is a finding about the test.

Every step that runs a command has an expected output. Run the command,
read the output, compare. Three outcomes:

- **Matches.** Next step.
- **The code is wrong.** Use `systematic-debugging`. Find the cause; never
  patch the symptom to make the step's output match.
- **The plan is wrong.** A step contradicts the spec, an interface does not
  match what this task consumes, a command cannot work. Rule on the
  smallest change that satisfies the spec, ledger it as a `Ruling:` line,
  and continue. Later tasks that touch the same interface read the ruling
  from the ledger.

Commit as the plan's commit steps say.

**The completion contract.** Before a task's ledger line, all of these are
true, with evidence from this session: every test the task names exists and
ran, and you read the output; the final test run for the task passed, and
its command and result go into the ledger line; every expected output was
compared against real output; every deviation has a `Ruling:` line.
`verification-before-completion` governs the claim. If any item is missing,
the task is not complete: finish it.

Ledger line shape:
`Task <N>: complete (commits <base>..<head>, tests: <command> → <result>)`

## Final review

After the last task, get one fresh-context review of the whole branch with
`review`: the diff against the commit the branch started from (never
`HEAD~1`; a task that spans several commits is normal), the plan and spec
paths, the plan's Review focus section, and a pointer to the ledger's
`Ruling:` lines. If no fresh reviewer is available, do the review yourself
as a separate pass after the last ledger line, and say so plainly in the
final message: a self-review by the author is weaker, and the owner decides
whether it is enough before merge.

Re-grade the findings before acting on any of them. A severity label is
advice; the gate is yours. Grade by effect: what a reasonable person using
this software gets if it ships, not whether the spec named the triggering
input. `review` grades P0/P1/P2 and no other grades; act on them as:

- **P0 and P1** enter one fix pass. Each fix is verified by the test cycle,
  not by a second review: write the test that reproduces the finding, watch
  it fail, make it pass, run the whole suite. Ledger each as
  `Final: fixed <finding> — <test> RED→GREEN, suite <N>/<N>`. A suite that
  is not green after the pass means the pass is not over.
- **P2** goes to the ledger as `Final: minor (deferred): <one-liner>` and
  to the final message. P2 findings never enter the fix pass.
- **Anything the reviewer declined to judge** is yours to decide: rule on
  each line and ledger it as a `Final: Ruling:` entry, exactly like a plan
  conflict. A declined item left undecided is a decision made by default.
- A finding you decide not to fix is a ruling, ledgered with its cost if
  wrong, and reported in the final message. There is no second fix pass.

## Finish

Collect every `Ruling:` line into the final message under "Rulings I made",
in the order you made them, each with what it costs if wrong, and every
deferred minor under "Deferred minors". Both lists are exhaustive. The
final message is the only place decisions taken on the owner's behalf reach
them. When the review is clean and its fixes are committed, delete the
plan's scratch workspace; the git history is the record now.

## Anti-patterns

- "I remember what Task N says." You remember a summary. Read the task.
- Skipping the watched failure because the change looks trivial.
- Running the full suite only at the end instead of per step. Per-step runs
  are how you learn which step broke it.
- Writing ledger lines in a batch after several tasks. Compaction does not
  wait for a convenient moment.
- Fixing the minors while you are in there. Ledger them; the owner decides.
- Replacing the final fresh review with your own careful read of your own
  diff. Same author, same blind spots.

## Related
writing-plans · verification-before-completion · systematic-debugging · review · handoff
