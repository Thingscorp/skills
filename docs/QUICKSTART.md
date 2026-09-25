# Quick start

For people. Agents should read `AGENTS.md` instead.

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

## Be found

skills.sh lists a repo only after someone runs a real `npx skills add`
(not `--list`). `skills.sh.json` only groups the page once that happens.

GitHub About and Topics are set in the repo Settings UI. Suggested About:

> Operational agent skills. Flat SKILL.md playbooks. Install with npx skills add Thingscorp/skills.

Suggested topics: `agent-skills`, `skills`, `skil-md`, `ralph`, `adr`.
