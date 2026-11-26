# Agent skills

[![validate](https://img.shields.io/github/actions/workflow/status/Thingscorp/skills/validate.yml?label=validate)](https://github.com/Thingscorp/skills/actions/workflows/validate.yml)
[![license](https://img.shields.io/github/license/Thingscorp/skills)](LICENSE)
[![skills.sh](https://img.shields.io/badge/skills.sh-catalog-blue)](https://skills.sh/Thingscorp/skills)

Flat **SKILL.md playbooks** — one job per skill. Not a course and not a runtime.

[`AGENTS.md`](AGENTS.md) is the always-on runbook for this library. A `SKILL.md` is one job, loaded when its description matches.

Works in Cursor, Claude Code, Codex, Copilot, Gemini CLI, and any harness that loads SKILL.md.

Agents: follow [`AGENTS.md`](AGENTS.md).
People: [`docs/QUICKSTART.md`](docs/QUICKSTART.md).
Catalog: [skills.sh/Thingscorp/skills](https://skills.sh/Thingscorp/skills).

## Quickstart

```bash
# try a skill without installing it
npx skills use Thingscorp/skills@review

# install one skill into the current project
npx skills add Thingscorp/skills --skill review -y
```

## Install

CLI is `npx skills` (package `skills`). Default install is a **symlink** into each detected agent. Scope is the current project unless `-g`.

```bash
# list what this repo exports (no install)
npx skills add Thingscorp/skills --list -y

# one skill, current project
npx skills add Thingscorp/skills --skill review -y

# every skill, every detected agent
npx skills add Thingscorp/skills --all

# try a skill without installing it
npx skills use Thingscorp/skills@review

# search the public catalog
npx skills find ralph-loop
npx skills find --owner Thingscorp
```

```bash
gh skill install Thingscorp/skills --all
gh skill install Thingscorp/skills review --agent cursor --scope user
```

After install:

```bash
npx skills list
npx skills check
npx skills update
```

`--list` cannot be combined with `--json`. Use `--list -y` to print names non-interactively.

There is no `./tools/install.sh`.

## Usage

Load **one** skill per job from `skills/<name>/SKILL.md` using the workflow map — never all of them. Descriptions are the trigger text; match the job, load the file.

| Skill | Use it when |
|---|---|
| `review` | A plan or diff needs a P0/P1/P2 read before it lands. Empty report is valid. |
| `quality-loop` | Shipped product needs an honest feature inventory and test pass. |
| `learn-codebase` | Unfamiliar repo. Sibling workspace, leveled passes, prove-it checks. |
| `grill-execute-clear` | Starting a feature. Grill the design, execute in the same session, clear after. |
| `to-spec` | Work that will not fit one smart-zone session. Destination spec + vertical tickets. |
| `writing-plans` | A spec is settled. Bite-sized tasks with exact files, interfaces, tests, expected output. |
| `executing-plans` | A written plan, worked in this session. Task by task in order, a check at each step, a ledger throughout. |
| `unix-compound` | A domain must become compounding one-thing modules. Lock criteria, short VSR, stop. |
| `material-color-system` | A UI color must be chosen, generated, fixed, or judged. Whole system from one source in HCT, every pair measured. |
| `ralph-plan` | A Ralph topic needs a verified plan and item queue before the loop runs. |
| `ralph-loop` | A ticket queue must be worked across sessions. Gate outside the worker. |
| `ralph-status` | The current state of a Ralph loop. Branch, run state, item counts, next eligible item. |
| `ralph-stop` | A Ralph loop must halt. Run state to stopped, item queue untouched, confirmed on read-back. |
| `ralph-swarm` | Independent Ralph lanes in parallel. Results under `refs/ralph/swarm`. |
| `systematic-debugging` | A bug or failure resists the first fix. Root cause with evidence before any fix. |
| `verification-before-completion` | About to claim done, fixed, passing, or ready. Run the proving command fresh, read the output, then claim. |
| `handoff` | Phase boundary. continue / clear / compact / handoff / subagent. |
| `compact` | Same agent, same directory, need room. Cast-iron case: implement → QA. |
| `kill-context-bloat` | Starting context is fat. Measure, cut, quit, relaunch, remeasure. |
| `session-hygiene` | Portable session habits. Floor checks, rewind, permissions. |
| `steering-push-vs-point` | What belongs in always-on AGENTS.md vs an on-demand skill. |

Harness-specific adapters (optional). Load only the one that matches this session:

| Skill | Use it when |
|---|---|
| `claude-code-habits` | Claude Code command names for session-hygiene. |
| `cursor-habits` | Cursor command names for session-hygiene. |
| `codex-habits` | Codex command names for session-hygiene. |
| `copilot-habits` | Copilot CLI command names for session-hygiene. |
| `gemini-cli-habits` | Gemini CLI command names for session-hygiene. |

Full map: [`AGENTS.md`](AGENTS.md). Names: [`docs/NAMING.md`](docs/NAMING.md).

This `ralph-loop` is a portable ticket-queue contract (gate outside the worker,
`.ralph/` state). It is not the mikeyobrien / clawdbot / eliteai runner CLIs.

## Experimental

Skills under test live in [`experimental/`](experimental/README.md). They are
not in the catalogs, the workflow map, or the install set. Load one by path,
on purpose, when a job matches it.

## For agents

1. Read [`AGENTS.md`](AGENTS.md). That is the runbook.
2. Install with a command from `## Install` above, or work from this checkout.
3. Load **one** skill from `skills/<name>/SKILL.md` using the workflow map.
4. Do not load every skill.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). Read [`docs/AUTHORING.md`](docs/AUTHORING.md) before editing a skill, and run `python3 tools/validate.py` after any skill change. Doctrine that must not regress: [`docs/LANDMINES.md`](docs/LANDMINES.md).

## License

MIT. See [`LICENSE`](LICENSE).
