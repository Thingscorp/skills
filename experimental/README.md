# Experimental

Skills under test. Not part of the library yet.

An experimental skill follows the same format as a library skill
(`<name>/SKILL.md`, frontmatter per `docs/AUTHORING.md`) but sits outside
every catalog: no `skills.sh.json` grouping, no plugin manifest entry, no
workflow map row, no README table row. Installers and `npx skills` do not
export it. Load it by path, on purpose, when a job matches its description.

A skill graduates to `skills/<name>/` when it has been run on real work and
held up: its own test record says what was tried, what failed, and what was
fixed. Graduation is one move plus the catalog wiring in
`docs/AUTHORING.md`, in a single change. A skill that stops being used is
archived, not left here to rot.

| Skill | Use it when | State |
|---|---|---|
| `zettelkasten-skeleton-ui` | A user interface must be grouped and organized before styling: atomic cards with typed links settle grouping, a one-line skeleton settles order and data placement. | Under test. Four recursive test rounds run 2026-11-20 (mechanical, adversarial, dry run, consistency audit); 26 merged fixes shipped into the skill. Re-tests on fresh surfaces are the open gate. |
