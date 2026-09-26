# Quick start

For people. Agents should read `AGENTS.md` instead.

A skill is a folder with `SKILL.md` — YAML `name` + `description`, then the playbook.
Agents load the description first and the body only when the job matches
([Agent Skills spec](https://agentskills.io/specification)).

`AGENTS.md` is the always-on handbook for a repo ([agents.md](https://agents.md/)).
This library's `AGENTS.md` is the map. A product repo gets its own. Do not copy
skill text into a product `AGENTS.md`.

## Install

```bash
npx skills add Thingscorp/skills --list -y
npx skills add Thingscorp/skills --skill review -y
# or everything:
npx skills add Thingscorp/skills --all
```

```bash
gh skill install Thingscorp/skills --all
```

There is no `./tools/install.sh`.

## Pick a skill

Match the job, not the whole library. Literal jobs: `docs/NAMING.md`.

| You want to | Skill |
|---|---|
| Learn a strange repo | `learn-codebase` |
| Start a feature | `grill-execute-clear` |
| Review a diff | `review` |
| Run a ticket queue | `ralph-plan` then `ralph-loop` |
| Inventory a shipped product | `quality-loop` |

Full map: `AGENTS.md`.
Catalog: https://skills.sh/Thingscorp/skills

## Check the library itself

```bash
python3 tools/validate.py
```

## Update

```bash
npx skills list
npx skills check
npx skills update
```
