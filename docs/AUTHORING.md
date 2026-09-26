# Authoring a skill

Skills are flat, self-contained, and operational. Each one is a playbook for
**doing** a task with an agent — never a playbook for **teaching** one.

## Frontmatter schema

Follow [agentskills.io/specification](https://agentskills.io/specification).
`name` must match the folder. Custom fields go under `metadata`.

```yaml
---
name: dashed-name
description: >-
  use this when <trigger situation> — <what it gives you>
license: MIT
metadata:
  portability: portable   # portable | claude-code | cursor | codex | copilot | gemini-cli
---
```

| Field | Required | Notes |
|---|---|---|
| `name` | yes | kebab-case, 1–64 chars, matches folder, no `--` |
| `description` | yes | 1–1024 chars. Trigger + keywords. House rubric: start with "use this when", ≤40 words, unique first 8 words. |
| `license` | no | Use `MIT` (repo license). |
| `compatibility` | no | Only if the skill needs a specific runtime. |
| `metadata` | no | String map. We store `portability` here. |
| `allowed-tools` | no | Experimental space-separated string. Do not use an array. |

Do not put `portability` at the top level. Agents that validate the spec will reject unknown keys.

## Add a skill in 5 minutes

1. Create `skills/<dashed-name>/SKILL.md`.
2. Use the frontmatter above.
3. Body: keep it short. One H1, a few H2 sections, bullets over prose.
   - **When** — the trigger situation.
   - **Steps / rules** — the operational content.
   - **Anti-patterns** — what not to do (if any). Do not restate the section above.
   - **Related** — other skills in this library, when a workflow spans them.
4. Check the folder name equals `name`.
5. Wire every catalog so a discovering agent still finds it:
   - `README.md` library table
   - `AGENTS.md` workflow map
   - `llms.txt` skill list
   - `.claude-plugin/plugin.json`
   - `.claude-plugin/marketplace.json`
   - `skills.sh.json` grouping
6. Run `python3 tools/validate.py`. It greps landmine phrases in `skills/*/SKILL.md` only.

## Rules

- **Operational, not pedagogical.** No curriculum language.
- **One job per skill.** If it needs a second trigger sentence, split it.
- **Self-contained.** Cross-link with a `## Related` H2. Never assume another skill is loaded.
- **Portability.** Doctrine stays portable. Harness command names belong in the matching adapter (`claude-code-habits`, `cursor-habits`, `codex-habits`, `copilot-habits`, `gemini-cli-habits`) or a harness note, not in the portable body. No default adapter.
- **Docs describe shipped behavior.** Do not document a private product runtime
  (paths, MCP tool names, Compose networks) as if it were a portable skill.
- Do not point at files that are not in this repo (`docs/HARNESS-MATRIX.md`, `harness/`, `./tools/install.sh`).
- **Progressive disclosure.** Agents load `name` + `description` first. Keep `SKILL.md` under 500 lines. Put rare detail in `references/` and name the trigger that loads it (review already does this for ADRs).
- **No orchestration runtime.** LangGraph, CrewAI, AutoGen, Swarm SDKs, and Temporal stay outside this library. Parallel work is `ralph-swarm`. A ticket queue is `ralph-loop`. Do not add a conductor skill.
