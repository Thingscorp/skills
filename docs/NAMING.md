# Naming

A name is the job. If an agent cannot tell what the file does from the path, rename it.

## Skills

- kebab-case, 1–64 chars, no `--`
- folder name = frontmatter `name`
- verb + object when possible (`cut-start-context`, not `hygiene`)
- one job per name
- no product or person names
- established search terms may stay (`ralph-loop`) if find/install already use them
- a method or principle name that is itself the established search term may
  stay on the same rule (`occams-razor-ui`, `zettelkasten-skeleton-ui`,
  `reverse-pyramid-writing`). Record its literal job in the table below so
  the name is a decision, not an accident.
- experimental skills follow these same rules. The name is re-checked at
  graduation, before the skill moves to `skills/` and enters the catalogs.

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
| cursor-habits | Cursor command names | `cursor-commands` |
| codex-habits | Codex command names | `codex-commands` |
| copilot-habits | Copilot CLI command names | `copilot-commands` |
| gemini-cli-habits | Gemini CLI command names | `gemini-commands` |
| material-color-system | generate measured color kits (MCU/HCT) for a UI | `generate-color-kit` |
| zettelkasten-skeleton-ui (experimental) | decide UI grouping and data placement before styling | keep (method names are the search terms) |
| occams-razor-ui (experimental) | audit a surface and cut, tuck, or keep each element | keep (principle name is the search term) |
| reverse-pyramid-writing (experimental) | write lead-first, in inverted pyramid order | keep (method name is the search term) |

Do not rename in place without updating README, AGENTS.md, llms.txt, plugin.json, marketplace.json, skills.sh.json, and Related lines.

Panel audit, 2026-11-26 (five judges, all 23 names, votes only): the set is
sound with its recorded exceptions (3-2, mean 0.652); the future names stay
deferred (4-1); the experimental method names keep (5-0); the section name
experimental keeps (5-0); material-color-system keeps its name and gets its
catalog wiring fixed (3-2). Worst name in the library, diagnostic only:
steering-push-vs-point (3 of 5). The adapter family split the panel (rename
to -commands at the next edit, all five together, 3 votes; rename now, 2
votes, higher mean), so no adapter rename is mandated.

## Files in this repo

| Kind | Pattern |
|---|---|
| Skill playbook | `skills/<name>/SKILL.md` |
| Skill reference | `skills/<name>/references/<topic>.md` |
| Skill template | `skills/<name>/templates/<artifact>.md` |
| Experimental skill | `experimental/<name>/SKILL.md` (same internal layout: `references/`, `templates/`) |
| Experimental index | `experimental/README.md` |
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
