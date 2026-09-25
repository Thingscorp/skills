---
name: grill-execute-clear
description: >-
  use this when starting a coding task with an agent and you need the
  grill → same-session execute → clear loop — Brooks design-concept punch included
license: MIT
metadata:
  portability: portable
---
# grill-execute-clear

Loop for agent-assisted feature work: **grill until the design frontier is empty → execute in the same session → clear (or compact/handoff/subagent) at the phase boundary**.

Same-session execute after grilling. Never clear-before-execute.

## When
Non-trivial feature where explore→implement with no alignment wastes the smart zone. Prefer this over raw plan mode.

## Why plan mode fails (Brooks punch)
Frederick Brooks (*The Design of Design*): a **design concept is not an asset**. It's the shared picture in the room while humans align — not a document you can bank. Plan mode skips that alignment and rushes a plan that *is* the implementation (agents are sycophantic). **Specificity of an early plan is often the bug.** Grilling forces decisions first; any written mini-spec is confirmation, not discovery. You usually **do not need to read** the generated mini-spec if you answered the grill honestly — the shared understanding already lives in the primary session.

## Grill UX
1. Open with a loose prompt asking the agent to **grill the design** — many questions, contradiction pushback expected. The grill happens in this session.
2. Agent asks **many** questions (what *and* why: purpose, empty states, build-vs-buy, security/XSS) while **exploring the codebase in the background** (non-blocking).
3. Answer a **whole round in one dictation/paragraph**, not one-liners. If 12 questions came back and you answered one, **you are not done grilling** — finish the frontier before execute.
4. Expect **contradiction pushback** — pressure is a feature.
5. Stop when the **design frontier is empty** — operationally, when every line below is YES:
   - purpose statable in one sentence; scope edges named (explicitly what's OUT)
   - empty/error states decided; build-vs-buy answered
   - data flow sketched (entry → storage → UI); verification method chosen
   - a full question round from the agent surfaces nothing new

## Anti-patterns
- Plan mode as a substitute for grilling.
- **Clear (or new session) before execute** — throws away the grilled primary context; defeats the loop.
- Starting implementation while open grill branches remain.
- Treating the mini-spec document as the valuable artifact.
- Answering one question out of a full grill round and calling the design done — finish the frontier before execute.
- Trusting an unverified claim about your own codebase — hallucination is the default failure mode; verify with real checks.
- Letting the mini-spec become a living repo doc — it stays a confirmation note.
- Running a multi-session feature through this loop — hand the mini-spec to to-spec for a destination spec + vertical tickets.
- Starting an unrelated task in the same session after the feature is done and committed — Clear first.
- Answering grill questions one-liners instead of a whole round per dictation/paragraph.
- Re-reading the generated mini-spec as if it were the plan — the shared understanding already lives in the primary session if you answered the grill honestly.
- Blocking on codebase exploration while the grill runs — exploration happens in the background, non-blocking.

## Execute
Stay in the **same session** so grilled shared understanding stays primary. Smallest vertical slice that proves the decisions. Verify with real checks — **hallucination** (fluent wrongness) is the default failure mode; never trust an unverified claim about your own codebase.

## Model realities (don't fight them)
- **Non-determinism** — repeats differ, even at temp≈0 under parallel compute. Forcing max-likelihood often *lowers* judged quality (the likelihood trap). Control **process** (verify, small slices), not vibes.
- **Statelessness** — nothing carries between sessions unless written down: notes, skills, tracker specs, temp handoffs.

## Clear (named loop default)
After the feature is **done and committed**, **Clear** before an unrelated next task. For non-default boundaries (QA, cross-agent, AFK review), use the phase-boundary tree in handoff / compact.

## If grilling reveals a multi-session feature
This loop is single-session. The mini-spec **graduates**: hand it to **to-spec** as the seed of a destination spec + vertical tickets. The mini-spec stays a confirmation note — it never becomes a living repo doc.

## Output
- Decisions that still bind
- What landed + verify
- Next phase + continue | clear | handoff | subagent | compact (tree order)

## Related
to-spec · handoff · compact
