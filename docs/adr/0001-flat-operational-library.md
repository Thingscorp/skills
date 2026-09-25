# ADR-0001: Flat operational skills library

Date: 2026-09-24
Status: Accepted

## Context
Need one public place for battle-tested agent workflows. A product runtime or a course would hide the playbooks.

## Drivers
- One job per file an agent can load without the rest of the tree
- Installable by any harness that reads SKILL.md
- No attribution requirement

## Decision
Ship `Thingscorp/skills` as `skills/<name>/SKILL.md` folders. MIT. Agent entry is AGENTS.md. Human entry is README + docs/QUICKSTART.md.

## Consequences
Easier: paste the URL, load one skill.
Forbidden: a conductor skill, living SPEC.md in this repo, product MCP names as portable skills.
