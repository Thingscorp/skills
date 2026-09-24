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

```bash
npx skills add Thingscorp/skills
```

```bash
gh skill install Thingscorp/skills
```

That copies the SKILL.md folders into whichever agents are on the machine.

From a checkout:

```bash
./tools/install.sh --dest <skills-dir>
```

`<skills-dir>` is harness-specific (`.agents/skills`, `.cursor/skills`, `~/.claude/skills`, …). See `docs/HARNESS-MATRIX.md` when that file is present.

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
| `steering-push-vs-point` | What belongs in always-on AGENTS.md vs an on-demand skill. |

Harness-specific adapters (optional):

| Skill | Use it when |
|---|---|
| `claude-code-habits` | Claude Code command names for the portable session-hygiene skill. |

## Layout

```
AGENTS.md            runbook for agents handed this URL
CLAUDE.md            pointer at AGENTS.md (Claude Code looks here)
llms.txt             sitemap
skills/              one directory per skill, SKILL.md inside
docs/                authoring, config, harness matrix, landmines, glossary
harness/             per-harness command adapters
tools/               install.sh, validate.py, config.py
examples/            annotated .skills-config.yaml
```

## Configure

Repo differences live in config, never in forked skill bodies.

```bash
cp examples/skills-config.yaml <repo>/.skills-config.yaml
python3 tools/config.py validate --repo <repo>
```

## Validate

```bash
python3 tools/validate.py
```
