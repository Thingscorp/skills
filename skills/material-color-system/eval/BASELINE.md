# Eval baseline, 2026-11-21

Harness: `eval.mjs` (run `node eval.mjs` in this folder, exit 0 = all pass, about 26s under sandbox CPU limits). Re-run after any change to the skill, the script, or the MCU version, and after any MCU upgrade. A regression here means the skill's promises no longer hold.

## Results: 4/4 PASS at first run; 7/7 after the legacy rule-set expansion (M1, M2, JA, JB, L1-L3), same day

- **M1 Correctness, PASS.** Kit output cross-checked against Material Color Utilities called directly (independent code path): 240 role values matched across 20 seeds x light/dark x 6 roles. All 120 tonal palettes have correct endpoints (tone 0 black, tone 100 white) and monotonic luminance by tone. Seeds include yellow, bile greens (#6B7F00, #7A6A00), near-black, near-white, and pure gray.
- **M2 Accessibility, PASS.** No pair failures across 20 seeds, light and dark. Worst text pair: 6.42:1 (#FF00FF seed, light, onTertiary/tertiary), against a 4.5:1 gate. Worst UI pair: 4.23:1, against a 3:1 gate.
- **Journey A image-to-kit, PASS.** 3/3 synthetic images: the expected dominant color ranked in the top 3 Score candidates (#494886, #00696D, #B6261E all ranked #1).
- **Journey B audit detection, PASS.** Pair checker flagged 3/3 deliberately broken pairs and passed 3/3 good pairs at the 4.5:1 gate.

## What this baseline does not measure yet (tracked in SKILL success terms)

- Measures 3 and 4 from the success definition are human and longitudinal: a user accepting a top-3 candidate with zero hand edits on real images, audit before/after verdicts on real UIs, and user corrections per color task over the next 5 real uses (target 0 to 1, from a starting point of about 3). Log each real use below as it happens.

## Real-use log

- (none yet)
