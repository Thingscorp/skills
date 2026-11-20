# Placement spec: <surface name>

Date: <YYYY-MM-DD>
Primary job, per audience or role: <role: one sentence, done signal>
Parity source: <path or "none">

## Skeleton

1. <Point job> [cards: <id>, <id>] : <success signal>
2. <Point job> [cards: <id>] : <success signal>
   - Child skeleton, only when point 2 is a hub: <sub-point job> [cards: <id>] : <signal, same signal family as the parent>

## Placement matrix

| Point | Card | Primary data | Display rule | Primary action | States |
|---|---|---|---|---|---|
| 1 | <id> | <dotted.field> | shown | <verb + object> | loading, empty, error, success |
| 1 | <id> | <dotted.field> | held | <verb + object> | loading, empty, error, success |
| 2 | <id> | <dotted.field> | shown | <verb + object> | loading, empty, error, success |

Display rule is per field: shown, held (owned and used, never printed), or never (in raw, deliberately unused, no home needed).
Persistent cards: list the card once at its home point, then name the points it serves here: <id> serves points <n, n>.
Restating cards: list under their point with `restates:` and no data home.
Shared cards: list by namespaced id, `shared:<id>`, as a reference, never a copy.
Focus order: skeleton order, unless a variant below declares otherwise.

## Data homes

| Field | Origin | Home card | Read by (via link) |
|---|---|---|---|
| <dotted.field> | raw/<path#field> or user:<id> or system:<id> | <id> | <id> |

## Viewport variants

Links and data homes do not vary. Order, grouping expression, and proximity may.

| Variant | Breakpoint source | Change from base | Reason |
|---|---|---|---|
| <name, for example phone> | <UI-SCHEMA pointer> | <merge points n+n into one container, or split point n across screens, or order change> | <why> |

Dynamic order: <point or "none"> orders by <field>, declared here so lint UI010 does not fire on it.

## Expansion order

Parallel: <point numbers with no dependency path between them>
Sequence: <point A> before <point B>, because <feeds, depends-on, or precedes link>
Cycles: <card A -> card B -> card A, entry point card A, or "none">

## Divergences from the parity skeleton

| Point or card | Parity form | This spec | Reason, at card level |
|---|---|---|---|
| <id> | <form> | <form> | <reason> |

## Open contradictions and disputes

| Card A or source A | Card B or source B | Conflict | Resolution or "open, blocks build for the flagged cards" |
|---|---|---|---|
| <id> | <id> | <one line> | <decision> |

## Raw gaps

| Missing material | Cards it touches | Effect |
|---|---|---|
| <what raw does not contain> | <ids, held at draft> | build blocked for those cards only |

## Left in inbox, deliberately

- <idea>: <why it cleared no threshold, or why it waits>
