---
name: systematic-debugging
description: >-
  use this when a bug, test failure, or unexpected behavior resists the first
  fix — find the root cause with evidence before proposing any fix
license: MIT
metadata:
  portability: portable
---
# systematic-debugging

Root cause first, with evidence. Symptom fixes are failure.

## The iron law

**No fixes without root cause investigation first.** If you have not finished
Phase 1, you cannot propose a fix. Violating the letter of this process is
violating the spirit of debugging. Complete each phase before proceeding to
the next.

Use it for any technical issue: test failures, production bugs, unexpected
behavior, performance problems, build failures, integration issues. Use it
especially under time pressure, when a quick fix looks obvious, when you have
already tried fixes, or when you do not fully understand the issue. Simple
bugs have root causes too, and rushing guarantees rework.

## Phase 1: Root cause investigation

1. **Read the errors completely.** Stack traces, line numbers, error codes.
   Errors often contain the exact solution; do not skip past warnings.
2. **Reproduce consistently.** Exact steps, every time. If it is not
   reproducible, gather more data. Do not guess.
3. **Check recent changes.** Git diff, recent commits, new dependencies,
   config changes, environment differences.
4. **Instrument component boundaries.** In a multi-component system, log what
   enters and exits each layer, verify config propagation, and check state
   at each layer. Run once to learn where it breaks, then investigate that
   component.
5. **Trace the data flow.** Where does the bad value originate? What called
   this with it? Keep tracing up to the source. Fix at the source, not at
   the symptom. Full technique: `references/root-cause-tracing.md`.

## Phase 2: Pattern analysis

- Find working examples of the same pattern in the same codebase.
- Read any reference implementation completely. Do not skim.
- List every difference between working and broken, however small. Do not
  assume a difference cannot matter.
- Name the dependencies, settings, and assumptions the broken path needs.

## Phase 3: Hypothesis and testing

1. Form one hypothesis: "I think X is the root cause because Y." Write it down.
2. Test it with the smallest possible change. One variable at a time.
3. It worked → Phase 4. It did not → form a new hypothesis. Do not stack
   fixes on top of a failed test.
4. When you do not know, say so. Research or ask. Do not pretend.

## Phase 4: Implementation

1. Create the failing test case first: simplest reproduction, automated if
   possible. It must exist before the fix.
2. Implement one fix that addresses the root cause. No "while I'm here"
   improvements, no bundled refactoring.
3. Verify: the test passes, no other tests broke, the issue is resolved.
   Claim it only under `verification-before-completion`.
4. After a fix, add validation at the layers the bug crossed:
   `references/defense-in-depth.md`. Replace arbitrary timeouts with
   condition polling: `references/condition-based-waiting.md`.

## The three-fix rule

Count your fix attempts. Under 3: return to Phase 1 with the new information.
**At 3 or more failed fixes, stop and question the architecture.** The
pattern that marks an architectural problem: each fix reveals a new coupling
or shared-state problem somewhere else, fixes need massive refactoring, or
each fix creates new symptoms. Discuss the architecture before attempting
another fix. That is not a failed hypothesis; it is a wrong architecture.

## Red flags: stop and return to Phase 1

- "Quick fix for now, investigate later."
- "Just try changing X and see if it works."
- "Add multiple changes, then run the tests."
- "Skip the test, I'll manually verify."
- "It's probably X, let me fix that."
- "I don't fully understand but this might work."
- Proposing solutions before tracing the data flow.
- "One more fix attempt" when you have already tried two or more.
- Each fix reveals a new problem in a different place.

## Signals you are doing it wrong

The owner's redirections name the failure directly. When you hear one, stop
and return to Phase 1:

- "Is that not happening?" You assumed without verifying.
- "Will it show us...?" You should have added evidence gathering.
- "Stop guessing." You are proposing fixes without understanding.
- "Ultra-think this." Question fundamentals, not just symptoms.
- "We're stuck?" Your approach is not working.

## When there is no root cause

If the investigation genuinely shows an environmental, timing, or external
cause: document what you investigated, add the appropriate handling (retry,
timeout, error message), and add monitoring for the next occurrence. Most
"no root cause" cases are incomplete investigation.

## Anti-patterns

- Patching the symptom to make the output match.
- Bundling several fixes so no one can tell which one worked.
- Writing the test after the fix "works." An untested fix does not stick.
- Reading a reference implementation partially and adapting from memory.

## Related
verification-before-completion · review · quality-loop
