---
name: reverse-pyramid-writing
description: >-
  use this when writing or rewriting a feature, product, or technical
  explanation that a reader must grasp fast: most important information
  first, detail disclosed in layers, one definitive explanation per concept.
license: MIT
metadata:
  portability: portable
---

# Reverse Pyramid Writing

Write so a reader who stops at any point still leaves with the most
important information available up to that point. Structure is the
inverted pyramid: outcome first, supporting facts next, background and
detail last. Detail earns its place by layer, never by habit.

Source: the owner's standing writing prompt, first given 2026-11-15 as
"the best prompt for the best output", restated 2026-11-16 and 2026-11-19.
This skill turns that prompt into a workflow with a check that can fail.

## When

- A feature, product, or technical explanation, doc, brief, or summary.
- A report, memo, or status piece, in Brief mode (Step 2).
- A rewrite of material that buries its point, repeats itself, or reads
  in the order it was researched rather than the order a reader needs it.

Do not use for: fiction, dialogue, legal text that must follow a fixed
form, or a piece the reader explicitly wants in chronological or
narrative order.

## Step 1: Reason before you write

Run three passes over the source material, in this order:

1. **Recursive reasoning** to understand the context. Read the whole
   source, then re-read each part against the whole until each fact sits
   in one place in your model of it.
2. **Chain of logic** to build the plan. Order the facts by what the
   reader needs first to act or decide, not by topic and not by source
   order. Each layer must follow from the layer above it.
3. **Skeleton of thought** to execute. Write a one-line skeleton first:
   one line per layer, outcome plus the facts that layer carries. Judge
   the skeleton whole. Expand a layer only after the skeleton reads
   correctly top to bottom.

Stop condition for this step: you can state the whole piece in one
sentence, and every source fact maps to exactly one layer of the
skeleton, or is cut.

## Step 2: Pick the mode, then apply its scope rules

Pick one mode before writing. State the mode at the top of the draft.
The pyramid (Step 3), the language rules (Step 4), and redundancy
control (Step 5) bind unchanged in both modes. Only the bans differ.

**Feature mode** is the default: features, products, and technical
explanations.

- No quotes. Paraphrase source speech into plain statements of fact.
- No opinions or takeaways. State what a thing does and what a user
  gets, not what anyone thinks of it.
- No direct references to specific projects, companies, or brand names.
  Describe the feature, the function, and the benefit.
- Focus purely on features, functionality, and user benefits.

**Brief mode** covers reports, memos, and status, where the subject
is a specific project, person, or event and a ban on naming it would
defeat the piece.

- Named references are allowed, and usually required.
- Quotes are allowed when the exact words carry information a
  paraphrase would lose, and only with their source named.
- Opinions are allowed only attributed to the person who holds them.
  The writer never states an opinion as its own, in either mode.

A task may explicitly override a ban inside its mode. State any
override in force at the top of the draft, next to the mode.

If the source material in Feature mode consists only of quotes,
opinions, or named references, stop and say the scope cannot be met
from that material. Do not fill the gap with invented facts.

## Step 3: Build the pyramid

Write in five layers. A short piece uses fewer layers; it never
reorders them.

1. **Outcome.** The single most important information: what the reader
   can do, decide, or get, in one or two sentences. A reader who reads
   only this layer has the point.
2. **Key facts.** The facts a reader needs to trust or act on the
   outcome: what it is, who it serves, the limits that matter.
3. **How it works.** Basic concepts before advanced ones. Complex
   procedures in discrete steps, in order.
4. **Prerequisites and context.** Before any instruction, state what
   must be true or in place first. Give the expected outcome of each
   major step, so a reader can check their own progress.
5. **Detail and reference.** Implementation detail, edge cases, and
   background. This layer exists for the reader who needs depth; the
   layers above must read complete without it.

Group related information inside its layer. Never let a later layer
introduce a fact that an earlier decision depended on.

**Reader stop test.** After drafting, run this test before the gate.
Read only layer 1 and write, in one line, what the reader can now do
or decide. Then read layers 1 to 2 and write the same line again,
then layers 1 to 3. Each stop must add a real capability: a decision
the reader can now make, an action they can now take, or a check they
can now run. A stop that adds nothing sends its layer back: either
the layer carries no weight and is cut, or its weight belongs in the
layer above it. Keep the three stop lines with the draft until the
gate passes; they are the evidence the pyramid holds its shape.

## Step 4: Apply the language rules

- Clear, direct language for a technical audience.
- Second person ("you") for instructions and procedures.
- Active voice. Present tense for current states, future tense for
  outcomes.
- Avoid jargon. Define a term at its first use, then use that exact
  term for that concept everywhere.
- Concise sentences with parallel structure. Descriptive, succinct,
  rich wording; brevity and focus over coverage.
- Focus on user goals and outcomes, not system features alone.
- Anticipate the reader's common questions and answer each one inside
  the layer where it arises.
- No em dashes. Use commas, periods, or colons.

## Step 5: Control redundancy

- Give each core concept one definitive explanation, in the highest
  layer that needs it.
- Lower layers reference that explanation. They never repeat it, and
  never restate it in new words.
- Remove generic transitional content that adds no information.
- Keep a passage only when it adds a unique perspective, an
  implementation-specific detail, or essential context for its layer.
  If it adds none of the three, cut it.

## Step 6: Run the gate, graded by someone else

The writer never grades its own draft. Before delivery, an
independent pass grades the draft against
`references/checklist.md`: a fresh-context agent, a second model, or
a reviewer who did not write the piece. The grader works in two
stages, in this order:

1. **Mechanical scans first.** Count, do not judge: em dashes, quoted
   speech, names banned by the mode in force, repeated explanations.
   The checklist names each scan. A mechanical failure needs no
   judgment call and cannot be argued away.
2. **Judgment checks second.** Structure, scope, language, and
   redundancy checks that need a reader. For every failed check, the
   grader quotes the failing line as evidence.

Every check must pass or the draft goes back to the step that failed
it, with the grader's quoted evidence attached. The writer fixes and
resubmits; the writer never marks a check itself. If no independent
grader is available, deliver the draft labeled UNGRADED rather than
grading it yourself.

A worked pass through all five layers is in
`references/example.md`; load it when the layer order for a real
piece is unclear.

## Anti-patterns

- Opening with background, history, or definitions while the outcome
  waits below.
- A summary at the top that the body then repeats in full.
- One concept explained twice, differently, in two sections.
- Transitions that announce structure ("in this section you will
  learn") instead of carrying information.
- Coverage as a goal: keeping a true fact whose layer does not need it.
- Present tense for a promised outcome, or future tense for a current
  state.
