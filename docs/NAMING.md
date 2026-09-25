# Naming

A name is the job. If an agent cannot tell what the file does from the path, rename it.

## Skills

- kebab-case, 1–64 chars, no `--`
- folder name = frontmatter `name`
- verb + object when possible (`cut-start-context`, not `hygiene`)
- one job per name
- no product or person names
- established search terms may stay (`ralph-loop`) if find/install already use them

## Preferred future names

| Current | Literal job | Future name |
|---|---|---|
| learn-codebase | get productive in an unfamiliar repo | keep |
| grill-execute-clear | grill design, then build in the same session | `grill-then-build` |
| to-spec | write a destination spec and vertical tickets | `spec-and-tickets` |
| unix-compound | split a domain into one-thing modules | `one-thing-modules` |
| ralph-plan | write a verified ticket plan | keep (`ralph` is the search term) |
| ralph-loop | run that ticket queue across sessions | keep |
| ralph-swarm | run independent ticket lanes | keep |
| quality-loop | inventory features from code and test them | `feature-audit` |
| review | P0/P1/P2 read of a plan or diff | keep |
| handoff | choose the phase-boundary action | keep |
| compact | shrink this session with one-line focus | `shrink-session` |
| kill-context-bloat | cut always-on starting context | `cut-start-context` |
| session-hygiene | portable session habits | `session-habits` |
| steering-push-vs-point | always-on rules vs on-demand skills | `always-on-vs-on-demand` |
| claude-code-habits | Claude Code command names | `claude-code-commands` |

Do not rename in place without updating README, AGENTS.md, llms.txt, plugin.json, marketplace.json, skills.sh.json, and Related lines.

## Files in this repo

| Kind | Pattern |
|---|---|
| Skill playbook | `skills/<name>/SKILL.md` |
| Skill reference | `skills/<name>/references/<topic>.md` |
| Agent runbook | `AGENTS.md` |
| Human install | `README.md`, `docs/QUICKSTART.md` |
| Doctrine | `docs/LANDMINES.md`, `docs/glossary.md` |
| Decision | `docs/adr/NNNN-short-slug.md` |
| Checker | `tools/validate.py` |

## Components

- `tools/` — repo checks, not product runtime
- `.claude-plugin/` — install manifests only
- `docs/adr/` — decisions that bind this library
- No `harness/`, no `examples/`, no `install.sh`
