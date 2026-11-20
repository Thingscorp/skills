# UI lint

Report only. Never fix without approval. A finding is a claim about the cards, the skeleton, the placement spec, or the rendered surface, not a verdict on taste. Where a finding and judgment disagree, judgment wins, and you record why in `log.md`.

A check may assert only a fact about the files or the surface. If a check needs an arbitrary number to decide, it is an opinion and belongs in prose advice, not in this list. The one floor this skill does enforce, the link floor, is stated as a rule of the method in the card format, not derived from a count threshold here.

Not run is not a pass. When a check has no surface to examine, name it as not run, with the reason, in the report's Not run section. That section is mandatory in every report. A report that hides not run checks lets a small surface read as a clean one.

Reporting order, used everywhere including the audit recipe: structural, vocabulary, isolation, duplication, contradiction and dispute, provenance, build fidelity. UI004 reports under structural when a field has no home, and under duplication when a field has two homes.

## Codes

### UI001, a reference points at nothing
Severity: error. A link target, a card named in the skeleton, a field named in `data_in`, or a source path that does not exist, in any of the three origin forms. Fix: create the missing card or field mapping, or point the reference at what exists. A link to a card you intend to write is a card you have not written.

### UI002, a card has no skeleton home
Severity: error. The card exists and no point in `placement.md` places it, as a home card, a persistent card, a restating card, or a referenced shared card. Fix: place it, move it to `inbox/`, or archive it. An unplaced card does not get built, however good it is.

### UI003, a skeleton point has no cards
Severity: error. A point that expands nothing is a promise with no content. A parent point in a recursive skeleton passes when its child skeleton has cards. Fix: assign its cards, or delete the point and renumber the skeleton.

### UI004, a data field has no home or two homes
Severity: error. Every field the surface uses, shown or held, appears as owned in exactly one card. Fields marked `never` in `placement.md` need no home. A referenced shared card's home counts once, in the shared registry. A restating card is a reader, never a home. Fix: pick the home by asking which job needs the field first. Other cards read it by link.

### UI005, vocabulary outside the schema
Severity: warn. A verb, card type, status, token, or enumerated data value not declared in `UI-SCHEMA.md`. Tokens are declared by name in the schema, with values held at the pointer the schema names. Data values are declared under `values:` in the schema for fields whose set is closed, for example a status field. A live value outside a closed set fires this code, because it will render unstyled and unplaced. Fix: use a declared value, or add the new value to the schema deliberately, in its own edit, with its meaning.

### UI006, the link floor is not met
Severity: warn. The floor, in the same words as the card format: at least two outbound links, or a stated reason in the Links section, and at least one inbound link, or a stated reason. Links from `index.md` do not count, otherwise the index would cure every isolation. Fix: link the card to the cards it feeds, depends on, extends, or precedes, link it from a card that depends on it, or record the reason that applies: first in a flow, terminal card, source card, shared reference.

### UI007, a duplicate job
Severity: warn. Two cards whose `job` fields state the same job, checked by reading both in full, not by title similarity. Referenced shared cards are exempt: two surfaces reusing one shared card is one job in one card, referenced twice. Fix: merge them, keep the stronger claim as the title, and point a `supersedes` link at the retired card.

### UI008, a contradiction is one sided or open
Severity: info at spec stage, error at build stage. A `contradicts` link with no reciprocal link, or a reciprocal pair still unresolved when build starts. Fix: add the reciprocal link, then resolve the pair in `placement.md` with the decision and its reason.

### UI009, a shown field has no provenance
Severity: error. A field in a built section or in a placement row whose home card carries no origin entry for it. Fix: find its origin in one of the three forms and cite it, or remove the field. An invented field is worse than a missing one.

### UI010, the built surface diverges from the placement spec
Severity: error. Section order, grouping, or a data home on the rendered surface differs from that viewport variant's rows in `placement.md`. Check by looking at the render at shipping sizes, not by reading code. Two declared exceptions do not fire: an order declared `dynamic by <field>` in the placement row, and a merge or split named in that variant's section. Fix: change the build to match the spec, or change the spec through the approval gate and record the divergence reason. Never let the two drift silently.

### UI011, the Links section and the frontmatter disagree
Severity: info. The set of links in a card body differs from its frontmatter `links`. Fix: frontmatter is authoritative. Bring the body into line.

### UI012, the index and the cards disagree
Severity: error. A card missing from `index.md`, or an index entry for a card that does not exist, in either a surface folder or the shared registry. Fix: bring the index into line, both directions. A map that is wrong in either direction is worse than no map.

### UI013, a shared card diverges across surfaces
Severity: error. A surface's placed copy, wording, or data for a shared card differs from the canonical card in the shared registry, or two surfaces hold local copies of the same job instead of referencing one shared card. Fix: delete the local copy, reference the canonical card with `reuses`, and let any real difference become an `extends` card of its own.

### UI014, a disputed card is treated as settled
Severity: error. A card with `disputed: true` is marked `evergreen`, placed as final, or built, while its dispute in `disputes.md` is still open. Fix: rule the dispute, record the ruling and its basis in `disputes.md`, clear the flag, or keep the card at `draft` and out of the build.

### UI015, a card or field has no origin
Severity: error. A card whose `sources` is empty, or a `data_in` field with no entry in any of the three origin forms: a `raw/` path, `user:<card-id>`, or `system:<card-id>`. This is the code behind the Phase 6 provenance item "a card with no source". Fix: give the field its true origin, or remove the field and the claim that rests on it.

## Deliberately not checked

- Section height, card count, point count, or word count thresholds. Shape is worth noticing by eye. A number does not decide it. The skeleton size guidance in the method is advice resolved by recursion, not a gate.
- Whether a grouping is beautiful. Lint guards structure. Judgment, and the user's eye on a full picture, guard the rest.
- Semantic duplicates beyond UI007's read both cards test. No proxy metric stands in for reading.

## Reporting

Group findings by fix, in the reporting order above. State the count baselined or accepted with reasons separately from the count open. End every report with its Not run section. After approved fixes, re-run and report the delta, not only the new total.
