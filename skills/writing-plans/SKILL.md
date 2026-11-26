---
name: writing-plans
description: >-
  use this when a spec is settled and an implementer needs the plan itself —
  bite-sized tasks with exact files, interfaces, tests, and expected output
license: MIT
metadata:
  portability: portable
---
# writing-plans

Write the plan for an implementer who has not seen this codebase or this
spec. Assume they write idiomatic code once they know the exact interface
and the exact test, and that they will choose reasonably wherever the plan
leaves a choice open. What they cannot know is what you decided: which
files, which names and signatures, which values from the spec, which tests
prove each task. Document those decisions. DRY. YAGNI. TDD. Frequent
commits.

This skill writes the plan one executor works in one session. If the work
spans sessions, that is a different shape: `to-spec` writes the destination
spec and its tickets, and `ralph-plan` authors a queue from a goal. Neither
consumes a plan written by this skill; do not hand one to them.

## Scope check

If the spec covers multiple independent subsystems, it should already be
split into sub-project specs. If it is not, split it into one plan per
subsystem. Each plan produces working, testable software on its own.

## File structure first

Before defining tasks, map which files will be created or modified and what
each one is responsible for. Decomposition decisions lock in here.

- Units with clear boundaries and defined interfaces. One responsibility
  per file.
- Smaller, focused files over large ones that do too much. You reason best
  about code you can hold in context at once.
- Files that change together live together. Split by responsibility, not
  by technical layer.
- In an existing codebase, follow its established patterns. Do not
  unilaterally restructure a large file the codebase lives with; including
  a split in the plan, as its own task, is reasonable.

## Task right-sizing

A task is the smallest unit that carries its own test cycle and is worth a
fresh reviewer's gate. Fold setup, configuration, scaffolding, and
documentation into the task whose deliverable needs them. Split only where
a reviewer could meaningfully reject one task while approving its neighbor.
Each task ends with an independently testable deliverable.

Each step is one action with a checkable result: "Write the failing test"
is a step. "Run it to make sure it fails" is a step. "Implement the minimal
code to make the test pass" is a step. "Run the tests" is a step. "Commit"
is a step.

## Plan shape

Every plan starts with:

- **Goal:** one sentence describing what this builds.
- **Architecture:** two or three sentences on the approach.
- **Tech stack:** the key technologies and libraries.
- **Spec:** the path to the spec this plan implements. The plan argues from
  the spec, so the spec travels with it; executors read both.
- **Global constraints:** the spec's project-wide requirements (version
  floors, dependency limits, naming and copy rules, platform requirements),
  one line each, exact values copied verbatim from the spec. Every task
  implicitly includes this section.
- **Review focus:** the five input classes or failure modes the spec
  implies but no task's tests exercise, most likely to bite a person using
  the software, one line each. A spec says what the software must do, not
  everything it will meet; its silence on an input is not permission for
  that input to break the program. For each line, add the pinning test to
  the task that owns the code.

Each task states:

- **Files:** create, modify (with line ranges), and test paths, exact.
- **Interfaces:** what the task consumes from earlier tasks (exact
  signatures) and what it produces for later tasks (exact names, parameter
  and return types). An implementer sees only their own task; this block is
  how they learn the names neighboring tasks use.
- **Steps:** checkbox steps in test, fail, implement, pass, commit order.

## What a step contains

A step is done when the implementer can write exactly one reasonable thing
from it. Unambiguous, not complete.

- A test step: the test's name and its assertions, as code, with the spec's
  exact values in them.
- A code step: the exact signature, the file it lives in, and the values
  the spec pins. The implementer writes the body. A body appears only for
  an algorithm the signature and tests do not determine, or for exact copy
  the spec fixes.
- A verification step: the command to run and the output that means it
  passed.
- A reference to another task: that task's Interfaces block says what to
  use. The plan does not repeat that task's code.

A plan is the set of decisions the implementer cannot make alone. A plan
longer than the code it describes has written the code instead. Lines that
decide nothing ("TBD", "handle edge cases", "add appropriate validation",
"write tests for the above", a type or function no task defines) are the
opposite failure.

## Self-review

After writing the plan, check it against the spec with fresh eyes:

1. **Spec coverage.** Skim each requirement. Point to the task that
   implements it. List gaps; a requirement with no task gets a task.
2. **Step scan.** Every step lets the implementer write exactly one
   reasonable thing, and no more: a line that decides nothing is a gap, a
   function body the signature and tests already determine is a transcript.
3. **Type consistency.** Names, signatures, and properties match across
   tasks. `clearLayers()` in Task 3 and `clearFullLayers()` in Task 7 is a
   bug in the plan.
4. **Review focus.** For each implied input class or failure mode, is there
   a task whose tests exercise it? The five most likely go in Review focus,
   each with its test in the owning task. An empty section means you
   checked and found none, not that you skipped the check.
5. **Proportion.** A plan several times longer than its spec is a
   transcript of the program, not a plan. Replace bodies with signatures,
   test names, and assertions, then check each step is still unambiguous.

Fix findings inline. No re-review pass; fix and move on.

## Handoff

Save the plan to `docs/plans/YYYY-MM-DD-<feature-name>.md` unless the
project's own convention names another home, self-review it, then link it
for the reviewer's read. **Wait for that review before implementation, in
both cases below.** A plan the reviewer has not answered is not approved,
whether or not an execution method came with the ask.

If an execution method was already supplied, the review question is only:
does the plan capture what was asked? On a yes, proceed with the supplied
method. If none was supplied, the reviewer also chooses the method: work it
in-session with `executing-plans`, or, when it spans sessions, stop and
reshape it with `to-spec` instead (a written plan is not a queue; see the
note at the top). Recommend one method, with the reason from the plan
itself: how much the tasks depend on each other's interfaces, how many
there are, what a shipped mistake would cost.

## Anti-patterns

- Writing the code inside the plan and calling the transcript a plan.
- Steps that decide nothing, or tasks with no test cycle of their own.
- Splitting by technical layer instead of by deliverable.
- Repeating a neighboring task's code instead of citing its Interfaces.

## Related
to-spec · executing-plans · ralph-plan
