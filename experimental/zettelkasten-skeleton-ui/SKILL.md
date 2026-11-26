---
name: zettelkasten-skeleton-ui
description: >-
  use this when a user interface must be grouped and organized before styling:
  atomic cards with typed links settle grouping, a one-line skeleton
  settles order and data placement
license: MIT
metadata:
  portability: portable
---
# zettelkasten-skeleton-ui

Decide grouping and organization before styling. Two questions decide
whether a UI holds together, and most failures come from answering them in
the wrong order, or answering one and guessing the other:

1. **What gets grouped?** Zettelkasten answers this: atomic UI cards, one
   job per card, typed links, per-field provenance.
2. **How does it get organized, and what data goes where?** Skeleton of
   Thought answers this: a one-line skeleton first, judged whole, then each
   point expanded in parallel, with data placed where its card is expanded.

Style answers neither. Do not style, pick components, or write layout code
until both answers exist on paper.

Keep in mind:

- A card is one job. If its title needs "and", it is two cards.
- A skeleton is the whole surface in one line per point. If you cannot
  write it, you do not yet know the surface.
- Data has one home. It lives where its card is expanded, nowhere else.
- A group is a link pattern, not a folder, a route, or a look.

## When

Use for a new surface (dashboard, app screen, admin, multi-step flow), a
parity rebuild or clone of a proven surface, a redesign of a surface that
passes tests but reads as scattered, or an audit of what is grouped wrong,
placed wrong, or homeless. Do not use for a single component fix, a copy or
token change with no grouping question, or motion and performance work
alone. This skill organizes material that exists; it does not invent
product scope.

Full method: `references/card-format.md`, `references/skeleton.md`,
`references/lint.md`. Forms for every working file: `templates/`.

## The two layers

**Raw layer, read only.** The material you organize: the brief, the data
model, API responses, content, research, screenshots of the real product,
and, for parity work, the proven surface itself. Capture raw before you
design, named with source and date, versioned (`raw/<name>-<YYYY-MM-DD>.md`),
never overwritten and never edited to fit a design. If raw is wrong, record
that in `disputes.md`, not in a card.

**Permanent layer, the cards.** Your compiled understanding: atomic cards,
the skeleton, and the placement spec, kept in a sibling folder outside the
app repo:

```text
<surface>-ui/
  UI-SCHEMA.md       the surface's own verbs, card types, tokens, placement laws
  raw/               captured sources, versioned, never edited after capture
  disputes.md        source conflicts, with the ruling or "open"
  cards/             one file per card, flat
  skeleton.md        the working skeleton, one line per point, in order
  placement.md       the placement spec: every card and field, placed
  index.md           every card, one line each
  concept-table.md   each durable concept, its canonical name, its aliases
  log.md             one dated line per operation
  inbox/             fleeting material, not yet cards
```

`UI-SCHEMA.md` overrides this skill. Read it first in every session; if a
project declares its own placement laws, verbs, or tokens, use those and
say so. A dimension the schema does not declare is not checked. Note the
name split: `skeleton.md` in a surface folder is that surface's working
skeleton; `references/skeleton.md` in this skill is the method. Never
confuse the two in a path. Shared cards live one level up in `<project>-ui-shared/cards/` with
namespaced ids like `shared:account-header`. A surface references a shared
card; it never copies one.

## Phase 1: Orient

1. Read `UI-SCHEMA.md`, the working `skeleton.md`, `index.md`, and the last
   `log.md` entries, if they exist. No schema: create it from
   `templates/ui-schema.md` before any card. Placement laws start empty;
   never copy placement law examples from another kind of surface.
2. Read raw in full. Do not design from a summary, a screenshot alone, or a
   route list.
3. State the primary job: one sentence per audience or role, each with its
   done signal.
4. Canonical naming: record each durable concept and field in
   `concept-table.md` with every alias the sources use. When two sources
   name one field differently, the canonical name is a ruling, recorded
   with its source. Recency wins ties, then the source closest to the data.
5. Disputes: when sources disagree, record both claims and their sources in
   `disputes.md`. A disputed job is ruled by: the role who does the job,
   then source authority, then recency. Until ruled, every card that rests
   on it carries `disputed: true`; a disputed card cannot become
   `evergreen` and cannot be built.

Incomplete raw does not stop the surface and is never invented away: list
each gap in `placement.md` under Raw gaps, name the cards it touches, keep
those cards at `draft`. Build is blocked for those cards only.

## Phase 2: Atomize, the Zettelkasten pass

One card per job, not per thing, not per route, not per component name. A
card is a job a person can complete or a fact a person can read in one
place. "Company profile" is a thing. "Founder confirms the company name and
domain match" is a job. Full format: `references/card-format.md`, form:
`templates/card.md`. New cards start at `draft`, move to `seed` when linked
and placed, and to `evergreen` when you would defend them as written and
they are not disputed.

**Three atomicity tests, in order:** (1) Title test: the title needs "and"
→ split, unless it is a true compound name. (2) Deletion test: delete one
clause; if the card still does one complete job, the clause was a second
card. (3) Link test: name two different cards linked to or from this one;
a card with no relatives is usually two half cards sharing a title.

**Page threshold:** a piece of raw earns a card when a person would need it
on its own, without the source in hand. Tie-break: a fact that only changes
how another card renders is a state or field of that card, not its own
card, even when the user must trust it. Its own card only when the user can
act on it separately, or it has its own success signal.

**Three origins of data.** Every field has exactly one origin, recorded in
the card's sources: `raw` (a path under `raw/` with a field anchor),
`user:<card-id>` (entered on this surface, at that card), or
`system:<card-id>` (produced by an action on this surface, at that card).
A field with none of the three is invented, and invented fields fail lint.
A `data_out` of one card is a legal `data_in` of another when the link
between them says so.

**Typed links, because "related" claims nothing.** Every link carries a
verb, a statement you can be wrong about: `feeds` (this card's output is
the target's input), `depends-on` (cannot render or work without the
target), `extends` (adds to the target's job without disagreeing),
`applies` (a general pattern or rule put to a specific case), `contradicts`
(demands what the target forbids; must be reciprocal; resolve before
build), `supersedes` (replaces the target, which stays on record), `source`
(the target is where this card's material came from), `reuses` (this
surface uses that exact shared card, by namespaced id), `precedes` (this
step completes before the target starts; order only, no data flows). If
none of the nine fits, propose the verb in `UI-SCHEMA.md` deliberately or
do not make the link. Structural containment is not a link: which skeleton
point holds a card lives in `placement.md`.

**Card kinds that are not one point:** a *persistent* card (needed at every
step, like a total) is placed once and listed as serving the other points;
a *shared* card is referenced, never copied, and counts once in the shared
registry; a *restating* card (review, confirmation) may state other cards'
facts in full but owns no field, accepts no edits, and reads every value by
link.

**Grouping rule:** group by link density, not resemblance. Cards that feed
and depend on each other belong near each other. Cards that merely look
alike, share a component, or share a route do not, on that basis alone. A
card becomes a hub by being linked to, not by location. Proximity on the
page must say the same thing the links say. Dense flow exception: when
almost every card links to almost every other, group by step instead:
cards sharing a `precedes` chain position and one success signal.

**Link floor, one rule everywhere:** every card has at least two outbound
links, or a stated reason, and at least one inbound link, or a stated
reason (a first card has no inbound by `precedes`; a terminal card may have
no outbound). End the phase with: every card indexed, the floor met or
reasoned, every `contradicts` link reciprocal and listed open, every
dispute flagged on the cards it touches.

## Phase 3: Skeleton, the Skeleton of Thought pass

Write the skeleton before expanding any card: the answer outline for the
user's job, in the order the user meets it. One line per point, holding
only the point's job, the cards it will expand, and its success signal. No
styling, no component names, no copy beyond a label. Method:
`references/skeleton.md`, form: `templates/skeleton.md`.

Skeleton laws:

1. Skeleton first, alone. Judge it as a whole picture before any point is
   detailed. A skeleton you cannot judge in one look is too detailed or
   carries too much.
2. Points are independent by default, so expansion can run in parallel.
   Independence is checked against the card graph, not assumed: where a
   point cannot expand until another is decided, the `feeds`, `depends-on`,
   or `precedes` link says so, and those points expand in sequence. A
   dependency cycle is permitted only as a live recalculation loop, marked
   in `placement.md` with its entry point, expanded first.
3. Order follows the job, not the data source. First point: what the user
   came to judge or do. Last point: completion, confirmation, or next step.
4. One point, one section, per viewport variant. A point that needs two
   sections in a variant was two points.
5. Parity law: if a proven surface exists, its order and grouping are the
   first skeleton. Change a point only where the card graph proves a
   break, and record the change and its reason in `placement.md`.
6. Recursion for large surfaces: when a point's cards serve more than one
   success signal, promote it to a child skeleton. One signal, a container;
   two signals wearing one label, an overloaded point.

## Phase 4: Placement spec, where the two passes meet

Write `placement.md` from `templates/placement.md`. This is the deliverable
the user approves before build. Four parts: (1) the skeleton in order,
child skeletons indented under their hub; (2) a placement matrix per point:
cards in reading order, each card's primary data, primary action, states,
and a display rule per field (`shown`, `held` meaning owned and used but
not printed, or `never` meaning in raw and deliberately unused); (3) data
homes: every field, its origin, its one home card, and every other card
that reads it by link; a field with no home is unplaced, a field with two
homes is a duplicate, both block build, and restating or referenced shared
cards are readers, never homes; (4) expansion order: which points expand
in parallel, which in sequence and why, and every cycle with its entry
point. Also record viewport variants, divergences from a parity skeleton
with reasons, open `contradicts` links, open disputes, raw gaps, and cards
left in `inbox/`.

Viewport variants: links and data homes are invariant across viewports;
order, grouping expression, and proximity may vary, and a variant may merge
or split points when its section of `placement.md` names the merge or
split. Lint compares each variant's render against that variant's rows.

No build starts without this spec. Proposing it and waiting for approval is
the contract.

## Phase 5: Expand in parallel

Expand each point into its full section spec, independently: a heading that
names the job in plain words; primary data first, secondary data behind
progressive disclosure; one primary action per point; every state named
(loading, empty, error, success, plus stale and degraded for any card with
a `cadence`); focus order following skeleton order unless a variant
declares otherwise and says why. Internal and held fields never print: a
field in raw is not a reason to show it. A card only one role may see names its
`audience`; a point that mixes audiences splits by role. A card reading
changing data declares `cadence` and `stale_after`; its placement row may
declare a dynamic order, which is not a divergence at lint time.

Then one integration pass across all points: cross-point links, duplicate
facts, term consistency against `concept-table.md`, one wording per fact.
Restating cards are the one exception, and they copy the home card's
wording exactly. When a raw source changes, capture the new version under
its new date, re-run lint, and reopen placement approval only for the cards
that cite that source, named from the index.

## Phase 6: Lint, report only

Lint reports; it never fixes on its own. Fixes are proposals the user
approves; then you re-lint and report the delta. Groups, in order:
structural (a reference that resolves to nothing, a card in no skeleton
point, a point with no cards), data homes (no home is structural, two homes
is duplication), vocabulary (a verb, type, status, token, or value outside
`UI-SCHEMA.md`), isolation (the link floor), duplication (the same job in
two cards, the same field in two homes; referenced shared cards and marked
restating cards exempt), contradiction and dispute (a one-sided or open
`contradicts`, a disputed card placed, built, or `evergreen`), provenance
(a shown field with no origin), and build fidelity (the built surface
diverges from its variant's placement rows, a card's links disagree with
its frontmatter, the index disagrees with the cards). Codes:
`references/lint.md`. Name every check that had no surface to examine:
not run is not a pass.

## Build, only after the spec passes

Build one skeleton point at a time, in skeleton order. Counts ride beside
the lists they count; actions sit beside the content they act on. Verify
each point by looking at the rendered surface at the sizes it ships at, not
by reading the build log. After build, re-run lint against the built
surface, per viewport variant.

## Verification checklist

- Raw was captured, versioned, and read in full, and no raw was edited.
- `UI-SCHEMA.md` was read, or created from the template before any card,
  with no placement laws copied from another kind of surface.
- Canonical names and aliases are in `concept-table.md`, and every source
  dispute is in `disputes.md` with the cards it touches flagged
  `disputed: true`.
- Every card passes the title, deletion, and link tests, and meets the
  link floor or carries its stated reason.
- Every field has one of the three origins, one home, and a display rule,
  and every link carries a declared verb.
- Every `contradicts` link is reciprocal, and no disputed card is placed,
  built, or `evergreen`.
- The skeleton was judged as a whole before expansion, child skeletons
  included, and every point has one success signal.
- Every point's expansion independence was checked against the card graph,
  and every cycle names its entry point.
- `placement.md` places every card and every data field, per viewport
  variant, with no unplaced field and no duplicate home.
- The user approved the placement spec before build.
- Lint ran after spec and after build, its delta was reported, and
  not-run checks were named.

## One-shot recipes

**New surface.** Bootstrap the schema, capture raw, orient and name
canonically, atomize to cards, write the skeleton, write the placement
spec, get approval, expand in parallel, lint, build point by point, lint
again.

**Parity rebuild.** Capture the proven surface as raw, skeleton first from
its own order, atomize its material into cards, diff your skeleton against
its skeleton, record each divergence with a reason, then build to the spec.
No freehand redesign beside it.

**Scattered surface audit.** Atomize the existing surface as built, not as
intended. Run lint. Report in lint order: structural first, then
vocabulary, isolation, duplication, contradiction, provenance, build
fidelity. Propose the new skeleton as the fix, not a list of tweaks.

**Dashboard.** Skeleton point 1 is judgment: the figures that say whether
things work. Then the records the user acts on. Then the one next action.
Reports and settings are later points, in that order, unless the card graph
proves a different job is primary.

**Transactional flow.** Cards first, then the skeleton from the `precedes`
chain, not from route names. Totals and identity are persistent cards.
Review and confirmation are restating cards. Recalculation is a cycle with
the user action card as its entry point. Sequence expands in chain order,
never in parallel across a `precedes` link.

## Sources

Principles adapted from Dmytro-Kopylov-personal/zettelkasten-skill
(MIT), combined with Skeleton of Thought (Ning et al., 2023).

## Anti-patterns

- Designing a screen, then inventing the grouping to fit it. The grouping
  is the design; the screen is its result.
- A card per thing instead of per job. Things make a catalogue; jobs make
  a surface a person can use.
- Grouping by route, folder, or visual similarity. None of those is a link.
- Styling a skeleton point before the skeleton as a whole was judged.
- Treating a proven surface as a route list to skin.
- Giving data two homes to make two sections feel full.
- Filing everything from raw. A surface that shows everything shows
  nothing first.
- Reporting a clean lint when checks could not run.
- Fixing lint findings silently during build.
- Letting one point carry the whole surface.

## Related
quality-loop · review · unix-compound
