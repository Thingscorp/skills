# AGENTS.md

You were handed this repository. Do not summarize it. Navigate it.

## What this is

A library of operational skills for coding agents. Each skill is `skills/<name>/SKILL.md` with YAML frontmatter (`name`, `description`, `portability`) and a short body. Load **one skill that matches the current job**. Do not ingest the whole library.

This repo is not a bot, not an orchestra, not a course.

## First moves

1. If the user wants these skills available in their harness, install:
   - `npx skills add Thingscorp/skills`
   - or `gh skill install Thingscorp/skills`
   - or `./tools/install.sh --dest ~/.claude/skills` from a checkout
2. If the user wants you to *use* a workflow now, pick from the map below and read that SKILL.md before acting.
3. If the user wants you to change this library, read `docs/AUTHORING.md` and run `python3 tools/validate.py`.

## Workflow map

Pick the first matching row. Stop. Read that skill.

| Situation | Skill | Path |
|---|---|---|
| Unfamiliar codebase | learn-codebase | skills/learn-codebase/SKILL.md |
| Starting a non-trivial feature | grill-execute-clear | skills/grill-execute-clear/SKILL.md |
| Feature will span sessions | to-spec | skills/to-spec/SKILL.md |
| Ticket queue must run across sessions | ralph-loop | skills/ralph-loop/SKILL.md |
| Phase boundary (done? QA? switch agent/dir/person?) | handoff | skills/handoff/SKILL.md |
| Same session, need room, especially implement→QA | compact | skills/compact/SKILL.md |
| Starting context is bloated | kill-context-bloat | skills/kill-context-bloat/SKILL.md |
| Session habits, rewind, permissions | session-hygiene | skills/session-hygiene/SKILL.md |
| Claude Code-specific commands | claude-code-habits | skills/claude-code-habits/SKILL.md |
| Deciding what belongs in AGENTS.md | steering-push-vs-point | skills/steering-push-vs-point/SKILL.md |

Harness command equivalents: `docs/HARNESS-MATRIX.md` and `harness/<name>.md`.

## Doctrine that must not be softened

Full list: `docs/LANDMINES.md`. Short form:

- Dumb-zone onset ≈ 150k tokens. A slope, not a cliff. Do not keep grinding hard work past it.
- Archive specs when code ships. Never leave a living `SPEC.md` in the repo. Code is primary.
- `/goal` on a whole spec is a trap. Spec + vertical tickets.
- Grill then execute in the **same** session. Do not clear before execute.
- Settings edits often need a full quit/relaunch. Deny-without-relaunch is a false fix.
- Kill bloat for quality of attention, not spend min-maxing.
- Tickets are vertical slices, not DB-then-API-then-UI layers.
- Default to pointers. Push only short rules that are always true and always binding.

Canonical figures: `docs/glossary.md`.

## How to use a skill

1. Read the frontmatter `description`. If the trigger does not match, do not load the body.
2. Read the body. Follow the steps. Honor anti-patterns.
3. If the skill lists Related skills, load those only when you hit that seam.
4. Do not copy skill text into AGENTS.md. Point at the skill.

## Editing this library

- One job per skill. Trigger-first description, ≤40 words, unique first 8 words.
- Operational, not pedagogical. No curriculum language.
- Config, not forks: repo-specific values go in `.skills-config.yaml` (`docs/CONFIG-SCHEMA.md`).
- After any edit: `python3 tools/validate.py` must pass.

## Do not

- Load every SKILL.md "for context."
- Commit handoff docs or living specs into a target repo.
- Invent a conductor or multi-bot runtime on top of these files.
- Add attribution footers.
