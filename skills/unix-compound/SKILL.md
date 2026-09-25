---
name: unix-compound
description: >-
  use this when a domain must become compounding one-thing-well
  modules — lock measurable success, decompose, build one module
  at a time, stop when a one-shot already meets the goal
license: MIT
metadata:
  portability: portable
---
# unix-compound

Turn a domain into single-purpose modules that talk through text.
Lock success first. Build one module. Check it. Stop when the locked
goal is met or returns diminish.

This is not grill-execute-clear (one feature), not ralph-loop (a ticket
queue), not quality-loop (inventory a shipped product).

## Standing rules

- One thing well. New capability = a new module. Never fatten an old one.
- Text streams are the interface. Every output is input to the next module.
- Early try → throw away → rebuild. Do not patch a multi-purpose module.
- Occam at every step: if two designs meet the locked goal, keep the simpler.
- Equal utility → fewer words, fewer sections. Never drop a constraint that
  still carries utility.
- A high rubric score is not ship-ready. Merge real anti-patterns before
  trusting a draft.

## Process

```
goal → skeleton → sequence? → (build → check → sidecar)* → next
```

Emit the sidecar as the first content of every response while this skill runs.

### goal
Propose 3–5 binary or numeric criteria. Ask for hard constraints (time,
tools, budget) and lock them with the criteria. After two proposals with
no lock, proceed as *provisional* and mark it. Do not skip this module.

### skeleton
Hierarchical decomposition into single-purpose components. Apply hard
constraints immediately. Cluster duplicates. Prefer fewer modules.

### sequence
Order, blockers, critical path. Skip when modules are independent.

### build
Implement the next unblocked module in its simplest viable form. Inside
build, generate 2–4 variants, score goal-fit / one-thing-well / simplicity,
keep one, record a one-line lineage. Do not implement two modules at once.

### check
QA against “one thing well” and the locked criteria. Clumsy → throw away
and rebuild. Passing check locks the module (`OK`).

### sidecar
Terminal Markdown progress first: phase, coverage, active module, goal
progress, decision, residuals. When the list exceeds ~8, show active +
last 3 completed + goal progress. No dashboards.

### next
Recurse to the next pending unblocked module. Recommend stop when Goal
Progress ≥ 90% and residuals have been low-impact for two consecutive
cycles. After a third stall at ≥ 90%, force-stop. Before terminate,
compare the modular result to a simple one-shot of the same goal. If the
one-shot already meets the criteria, keep the one-shot.

## Sidecar

```markdown
### unix-compound · sidecar
**Phase** [name] | **Coverage** [x%] | **Depth** [n]
**Active** → `module`

| S | Module | Purpose | Interface |
|---|--------|---------|-----------|
| OK | … | … | … |
| >> | **name** | … | … | <- ACTIVE
| .. | … | … | … |

**Focus** …
**Goal Progress** x/y
**Decision** continue / lock / terminate
**Residuals** …
```

`OK` locked · `>>` active · `..` pending · `XX` discarded · `--` residual

## Anti-patterns

- Skipping `goal` and starting to build.
- Expanding a module instead of creating a new one.
- Building two modules in one step.
- Treating the sidecar as optional.
- Continuing after two low-impact cycles at ≥ 90%.
- Keeping a clever modular design when a one-shot already meets the goal.
- Shipping a high-scoring draft without merging real anti-patterns.

## Related

grill-execute-clear · to-spec · ralph-plan · ralph-loop · quality-loop · kill-context-bloat
