# ADR-0001: Flat operational skills library

Date: 2026-09-24
Status: Accepted

## Context
C4 level this binds: system
Need one public place for battle-tested agent playbooks that any SKILL.md harness can load. Product runtimes (Mininja, Pi, Devin) stay out.

## Drivers
- One job per folder
- No product MCP or machine paths
- Docs name only files that exist

## Options considered
- A — flat `skills/<name>/SKILL.md` library (won)
- B — product monorepo with harness adapters as the unit
- C — Claude-only plugin pack

## Decision
Ship `Thingscorp/skills` as a harness-neutral library. Each skill is `skills/<name>/SKILL.md`. Agents start at `AGENTS.md`. Humans start at `README.md`.

## Consequences
Easier: paste-the-URL navigation; `npx skills add Thingscorp/skills`.
Forbidden: living SPEC.md, phantom installers, copying product MCP skills here.

## Confirmation
`python3 tools/validate.py` exits 0. Fifteen `skills/*/SKILL.md` folders exist.
