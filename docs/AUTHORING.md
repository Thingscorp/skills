# Authoring a skill

Skills are flat, self-contained, and operational. Each one is a playbook for
**doing** a task with an agent — never a playbook for **teaching** one.

## Add a skill in 5 minutes

1. Create `skills/<dashed-name>/SKILL.md`.
2. Frontmatter:

```yaml
---
name: dashed-name
description: >-
  use this when <trigger situation> — <what it gives you>
portability: portable  # portable | claude-code
---
```

Description rubric (CI-enforced): **trigger-first** (starts with "use this
when"), **≤40 words**, **unique first 8 words** across the library (so
model-invoked discovery doesn't misfire).

3. Body: keep it short. One H1, a few H2 sections, bullets over prose.
   - **When** — the trigger situation.
   - **Steps / rules** — the operational content.
   - **Anti-patterns** — what not to do (if any).
   - **Related** — other skills in this library, when a workflow spans them.
4. Run `python3 tools/validate.py` — must pass.

## Rules

- **Operational, not pedagogical.** No "coach", "curriculum", "quiz", or
  lesson-teaching framing. If a skill tells someone how to teach something,
  it doesn't belong here.
- **One job per skill.** If it needs a second trigger sentence, split it.
- **Self-contained.** Cross-link with a `## Related` H2 section listing
  skill names (optional, but required when a workflow spans skills);
  never assume another skill is loaded.
- **Configuration, not forks.** If a skill needs a repo-specific value
  (commands, paths, tracker), register it in `tools/config.py` SCHEMA
  and document it in `docs/CONFIG-SCHEMA.md` — never hardcode it, never
  fork the skill body per repo.
- **Portability.** Mark `portability:` honestly. Harness-specific
  mechanics go in `harness/<kind>.md` + `docs/HARNESS-MATRIX.md`; the
  skill body stays portable doctrine.
- **Canonical phrases stay verbatim.** `docs/LANDMINES.md` lists doctrine
  that must not regress — validate.py enforces it.
