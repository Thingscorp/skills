# Agent skills

[![validate](https://img.shields.io/github/actions/workflow/status/Thingscorp/skills/validate.yml?label=validate)](https://github.com/Thingscorp/skills/actions/workflows/validate.yml)
[![license](https://img.shields.io/github/license/Thingscorp/skills)](LICENSE)
[![skills.sh](https://img.shields.io/badge/skills.sh-catalog-blue)](https://skills.sh/Thingscorp/skills)

Playbooks in [`SKILL.md`](https://agentskills.io/specification) form. One job per skill. Not a course and not a runtime.

[`AGENTS.md`](AGENTS.md) is the always-on runbook for this library. A `SKILL.md` is one job, loaded when its description matches.

Works in Cursor, Claude Code, Codex, Copilot, Gemini CLI, and any harness that loads SKILL.md.

Agents: follow [`AGENTS.md`](AGENTS.md).
People: [`docs/QUICKSTART.md`](docs/QUICKSTART.md).
Catalog: [skills.sh/Thingscorp/skills](https://skills.sh/Thingscorp/skills).

## For agents

1. Read [`AGENTS.md`](AGENTS.md). That is the runbook.
2. Install with a command below, or work from this checkout.
3. Load **one** skill from `skills/<name>/SKILL.md` using the workflow map.
4. Do not load every skill.

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

## The library

| Skill | Use it when |
|---|---|
| `learn-codebase` | Unfamiliar repo. Sibling workspace, leveled passes, prove-it checks. |
| `grill-execute-clear` | Starting a feature. Grill the design, execute in the same session, clear after. |
| `to-spec` | Work that will not fit one smart-zone session. Destination spec + vertical tickets. |
| `unix-compound` | A domain must become compounding one-thing modules. Lock criteria, short VSR, stop. |
| `ralph-plan` | A Ralph topic needs a verified plan and item queue before the loop runs. |
| `ralph-loop` | A ticket queue must be worked across sessions. Gate outside the worker. |
| `ralph-swarm` | Independent Ralph lanes in parallel. Results under `refs/ralph/swarm`. |
| `quality-loop` | Shipped product needs an honest feature inventory and test pass. |
| `review` | A plan or diff needs a P0/P1/P2 read before it lands. Empty report is valid. |
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

## Edit this library

Read [`docs/AUTHORING.md`](docs/AUTHORING.md). After any skill change:

```bash
python3 tools/validate.py
```

Doctrine that must not regress: [`docs/LANDMINES.md`](docs/LANDMINES.md).
