# AGENTS.md

You were handed this repository. Do not summarize it. Navigate it.

## What this is

A library of operational **agent skills**. Each skill is `skills/<name>/SKILL.md`
with YAML frontmatter (`name`, `description`) and a short body. Load **one skill
that matches the current job**. Do not ingest the whole library.

## Navigation

Follow this order. Do not skip a step.

1. Confirm cwd is this repo (`AGENTS.md` at the root, `skills/` next to it).
2. Classify the user ask as exactly one of: **use a workflow**, **install**,
   **edit this library**, **review a plan/diff**. If two apply, pick the first.
3. **Use a workflow** — go to the workflow map. First matching row wins. Open
   that `SKILL.md`. Read only the YAML `description`. If it does not match the
   ask, go to the next row. On a match, read the body and stop walking the map.
4. **Install** — run the commands in `README.md`. Do not invent `install.sh`.
5. **Edit this library** — `docs/AUTHORING.md`, then `python3 tools/validate.py`.
6. **Review a plan/diff** — `skills/review/SKILL.md`. ADR file shape is
   `skills/review/references/adr.md`.
7. Load a Related skill only when the body you are following hits that seam.
   Never open two skills "to compare."

## First 30 seconds (use a workflow on another repo)

1. Confirm you are in `Thingscorp/skills`.
2. Pick the first matching row in the map.
3. Read that `SKILL.md` frontmatter. No match → next row.
4. Follow the body on the *target* repo. Confirm cwd is that product before editing.
5. Do not copy skill text into the target `AGENTS.md`.

## Layout

| Path | What |
|---|---|
| `AGENTS.md` | This runbook |
| `README.md` | Install commands + library table |
| `CLAUDE.md` | Pointer at this file |
| `llms.txt` | Machine index of skills |
| `docs/AUTHORING.md` | How to add a skill |
| `docs/LANDMINES.md` | Claims that must not be softened |
| `docs/glossary.md` | Smart zone, phase tree, spec lifetime |
| `skills/<name>/SKILL.md` | The playbook |
| `skills/review/references/adr.md` | ADR template for `review` |
| `tools/validate.py` | Catalog + landmine check |
| `.github/workflows/validate.yml` | Runs the checker on push |
| `skills.sh.json` | skills.sh groupings |
| `.claude-plugin/` | Plugin manifests |

There is no `tools/install.sh`. There is no `docs/HARNESS-MATRIX.md`.
There is no `docs/CONFIG-SCHEMA.md`. Install is `npx skills`.

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

Full list: `docs/LANDMINES.md`. After edits: `python3 tools/validate.py`.

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
3. Load Related skills only at that seam. `review` ADR details live in
   `skills/review/references/adr.md`.
4. Do not copy skill text into AGENTS.md.

## Do not

- Load every SKILL.md "for context."
- Commit handoff docs or living specs into a target repo.
- Invent a conductor on top of these files.
- Add attribution footers.
- Follow paths this file says do not exist.
