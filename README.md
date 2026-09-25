# Skills, not syllabi

Operational **agent skills**. Each one tells an agent how to *do* a job.

Format: `skills/<name>/SKILL.md` — the Agent Skills standard. Works in any harness that loads SKILL.md.

Paste this repo into an agent and tell it to follow `AGENTS.md`.

## For agents

1. Read [`AGENTS.md`](AGENTS.md).
2. Install with a command below, or work from this checkout.
3. Load one skill at a time from `skills/<name>/SKILL.md`.
4. Use the workflow map in `AGENTS.md`. Do not load every skill.

## Install

CLI is `skills@1.7.0` (`npx skills`). Default install is a **symlink** into each detected agent. Scope is the current project unless `-g`.

```bash
# list what this repo exports (no install)
npx skills add Thingscorp/skills --list -y

# one skill, current project
npx skills add Thingscorp/skills --skill unix-compound -y

# every skill, every detected agent
npx skills add Thingscorp/skills --all

# try a skill without installing it
npx skills use Thingscorp/skills@unix-compound

# search the public catalog
npx skills find ralph-loop
npx skills find --owner Thingscorp
```

```bash
gh skill install Thingscorp/skills --all
gh skill install Thingscorp/skills unix-compound --agent cursor --scope user
```

Day-2:

```bash
npx skills list
npx skills check
npx skills update
```

`--list` cannot be combined with `--json`. Use `--list -y` to print names non-interactively.

skills.sh indexes a repo after real `npx skills add` telemetry. `skills.sh.json` only groups the repo page; it does not publish the catalog entry.

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
| `handoff` | Phase boundary. continue / clear / compact / handoff / subagent. |
| `compact` | Same agent, same directory, need room. Cast-iron case: implement → QA. |
| `kill-context-bloat` | Starting context is fat. Measure, cut, quit, relaunch, remeasure. |
| `session-hygiene` | Portable session habits. Floor checks, rewind, permissions. |
| `steering-push-vs-point` | What belongs in always-on AGENTS.md vs an on-demand skill. |

Harness-specific adapters (optional):

| Skill | Use it when |
|---|---|
| `claude-code-habits` | Claude Code command names for the portable session-hygiene skill. |
