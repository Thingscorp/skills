# Skills, not syllabi

Operational **agent skills**. Each one tells an agent how to *do* a job.

Format: `skills/<name>/SKILL.md` — the [Agent Skills](https://agentskills.io/specification) standard.
Works in Cursor, Claude Code, Codex, and any harness that loads SKILL.md.

Keywords: agent skills, SKILL.md, npx skills, ralph-loop, coding agents, AGENTS.md.

Paste this repo into an agent and tell it to follow [`AGENTS.md`](AGENTS.md).
People: start at [`docs/QUICKSTART.md`](docs/QUICKSTART.md).

## For agents

1. Read [`AGENTS.md`](AGENTS.md). That is the runbook.
2. Install with a command below, or work from this checkout.
3. Load **one** skill from `skills/<name>/SKILL.md` using the workflow map.
4. Do not load every skill.

## Install

CLI is `npx skills` (package `skills`, current line is 1.7.x). Default install is a **symlink** into each detected agent. Scope is the current project unless `-g`.

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

Day-2:

```bash
npx skills list
npx skills check
npx skills update
```

`--list` cannot be combined with `--json`. Use `--list -y` to print names non-interactively.

[skills.sh](https://skills.sh) indexes a repo after a real `npx skills add Thingscorp/skills`
(not `--list`). `skills.sh.json` only groups the page once that telemetry exists.
Until then `https://skills.sh/Thingscorp/skills` is 404. That is expected.

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

Harness-specific adapters (optional):

| Skill | Use it when |
|---|---|
| `claude-code-habits` | Claude Code command names for the portable session-hygiene skill. |

This `ralph-loop` is a portable ticket-queue contract (gate outside the worker,
`.ralph/` state). It is not the mikeyobrien / clawdbot / eliteai runner CLIs.

## Edit this library

Read [`docs/AUTHORING.md`](docs/AUTHORING.md). After any skill change:

```bash
python3 tools/validate.py
```

Doctrine that must not regress: [`docs/LANDMINES.md`](docs/LANDMINES.md).

## Public surface

Set these on the GitHub About panel (files cannot):

- Description: `Operational agent skills. Flat SKILL.md playbooks. npx skills add Thingscorp/skills`
- Topics: `agent-skills`, `skill-md`, `agents-md`, `ralph-loop`, `coding-agents`
- Website: `https://skills.sh/Thingscorp/skills` after the first real install indexes it
