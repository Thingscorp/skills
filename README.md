# Skills, not syllabi

Operational agent skills. Each one tells an agent how to *do* a job. None of them teach a class.

Paste this repo into an agent and tell it to follow `AGENTS.md`.

## For agents

1. Read [`AGENTS.md`](AGENTS.md).
2. Install with the command there, or work from this checkout.
3. Load one skill at a time from `skills/<name>/SKILL.md`.
4. Use the workflow map in `AGENTS.md` — do not load every skill.

Humans can ignore that and use the install commands below.

## Install

```bash
npx skills add Thingscorp/skills
```

```bash
gh skill install Thingscorp/skills
```

```text
# Claude Code marketplace
/plugin marketplace add Thingscorp/skills
```

From a checkout:

```bash
./tools/install.sh --dest ~/.claude/skills
```

List skills first:

```bash
npx skills add Thingscorp/skills --list
```

## The library

| Skill | Use it when |
|---|---|
| `learn-codebase` | Unfamiliar repo. Sibling workspace, leveled passes, prove-it checks. |
| `grill-execute-clear` | Starting a feature. Grill the design, execute in the same session, clear after. |
| `to-spec` | Work that will not fit one smart-zone session. Destination spec + vertical tickets in the tracker. |
| `ralph-loop` | A ticket queue must be worked across sessions. One item per iteration. Gate outside the worker. |
| `handoff` | Phase boundary. Ordered tree: continue / clear / compact / handoff / subagent. |
| `compact` | Same agent, same directory, need room. One-line focus. Cast-iron case: implement → QA. |
| `kill-context-bloat` | Starting context is fat. Measure, cut, quit, relaunch, remeasure. |
| `session-hygiene` | Portable session habits. Floor checks, rewind, permissions. |
| `claude-code-habits` | Claude Code instance of session-hygiene (`/context`, `/rewind`, bash modes). |
| `steering-push-vs-point` | What belongs in always-on AGENTS.md vs an on-demand skill. |

## Layout

```
AGENTS.md            runbook for agents that were handed this URL
CLAUDE.md            pointer at AGENTS.md
llms.txt             sitemap
skills/              one directory per skill, SKILL.md inside
docs/                authoring, config schema, harness matrix, landmines, glossary
harness/             claude-code and muse adapters
tools/               install.sh, validate.py, config.py, usage-report.py
examples/            annotated .skills-config.yaml
```

## Configure

Repo differences live in config, never in forked skill bodies.

```bash
cp examples/skills-config.yaml <repo>/.skills-config.yaml
python3 tools/config.py validate --repo <repo>
python3 tools/config.py resolve --repo <repo> --skill to-spec
```

Schema: `docs/CONFIG-SCHEMA.md`.

## Validate

```bash
python3 tools/validate.py
```
