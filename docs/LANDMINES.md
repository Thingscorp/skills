# Landmines — do not regress

These are the sharp claims that drafts quietly invert or soften.
`tools/validate.py` asserts the quoted figures/phrases still appear
verbatim in the skills.

1. **~150k dumb-zone onset** — never ~80k. The figure is a slope, not a cliff.
2. **Archive, don't delete** specs when code ships. Code is primary; never a
   living in-repo `SPEC.md`.
3. **A goal loop on a whole spec is a trap** — one long auto-compacting
   window gives a brief smart zone then a long dumb zone. Prefer spec +
   vertical tickets.
4. **Same-session execute** after grilling — never clear-before-execute.
   Clearing throws away the grilled primary context and defeats the loop.
5. **Deny + quit/relaunch** for bloat cuts — settings edits often change
   nothing until the harness restarts. Deny-without-relaunch is a false fix.
6. **Kill-bloat motive is quality of attention, not min-maxing spend.**
7. **Vertical tickets, not horizontal** — each ticket a thin end-to-end slice
   (tracer bullets); reject DB-then-API-then-UI layering.
8. **Push vs point** — default to pointers; push only short always-true rules.
   Every always-on token is resent on every provider request (tokens *and*
   attention).
9. **Do not manufacture findings.** Empty review is valid. Findings that
   encode a decision become ADRs — a write-once review dump is a graveyard.
10. **Docs describe shipped behavior.** Aspirational stays in ROADMAP, marked
    unshipped. Do not write workstation paths or tokens into committed docs.
11. **No fake eval.** No hash embeddings. No template output labeled as model
    output. An eval that does not run the production path does not count.
12. **Confirm cwd is the named product** before editing. Wrong repo is a stop.
