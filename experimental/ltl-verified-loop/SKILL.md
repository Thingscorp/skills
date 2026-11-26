---
name: ltl-verified-loop
description: >-
  use this when a loop or graph must produce verifiable progress — ground the
  stop condition and safety invariants in LTL, translate with Spot or LTL3BA,
  and require a runtime monitor on every cycle trace
license: MIT
metadata:
  portability: portable
---
# ltl-verified-loop

Convert work into a self-improving loop or coordinating graph whose progress is checked by a runtime monitor built from primary sources.

## When

- A workflow must run across cycles with a mechanical stop condition.
- Informal or LLM-only grading is insufficient.
- You need an independent verifier that consumes an execution trace and returns accept/reject.

## Grounding

Use only these sources: Gastin & Oddoux CAV 2001 paper and C sources, Babiak et al. TACAS 2012 (arXiv:1201.0682) and LTL3BA sources, Spot library source plus its LTL regression suite, Baier & Katoen *Principles of Model Checking* LTL and Büchi chapters. Cite the exact section, function, or commit you rely on.

## Verifier construction

1. Write the stop condition and every safety invariant as an LTL formula.
2. Translate each formula with Spot `ltl2tgba` (or the LTL3BA pipeline). Apply the prefix-invariant suspension optimization when the formula matches the LTL3BA syntactic condition (every branch contains at least one G and one F, except left children of U/R).
3. Output the resulting TGBA or BA (state count, transition count, acceptance condition).
4. Derive a runtime monitor from that automaton.
5. Supply three concrete traces: one that satisfies the LTL, one that violates liveness, one that violates safety. Show the monitor’s accept/reject on each trace.
6. The monitor is the only primary verifier. An LLM judgment may be attached only as a secondary note and must be labeled weak.

## Layer rule

Choose exactly one: Prompt, Agent, Loop, or Graph.  
State the concrete missing capability that makes every simpler layer fail on this task.

## Prerequisites before the first cycle

- LTL formulas for stop condition and invariants.
- Monitor binary verdict interface that consumes a trace and returns accept or reject plus violating prefix.
- Named persistent store (file, key-value entry, or database row) that is read at cycle start and written at cycle end.

## Cycle report (required fields)

- LTL formulas in force
- Monitor verdict and violating prefix (if any)
- Persistent-store key read and key written
- Cost/token count versus stated numeric guard
- Artifact produced
- Single next change that alters the input to the monitor

## Rejection conditions

Reject the step if any of the following hold:  
- Stop condition is not an LTL formula.  
- No Spot or LTL3BA translation output is shown.  
- No trace validation is shown.  
- The only verdict is an LLM score.  
- The cycle produces no artifact the monitor can consume.  
- The next action does not change a value the monitor reads.

## Activation

Identify the single highest-leverage existing workflow in the current project.  
Output:  
- Chosen layer and the concrete capability gap  
- Exact LTL formulas  
- Spot or LTL3BA command line (or equivalent source steps)  
- First cycle inputs and expected artifact  

Then run that cycle, feed its trace to the monitor, and emit the cycle report. Subsequent cycles may begin only after that report.

## Anti-patterns

- Soft goals (“make it better”) without an LTL formula.
- Self-grading as the only verifier.
- Skipping trace validation of the monitor.
- Building a graph when a single loop suffices.
- Plans that do not produce a monitor-scored artifact.

## Related

ralph-loop · quality-loop · review · to-spec
