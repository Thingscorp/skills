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

List first:

```bash
npx skills add Thingscorp/skills --list
```

Install all detected skills into agents on this machine:

```bash
npx skills add Thingscorp/skills --all
```

One skill, non-interactive:

```bash
npx skills add Thingscorp/skills --skill quality-loop -y
```

GitHub CLI (v2.90+):

```bash
gh skill install Thingscorp/skills --all
gh skill install Thingscorp/skills quality-loop --agent cursor --scope user
```

Bare `npx skills add Thingscorp/skills` and `gh skill install Thingscorp/skills` are interactive pickers. Default scope is the current project. `-g` / `--scope user` writes to the user-level skills dir.

Copy from a checkout if you want a dest the CLIs do not cover:

```bash
cp -R skills/<name> <skills-dir>/<name>
```

## The library

| Skill | Use it when |
|---|---|
| `learn-codebase` | Unfamiliar repo. Sibling workspace, leveled passes, prove-it checks. |
| `grill-execute-clear` | Starting a feature. Grill the design, execute in the same session, clear after. |
| `to-spec` | Work that will not fit one smart-zone session. Destination spec + vertical tickets in the tracker. |
| `ralph-loop` | A ticket queue must be worked across sessions. One item per iteration. Gate outside the worker. |
| `quality-loop` | Shipped product needs an honest feature inventory and test pass. Discover from code, test, fix, regress, loop. |
| `handoff` | Phase boundary. Ordered tree: continue / clear / compact / handoff / subagent. |
| `compact` | Same agent, same directory, need room. One-line focus. Cast-iron case: implement → QA. |
| `kill-context-bloat` | Starting context is fat. Measure, cut, quit, relaunch, remeasure. |
| `session-hygiene` | Portable session habits. Floor checks, rewind, permissions. |
| `steering-push-vs-point` | What belongs in always-on AGENTS.md vs an on-demand skill. |

Harness-specific adapters (optional):

| Skill | Use it when |
|---|---|
| `claude-code-habits` | Claude Code command names for the portable session-hygiene skill. |

## Layout

```
AGENTS.md            runbook for agents handed this URL
CLAUDE.md            pointer at AGENTS.md
llms.txt             sitemap
skills/<name>/       one skill folder, SKILL.md inside
docs/                authoring, landmines, glossary
.claude-plugin/      Claude marketplace adapter
```

## Frontmatter

Each `SKILL.md` starts with YAML. Spec fields ([agentskills.io](https://agentskills.io/specification)):

| Field | Required | Notes |
|---|---|---|
| `name` | yes | kebab-case, matches folder, max 64 |
| `description` | yes | what it does and when to use it, max 1024 chars |
| `license` | no | |
| `compatibility` | no | environment requirements |
| `metadata` | no | string map |
| `allowed-tools` | no | experimental |

This library also sets `portability: portable` or `portability: claude-code`. That is a house field. Spec-compliant runtimes ignore unknown keys.
