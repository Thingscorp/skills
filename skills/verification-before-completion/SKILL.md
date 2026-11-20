---
name: verification-before-completion
description: >-
  use this when you are about to claim work is done, fixed, passing, or ready
  — run the proving command fresh, read its output, then claim
license: MIT
metadata:
  portability: portable
---
# verification-before-completion

Evidence before claims, always. A claim in this library carries its check or
is labeled unchecked.

## The iron law

**No completion claims without fresh verification evidence.** If you have not
run the verification command in this message, you cannot claim it passes.
Violating the letter of this rule is violating the spirit of this rule.

## The gate

Before claiming any status or expressing satisfaction:

1. **Identify.** What command proves this claim?
2. **Run.** Execute the full command, fresh and complete.
3. **Read.** Full output. Check the exit code. Count the failures.
4. **Verify.** Does the output confirm the claim? If no, state the actual
   status with the evidence. If yes, state the claim with the evidence.
5. **Only then** make the claim.

Skipping any step is lying, not verifying.

## What each claim requires

| Claim | Requires | Not sufficient |
|---|---|---|
| Tests pass | Test command output: 0 failures | A previous run, "should pass" |
| Linter clean | Linter output: 0 errors | A partial check, extrapolation |
| Build succeeds | Build command: exit 0 | Linter passing, logs look right |
| Bug fixed | The original symptom, tested: passes | Code changed, assumed fixed |
| Regression test works | A red-green cycle, verified | The test passes once |
| Agent completed | The diff shows the changes | The agent reports "success" |
| Requirements met | A line-by-line checklist against the plan | Tests passing |

Label the result honestly: **PROVEN** (ran end to end on the real surface,
output in hand), **BUILT** (code exists, never run), **CLAIMED** (prose,
votes, or static review only). "Ready", "finished", and "done" belong to
PROVEN work only.

## Red flags: stop

- "Should", "probably", "seems to."
- Satisfaction before verification: "Great!", "Perfect!", "Done!"
- About to commit, push, or open a PR without verification.
- Trusting an agent's success report.
- Relying on a partial verification.
- Any wording that implies success without the run behind it.

## Key patterns

**Regression tests (red-green):** write the test, run it (pass), revert the
fix, run it (must fail), restore the fix, run it (pass). A test you never saw
fail proves nothing.

**Requirements:** re-read the plan, make a checklist, verify each line,
report gaps or completion. "Tests pass, phase complete" is not a checklist.

**Delegated work:** the agent reports success → check the diff → verify the
changes → report the actual state. Never relay the report as the result.

## When it applies

Always, before any variation of a success or completion claim, any
expression of satisfaction, any positive statement about work state, and
before committing, opening a PR, completing a task, moving to the next task,
or delegating. It applies to exact phrases, paraphrases, synonyms, and
implications alike.

## Anti-patterns

- "I'm confident" as a substitute for evidence. Confidence is not a check.
- "Just this once." There are no exceptions.
- Treating a linter pass as a build pass. They check different things.
- Partial verification presented as full. Partial proves nothing.

## Related
systematic-debugging · review · executing-plans
