---
name: occams-razor-ui
description: >-
  Audits, trims, and rearranges cluttered UI screens, cards, forms, and flows using an evidence-based subtraction discipline (Cut, Tuck, Promote, Regroup).
  Use when designing, reviewing, or simplifying crowded interfaces, reducing interaction friction (unnecessary clicks, scrolling, or pogo-sticking), or optimizing what appears in the first viewport across code, screenshots, or wireframes.
  Do not use for brand/visual styling overhauls, writing marketing copy from scratch, or backend/API refactoring.
---

# Occam's Razor for UI

Apply a burden-of-proof subtraction and arrangement discipline to UI surfaces: every visible element must justify its presence against the user's actual goal. Counter addition bias by evaluating removals and regroupings before additions.

## Workflow

Adapt depth and presentation to the artifact (code, screenshot, or multi-step flow), but always reason in this order:

1. **Define the user's outcome.** State in one sentence what the user is trying to accomplish on this surface. If the screen tries to serve two competing jobs, propose splitting or sequencing them rather than decorating them into coherence.
2. **Read the surface at real size.** Inspect the actual render, screenshot, or live layout—never grade from code or memory alone. Note what occupies the first viewport (above the fold), how far the user must scroll to reach primary content, and how many clicks or back-and-forth trips ("pogo-sticking") the core task requires.
3. **Load domain references only when relevant:**
   * Above-the-fold framing, scroll depth, or click/navigation friction → `references/domain-tests.md` (Section: First Viewport, Scroll & Click Cost)
   * Forms, checkouts, or repeated cards → `references/domain-tests.md` (Sections: Forms, Cards)
   * Mobile nav, power-user tools, or dense command grids → `references/domain-tests.md` (Sections: Navigation, Expertise & Capacity)
   * Stakeholder pushback, citations, or myth-checking → `references/evidence-and-myths.md`
4. **Trim and arrange.** For elements on this specific screen, decide what to **Cut**, **Tuck** (progressive disclosure), **Promote** (pull higher or into the first viewport), or **Regroup** (landmarks, dividers, sequencing). Apply cuts directly in source code (component, template, or builder)—never hide dead elements with CSS alone, and delete unused markup and selectors.
5. **Verify the user's path.** Confirm the target outcome completes cleanly end-to-end with fewer unnecessary clicks, scrolls, or dead ends, and that nothing essential became undiscoverable at real size.

## Universal Tests

Apply these silently; only cite a test in your response when it actually drives a decision on this surface.

* **Named-task:** Name the user task the element serves on this screen. No named task = `Cut`.
* **Removal:** If removing the element does not worsen task time, errors, or success, `Cut` it.
* **Duplication:** One fact gets one telling (e.g., cut a sparkline repeating a visible number).
* **Derivation:** Move derived/estimated values (averages, "usually" prices) off summary cards onto detail surfaces (`Tuck`).
* **Frequency (Progressive Disclosure):** Show what most users need most of the time; `Tuck` the rest behind one interaction (max 2 levels deep, strong information scent). **Void the tuck** if it adds a hierarchy level, hides side-by-side comparison attributes, hides high-stakes consequences (price, permissions, irreversible actions), or hides info the majority needs.
* **Accordion check:** Never expand the first panel by default. On long expanded lists, provide an in-place collapse control so users are not stranded down the page.
* **Default:** Pre-fill near-universal choices and remove the control if effectively always right. Keep active choice when preferences diverge or wrong defaults are costly.
* **Data-ink & Words:** Erase non-data ornament, never real data. Halve UI copy, then halve it again.
* **One primary action:** Enforce exactly one visually dominant action per screen; demote or group competing actions.
* **Latency:** Treat ~100 ms of critical-path rendering cost as a real price requiring a measured payoff.

## Hard Constraints (Where the Razor Stops)

* **Tesler's Law:** Move conserved complexity to the system (defaults, automation, pre-computation), never onto user memory, extra steps, or support tickets.
* **Breadth over depth:** Never cut items by nesting them into deeper menus; group on the same level with landmarks or dividers.
* **Anchor protection:** Never delete or auto-reorder a control based on low click telemetry alone; verify spatial anchor and recovery value first.
* **Comparison & monitoring density:** Keep comparison tables and monitoring dashboards data-dense; cut ornament around the data, not the data itself.
* **Inclusive floor:** Never sacrifice persistent external form labels (no placeholder-only labels), ≥4.5:1 text / ≥3:1 UI contrast, ≥24×24 CSS px (44 px touch) targets, or visible primary navigation.

## Output Principles (No Cookie-Cutter Reports)

Do not output a generic, fill-in-the-blank audit table unless the user explicitly asks for one. Match the response format to the medium:
* **Code / components:** Lead with the refactored code or diff, followed by a concise rationale of what was cut, tucked, promoted, or regrouped.
* **Screenshots / wireframes:** Walk through the screen spatially (first viewport → primary flow → secondary details), proposing the concrete new arrangement.
* **Multi-step flows:** Map the friction points (extra clicks, pogo-sticking, scroll traps) and propose the tighter sequence.

Every response must naturally ground itself in:
* **The Outcome Anchor:** The screen's one job and the biggest friction blocking it.
* **Specific, Named Changes:** Exact UI elements, copy, or layout regions—never generic advice like "reduce clutter" or "improve hierarchy." Include concrete before/after impact (element counts, clicks saved, or primary content moved into the first viewport).
* **Borderline Keeps:** Any noisy-looking element deliberately *kept* (spatial anchor, comparison data, inclusive floor) and why.
* **Zero Checklist Filler:** Never recite tests that did not trigger, and never force uniform minimalism onto data-dense comparison or monitoring surfaces.
