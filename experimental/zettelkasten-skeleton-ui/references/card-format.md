# Card format

The full contract for an atomic UI card. The main skill gives the skeleton of the format. This file gives the rules and the reasons.

## Identity

File: `cards/<kebab-id>.md` in a surface folder, or `cards/<kebab-id>.md` in the shared registry with a namespaced id `shared:<kebab-id>`. The `id` in frontmatter matches the filename. Titles may change. IDs do not, because links and the placement spec are written against them.

## Frontmatter

| Field | Required | Meaning |
|---|---|---|
| `id` | yes | Stable kebab case identifier, matches filename. Shared cards carry the `shared:` prefix in references |
| `title` | yes | The claim this card makes about the surface, as a sentence you could disagree with |
| `job` | yes | The one job a person completes or the one fact a person reads here |
| `type` | yes | A list, first entry primary, from `UI-SCHEMA.md`. Starting set: `display`, `action`, `input`, `navigation`, `state`. Two entries are allowed when a card displays a field and accepts its edit on the same fields, for example `[display, input]` for a quantity shown and changed in place. Two jobs is still two cards: type is behavior, job is purpose |
| `status` | yes | `draft`, `seed`, `evergreen`, `archived`. New cards start at `draft` |
| `sources` | yes | One entry per `data_in` field, each in one of the three origin forms: a `raw/` path with a field anchor, `user:<card-id>`, or `system:<card-id>` |
| `data_in` | yes | Dotted field names, for example `order.total`, not bare names and not source names |
| `data_out` | no | Fields or decisions this card produces for other cards |
| `links` | yes | A list of `target` plus `verb`. Verbs are declared in `UI-SCHEMA.md` |
| `disputed` | no | `true` when a source dispute in `disputes.md` touches this card. Blocks `evergreen` and build |
| `placement` | no | `persistent` for a card that serves every point. Default is its one home point in `placement.md` |
| `restates` | no | A list of card ids whose facts this verification or receipt card may state in full. It owns no field |
| `audience` | no | The role that may see this card, when only one role may |
| `cadence` | no | How often this card's data updates, or `push`. Required when any `data_in` field changes after placement |
| `stale_after` | no | How long a value stays trustworthy, in plain units, for example `60s`. Pairs with `cadence` |

## Title is a claim, not a topic

"Order total" is a topic. "The total updates live as items change, not on submit" is a claim. A claim can be fed, depended on, extended, or contradicted. A topic can only be filed.

## Body

- First sentence: the claim, restated plainly. A reader who reads only first sentences across all cards should get the whole surface argument.
- Then: primary data, primary action, states, and evidence. Cite the source at the point of the claim.
- Last: a Links section that restates the frontmatter links as prose, with one line per link saying why it holds. Frontmatter is for finding. The body is for reading. If they drift, frontmatter wins and the body gets corrected (UI011).

## Status

- `draft`: written, not trusted. Every new card starts here. Expect revision.
- `seed`: linked, placed, and settled enough to build on, but thin.
- `evergreen`: you would defend it as written. A `disputed: true` card can never hold this status.
- `archived`: retired, kept for the record. A `supersedes` link from its replacement points here.

No status expires by age. A card is promoted when its evidence improves, not when a number of days passes.

## The link floor

At least two outbound links, or a stated reason in the Links section, and at least one inbound link, or a stated reason. Stated reasons name the case: first in a flow, terminal card, source card, shared reference. This is the only link threshold in the skill. The format states it here, Phase 2 states it in the workflow, UI006 checks it, and the checklist repeats it, in the same words.

## Data rules

- `data_in` names fields, not sources in general. "Order response" is not a field. `order.total` is.
- A field that appears in `data_in` of two cards has one home: the card that owns its display. The other card reads it by a `feeds` or `depends-on` link and does not restate it. Two exceptions, neither is a home: a card listed in `restates` may display it in full, and a referenced shared card keeps its home in the shared registry.
- A field's display rule is recorded in `placement.md`: `shown`, `held` (owned and used, never printed, such as a payment token), or `never` (present in raw, deliberately unused). UI004 counts homes among fields the surface uses, shown or held. A `never` field has no home and needs none.
- Internal fields stay in raw unless a card claims them. Being present in an API response is not a reason to list a field in any `data_in`.

## When a verb does not fit

That is information about the vocabulary, not about the link. Propose the new verb in `UI-SCHEMA.md` deliberately, with its meaning, or do not make the link. Do not reach for the nearest verb. The wrong verb is a small lie the graph tells on every later pass.

A surface where almost every link uses one verb is worth a look: either the surface really is one line of flow, or verbs are being assigned rather than chosen.
