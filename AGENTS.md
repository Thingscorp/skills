# AGENTS.md

You were handed this repository. Do not summarize it. Navigate it.

## What this is

A library of operational **agent skills**. Each skill is `skills/<name>/SKILL.md`
with YAML frontmatter (`name`, `description`) and a short body. The format is
the Agent Skills standard. Load **one skill that matches the current job**.
Do not ingest the whole library.

This repo is not a bot, not an orchestra, not a course, not a single-harness plugin.

## First moves

1. If the user wants these skills available in their harness, install:
   - `npx skills add Thingscorp/skills --list -y`
   - `npx skills add Thingscorp/skills --skill <name> -y`
   - or `gh skill install Thingscorp/skills`
   Those commands write SKILL.md folders into whichever compatible agents are
   on the machine. Default scope is the current project. `-g` is user-level.
2. If the user wants you to *use* a workflow now, pick from the map below and
   read that SKILL.md before acting.
3. If the user wants you to change this library, read `docs/AUTHORING.md`.
   One job per skill. No attribution footers.

## Workflow map

Pick the first matching row. Stop. Read that skill.

| Situation | Skill | Path |
|---|---|---|
| Unfamiliar codebase | learn-codebase | skills/learn-codebase/SKILL.md |
| Starting a non-trivial feature | grill-execute-clear | skills/grill-execute-clear/SKILL.md |
| Feature will span sessions | to-spec | skills/to-spec/SKILL.md |
| Domain must become one-thing modules | unix-compound | skills/unix-compound/SKILL.md |
| Goal must become a Ralph plan | ralph-plan | skills/ralph-plan/SKILL.md |
| Ticket queue must run across sessions | ralph-loop | skills/ralph-loop/SKILL.md |
| Independent goals in parallel clones | ralph-swarm | skills/ralph-swarm/SKILL.md |
| Shipped product needs an honest test pass | quality-loop | skills/quality-loop/SKILL.md |
| Plan or diff needs a P0/P1/P2 read | review | skills/review/SKILL.md |
| Phase boundary (done? QA? switch?) | handoff | skills/handoff/SKILL.md |
| Same session, need room, implement→QA | compact | skills/compact/SKILL.md |
| Starting context is bloated | kill-context-bloat | skills/kill-context-bloat/SKILL.md |
| Session habits, rewind, permissions | session-hygiene | skills/session-hygiene/SKILL.md |
| What belongs in always-on AGENTS.md | steering-push-vs-point | skills/steering-push-vs-point/SKILL.md |

`claude-code-habits` is an optional adapter over `session-hygiene` — load it
only if this session is Claude Code.

## Doctrine that must not be softened

Full list: `docs/LANDMINES.md`. Short form:

- Dumb-zone onset ≈ 150k tokens. A slope, not a cliff.
- Archive specs when code ships. Never leave a living `SPEC.md`.
- A goal loop on a whole spec is a trap. Spec + vertical tickets.
- Grill then execute in the **same** session.
- Settings edits often need a full quit/relaunch.
- Kill bloat for quality of attention, not spend min-maxing.
- Tickets are vertical slices, not layer cakes.
- Default to pointers. Push only short always-true rules.
- Do not manufacture findings. Decision-grade findings become ADRs.

Canonical figures: `docs/glossary.md`.

## How to use a skill

1. Read the frontmatter `description`. If the trigger does not match, do not load the body.
2. Read the body. Follow the steps. Honor anti-patterns.
3. If the skill lists Related skills, load those only when you hit that seam.
4. Do not copy skill text into AGENTS.md. Point at the skill.

## Editing this library

- One job per skill. Trigger-first description, ≤40 words, unique first 8 words.
- Operational, not pedagogical. No curriculum language.
- `portability` lives under `metadata`, not at the top level.

## Do not

- Load every SKILL.md "for context."
- Commit handoff docs or living specs into a target repo.
- Invent a conductor or multi-bot runtime on top of these files.
- Add attribution footers.
