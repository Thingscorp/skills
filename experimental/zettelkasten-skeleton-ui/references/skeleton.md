# Skeleton of Thought, for UI

Skeleton of Thought, in its original form for language models: generate the skeleton of an answer first, a short outline of points, then expand each point in parallel, because points are normally independent. This file adapts that method to a surface. The skeleton is the outline of the user's job. Expansion is the detail of each section.

Naming: this file is the method. A file named `skeleton.md` inside a surface folder is that surface's working skeleton, written from `templates/skeleton.md`.

## Why it works here

A surface built point by point in reading order hides its own structure until the end, when change is most expensive. A skeleton makes the whole structure judgeable in one look, at the moment change is cheapest. It also separates two kinds of decision that are usually tangled:

- Order and completeness, decided once, in the skeleton.
- Detail and wording, decided per point, in expansion.

## Writing a good skeleton point

A point is one stage of the user's job, stated as what the user gets there. Every point, in every example and every working skeleton, carries all three parts: its job, its cards in brackets, and its success signal after a colon.

Good: "Judge: the four figures that say whether the pool is healthy [cards: pool-count, thesis-count, pool-health, thesis-health] : user can say whether the pool is healthy without opening a record"
Weak: "Stats section"
Weak: "Hero with cards and a chart"

Test each point:

1. Can a reader say what they will be able to do or know after this point, from the line alone?
2. Can this point be detailed by someone who has not seen the detail of any other point, apart from points it links to?
3. Does this point hold exactly one stage, with exactly one success signal?

## Recursion: child skeletons

A flat skeleton stops working when one point gathers more than its reader can judge in one look, or when its cards serve two success signals. Then:

- The parent point stays one line: hub job, hub card, one success signal.
- A child skeleton under it, in the same working `skeleton.md`, expands that point by the same laws: one line per sub-point, job, cards, signal.
- Nesting is by hub, not by folder. A point becomes a parent by being linked to, the same rule that makes a card a hub.
- Two levels cover most surfaces. A third level means the surface is probably two surfaces, split by role or by job, with shared cards referenced between them.

A container point and an overloaded point look alike from outside. The signal test separates them: one success signal across all its sub-points, a container. Two signals, an overloaded point that must split.

## Parallel expansion, honestly

Expansion runs in parallel only where independence is real.

- Build the dependency list from the card graph before expanding: for each point, list the points it `feeds`, `depends-on`, or `precedes`.
- Points with no path between them in that list expand in parallel.
- Points with a path expand in dependency order.
- A cycle in the graph is lawful when it is a live recalculation loop, for example items to total to displayed item prices. Record the cycle in `placement.md` with its entry point, the card a user action starts from. Expand the entry point first, then follow the cycle once. A cycle with no user action entry point is a design defect, not a loop.
- Record the lists in `placement.md`. An independence claim with no graph behind it is a guess.

## The integration pass

Parallel expansion creates one known risk: points drift apart. Close with one pass over all expanded points together:

- Same fact, same wording, in every point that mentions it.
- No fact stated in full in two points. The home point states it. Others link or point to it in one short reference. Exception: a card marked `restates` copies its home cards' wording exactly, for verification or receipt.
- Terms match `concept-table.md`: one canonical name per concept, everywhere, aliases recorded there and used nowhere on the surface.
- Cross-point actions land where they promise to land.
- Focus order follows skeleton order unless a variant declares otherwise.
- The last point closes the job the first point opened.

## Parity skeletons

When a proven surface exists, derive the skeleton from it by reading it, not by listing its routes.

Read for: the fixed order of its points, what sits beside what, which record contract repeats, where counts sit relative to lists, which fields never print, and which families form their own navigation group. Those are its skeleton laws. Write them as the skeleton, then test the card graph against them. A divergence needs a card level reason, recorded in `placement.md`. "It looked better" is not a card level reason.

## Viewport variants

The skeleton is one per surface. Its expression varies by viewport: a variant may merge sibling points into one container or split one point across screens. The variant is recorded in `placement.md`, never as a second skeleton. Links, success signals, and data homes do not vary. Order may vary only where the variant says so and says why.
