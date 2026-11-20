# UI-SCHEMA: <surface name>

The constitution for this surface. This file declares the vocabulary. The skill checks only what this file declares. Change a value here deliberately, in its own edit, never inside a card.

Create this file before any card on a new surface. Placement laws start empty. Never copy placement law examples from another kind of surface.

## Domain

<What this surface is for, in one or two sentences. A surface without a domain groups everything and links nothing.>

## Declared vocabulary

verbs: [feeds, depends-on, extends, applies, contradicts, supersedes, source, reuses, precedes]
types: [display, action, input, navigation, state]
statuses: [draft, seed, evergreen, archived]
tokens: [<token names only, for example color-ink, color-accent, radius-none. Values live at the pointer below, not in this file>]
values: [<closed data value sets this surface renders, in the form field: [a, b, c], for example order.status: [placed, shipped, delivered]. Open fields are not listed>]

## Placement laws

<The laws this surface keeps, one per line, stated so a check can fail. Write them from this surface's own material. No examples are given here on purpose: an example law copied from another surface is a defect.>

## Breakpoints

<Pointer to the breakpoint source of truth for this project, not a copy of it. Placement variants name their variant against this source.>

## Tokens

<Pointer to the token source of truth for this project, not a copy of it. The token names declared above are the vocabulary lint checks.>

## Locked decisions

<Decisions that stay locked on this surface, with dates. A later pass does not relitigate them without a contradicts card.>
