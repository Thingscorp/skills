# AGENTS.md

You were handed this repository. Do not summarize it. Navigate it.

## What this is

A library of operational **agent skills**. Each skill is `skills/<name>/SKILL.md`
with YAML frontmatter (`name`, `description`) and a short body. Load **one skill
that matches the current job**. Do not ingest the whole library.

15 skills on disk. Catalogs that must stay in lockstep: this file, `README.md`,
`llms.txt`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`,
`skills.sh.json`.

## First moves

1. Confirm cwd is this repo (`Thingscorp/skills`) or the user's target repo.
   Wrong repo is a stop.
2. If the user wants these skills on disk:
   `npx skills add Thingscorp/skills --list -y` then `--all` or `--skill <name> -y`
3. If they want a workflow *now*, pick the first matching row below. Read that
   `SKILL.md` before acting.
4. If they want to change this library, read `docs/AUTHORING.md` and run
   `python3 tools/validate.py`.

## Workflow map

Pick the first matching row. Stop. Read that skill.

| Situation | Skill | Path |
|---|---|---|
| Unfamiliar codebase | learn-codebase | skills/learn-codebase/SKILL.md |
| Starting a non-trivial feature | grill-execute-clear | skills/grill-execute-clear/SKILL.md |
| Feature will span sessions | to-spec | skills/to-spec/SKILL.md |
| Domain must become one-thing modules | unix-compound | skills/unix-compound/SKILL.md |
| Need a verified Ralph plan + items | ralph-plan | skills/ralph-plan/SKILL.md |
| Ticket queue must run across sessions | ralph-loop | skills/ralph-loop/SKILL.md |
| Independent Ralph lanes in parallel | ralph-swarm | skills/ralph-swarm/SKILL.md |
| Shipped product needs an honest test pass | quality-loop | skills/quality-loop/SKILL.md |
| Plan or diff needs a P0/P1/P2 read | review | skills/review/SKILL.md |
| Phase boundary (done? QA? switch?) | handoff | skills/handoff/SKILL.md |
| Same session, need room | compact | skills/compact/SKILL.md |
| Starting context is bloated | kill-context-bloat | skills/kill-context-bloat/SKILL.md |
| Session habits, rewind, permissions | session-hygiene | skills/session-hygiene/SKILL.md |
| What belongs in AGENTS.md | steering-push-vs-point | skills/steering-push-vs-point/SKILL.md |

`claude-code-habits` is an optional adapter over `session-hygiene` — only if this session is Claude Code.

## Doctrine that must not be softened

Full list: `docs/LANDMINES.md`. `python3 tools/validate.py` checks the phrases live in skills.

- Dumb-zone onset ≈ 150k tokens. A slope, not a cliff.
- Archive specs when code ships. Never leave a living `SPEC.md`.
- A goal loop on a whole spec is a trap. Spec + vertical tickets.
- Grill then execute in the same session.
- Settings edits often need quit/relaunch.
- Kill bloat for quality of attention, not spend min-maxing.
- Tickets are vertical slices, not layers.
- Default to pointers.
- Do not manufacture findings. Findings that encode a decision become ADRs.
- Docs describe shipped behavior.
- No fake eval.
- Confirm cwd is the named product before editing.
- Inferred facts are candidates, not commits.

## How to use a skill

1. Read the frontmatter `description`. No match → do not load the body.
2. Follow the steps. Honor anti-patterns.
3. Load Related skills only at that seam.
4. Do not copy skill text into AGENTS.md.

## Do not

- Load every SKILL.md "for context."
- Commit handoff docs or living specs into a target repo.
- Invent a conductor on top of these files.
- Add attribution footers.
- Copy Mininja / Pi / Devin product adapters into this pack.
