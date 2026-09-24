---
name: to-spec
description: >-
  use this when a feature spans multiple smart-zone sessions — grill,
  destination spec + vertical tickets in the issue tracker, archive the spec
  when code ships
portability: portable
---
# to-spec

Turn a grilled conversation into a **destination spec** and **vertical-slice tickets** that each fit one smart-zone session (~150,000-token working budget).

## Pipeline
1. **Grill** (shared understanding; say **"zoom out"** when questions drown in jargon)
2. Write the **destination spec** — run the grill mechanics from **grill-execute-clear** first; grilling produces the shared understanding the spec records. The destination spec is cross-session shared truth (binding until archived); the grill mini-spec is in-session confirmation (disposable).
3. **Split into tickets** in the **same conversation** while smart-zone remains — push back until slices are **vertical** (DB+API+UI end-to-end), not horizontal layers
4. Implement one ticket per focused session (optional TDD only at **pre-agreed seams**; reject tautological tests)
5. Review on **two axes**: standards sub-agent + spec sub-agent

## Reject horizontal tickets
A ticket that is "migrate schema only," then later "API only," then "UI only" delays system feedback. Push back: each ticket should prove a thin end-to-end slice users can feel. Vertical ≈ **tracer bullets**: each ticket crosses the stack early so design feedback arrives in phase 1, not phase 3.

## Where specs and tickets live
In the **issue tracker** (GitHub Issues + `gh`, or Linear/Jira) — **outside** the repo. **Never commit living `SPEC.md` into the codebase.**

## Spec shape
Problem (user), solution (user), stories, implementation decisions, testing seams, out of scope, open questions.

## Spec lifetime (critical)
- **While shipping:** pass the open spec into every ticket session.
- **When the last ticket is live:** **Archive, don't delete** — close/archive in the tracker so it's findable for legacy, not a living source of truth. **Closed/archived ≠ deleted; "leave open as living team docs" is the failure mode.**
- Agents prefer dense outdated specs over code (**drift**). **Code is primary.**

## Reroute
If the destination changes: update the spec, then remaining tickets — do not point a goal/auto-compact loop at the whole spec in one long window.

## Related
grill-execute-clear · handoff · ralph-loop
