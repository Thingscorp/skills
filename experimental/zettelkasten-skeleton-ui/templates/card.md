---
id: <kebab-id>
title: <the claim, as a sentence you could disagree with>
job: <the one job completed, or the one fact read, here>
type: [<display | action | input | navigation | state, first entry primary; two entries only when the card displays a field and accepts its edit on the same fields>]
status: draft
sources:
  - <one entry per data_in field: raw/<path#field> | user:<card-id> | system:<card-id>>
data_in: [<dotted.field>, <dotted.field>]
data_out: [<dotted.field or decision>]
links:
  - target: <card-id>
    verb: <feeds | depends-on | extends | applies | contradicts | supersedes | source | reuses | precedes>
  - target: <card-id>
    verb: <a second link, or replace both entries with one link plus the stated reason below>
# Optional, only when they apply: disputed: true | placement: persistent | restates: [<card-id>] | audience: <role> | cadence: <rate or push> | stale_after: <duration>
---

<The claim, in one sentence.>

<Primary data. Primary action. States: loading, empty, error, success, plus stale and degraded when cadence is set. Cite each source at the point of the claim.>

## Links

<The link floor: at least two outbound links, or a stated reason naming the case (first in a flow, terminal card, source card, shared reference), and at least one inbound link or its stated reason. One line per link:>

- **<verb>** [[<card-id>]]: <why this link holds, in one line>
- **<verb>** [[<card-id>]]: <why this link holds, in one line>
