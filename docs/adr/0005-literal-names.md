# ADR-0005: Literal names

Date: 2026-09-24
Status: Accepted

## Context
Several skill folders are insider phrases (`unix-compound`, `steering-push-vs-point`, `grill-execute-clear`). Agents discovering the repo should read the job from the name.

## Drivers
- Name is the job, kebab-case, folder equals frontmatter `name`
- Established search terms may stay if `npx skills find` already uses them
- A rename is a catalog break and needs a map in docs/NAMING.md

## Decision
New skills follow `docs/NAMING.md`. Existing folders keep current names until a dedicated rename PR updates every catalog. Preferred future names are listed there. Do not alias two folders for one skill.

## Consequences
Easier: next skill is named for the verb+object.
Forbidden: cute or private-product names (`mininja-*`, `jev-*`).
