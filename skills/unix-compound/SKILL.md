---
name: unix-compound
description: >-
  use this when a domain must become compounding one-thing modules —
  lock measurable criteria, decompose, build one module with a short
  VSR, stop at diminishing returns
license: MIT
metadata:
  portability: portable
---
# unix-compound

Turn a domain into single-purpose modules that talk via text streams.
Lock success first. Build one module at a time. Stop when returns flatten.
This is a process, not a framework.

## When

- A messy domain needs a small set of one-thing-well pieces.
- You would otherwise fatten one script, prompt, or skill to cover it all.
- You need a stop rule, not another pass "to be thorough."

Not for: draining a ticket queue (ralph-loop), inventorying a shipped
product (quality-loop), or grilling one feature (grill-execute-clear).

## Process

```
goal → skeleton → sequence? → (build → check)* → next
```

Emit the sidecar first in every response while this skill is running.

### 1. goal

Propose 3–5 binary or numeric criteria. Ask for hard constraints (time,
tools, budget). Lock them with the criteria.

If the owner does not lock after two proposals, proceed with the latest as
*provisional* and mark it. Longitudinal criteria may stay deferred.
Do not skip this step.

### 2. skeleton

Hierarchical decomposition into single-purpose modules. Apply the locked
constraints immediately. Prefer fewer modules. Cluster duplicates. Mark
multi-purpose items for throwaway. New capability = new module. Never
fatten an existing one.

### 3. sequence

Order and blockers only when dependencies exist. Skip when modules are
independent. Early classifier / router modules are expected blockers.

### 4. build

Implement the next unblocked module in its simplest viable form.
Inside build, run a short VSR: 2–4 variants → score → retain one.
Score: goal-fit, one-thing-well, simplicity. Keep a one-line lineage.
Do not implement two modules at once.

A high score is a rubric. It is not domain-ready. Hand-merge real
anti-patterns before locking anything an agent will run.

### 5. check

QA against "one thing well" and the locked criteria. If clumsy, throw
away and rebuild. Do not patch a multi-purpose module. A passing check
locks the module (`OK`).

### 6. next

Recurse to the next pending unblocked module.

- Goal progress ≥ 90% and residuals low-impact for two cycles → recommend stop.
- Third consecutive stall at ≥ 90% → force-stop.
- Before terminate: compare against a one-shot of the same goal. If the
  one-shot already meets the criteria, keep the one-shot.

## Sidecar (emit first)

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

Status: `OK` locked · `>>` active · `..` pending · `XX` discarded · `--` residual.
When the list exceeds ~8, show active + last 3 completed + goal progress.

## Rules

- One thing well. Text streams are the interface.
- Early try → throw away → rebuild.
- Equal utility → keep the simpler one. Never drop a constraint that carries utility.
- Do not add modules to *this skill* unless a real gap appears twice.

## Anti-patterns

- Skipping goal and "just starting."
- Expanding a module instead of creating a new one.
- Building two modules in one step.
- Treating the sidecar as optional.
- Continuing after two low-impact cycles at ≥ 90%.
- Keeping a clever modular design when a one-shot already meets the locked goal.
- Shipping a high-fitness draft without hand-merging real anti-patterns.

## Related

grill-execute-clear · to-spec · ralph-plan · quality-loop · kill-context-bloat
