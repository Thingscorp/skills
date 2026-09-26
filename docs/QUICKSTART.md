# Quick start

For people. Agents should read `AGENTS.md` instead.

A skill is a folder with a `SKILL.md`: YAML `name` + `description`, then the playbook.
Agents read the description first and load the body only when it matches the job.

`AGENTS.md` is different — always-on rules for *this* repo. Do not copy skill text into a product `AGENTS.md`.

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
