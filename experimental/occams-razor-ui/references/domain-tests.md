# Domain-Specific UI Tests

Load only the sections matching the surface under audit.

## First Viewport, Scroll & Click Cost

Users will scroll and click when information scent is strong and per-click cost is low—reject blunt myths like the "3-click rule" or "everything must fit above the fold." Instead, evaluate whether every pixel of the first viewport, every scroll, and every click earns its keep:

* **First-viewport framing:** The opening viewport does not need to hold everything, but it must immediately establish the screen's one job, surface the primary content or action (or unmistakable scent for what lies below), and avoid burning prime vertical space on oversized headers, redundant banners, or decorative chrome. Measure how far primary content lifts after a pass.
* **Click-cost vs. depth:** An extra click is justified when it tucks low-frequency secondary controls behind strong scent (progressive disclosure). An extra click is a bug when it splits a flat list into deeper menus (Hick's concave curve + page-load cost) or forces **pogo-sticking** (repeatedly clicking into detail pages and back just to verify one missing spec).
* **Scroll-trap check:** Long, well-paced pages are fine; *trapped* scrolling is not. On long expanded lists or accordions, provide an in-place collapse or jump control so users are never stranded deep down the page.

## Forms

* **Semantic collision test:** Weigh fields by effort class, not raw count. Textareas, dropdowns, and look-it-up-yourself fields cost far more than single-line inputs (HubSpot's 40,000-page analysis found single-line input counts barely moved conversion).
  * Read every label as a stranger before cutting for clutter. Ambiguous labels cause silent failures (e.g., Expedia's "Company" field caused users to enter their bank name and fail address verification—a reported $12M practitioner case).
  * Fix unclear labels before deleting fields: clearer labels on a 9-field form raised conversion 19.2%, whereas cutting to 6 fields lowered it 14% (Aagaard, CXL).
  * Mark **both** required and optional fields explicitly; marking only optional fields caused 32% of test users to hit validation errors (Baymard).
  * Do not over-merge: keeping First Name and Last Name separate is fine; merging into a single Full Name field caused hesitation in only 4% of users (Baymard).
* **Sequencing test:** Long is not the same as cluttered. Breaking a long form into progressive steps converted at 53% despite a high total question count (Venture Harbour). Treat Baymard's 12–14 total checkout elements as a benchmark, not a hard law. Use order and pacing when cutting cannot remove necessary fields.
* **Form accessibility floor:** Use persistent external labels—never placeholder-only labels, which fail seven documented ways (NN/g). Honor WCAG 2.2 SC 3.3.7 (Redundant Entry) by eliminating repeated data entry.

## Cards (Repeated Lists & Commerce)

* **Card suitability test:** Under-inclusion is as common as clutter. Baymard benchmarks show 50% of e-commerce sites fail to show adequate list attributes, 35% omit universal essentials, and 15% omit category-specific suitability specs.
  * **Universal essentials (commerce):** Main image, price, title (with product type named when series names are opaque), rating average with review count, and relevant variants.
  * **Suitability facts:** Include the 1–3 specs that decide the category (e.g., dimensions, compatibility, capacity, IPX4 rating).
  * **Feed CTR drivers:** Main image, price, and rating or certification badges dominate feed click-through rate (Meister & Reinholtz, 2025, Airbnb-scale data).
* **Zero-pogo check:** If users repeatedly open detail pages solely to verify one missing fact, promote that fact to the card. Reclaim space by cutting habitual noise instead:
  * Quick-view overlays on spec-driven goods
  * Empty 5-star graphics (replace with plain `"No reviews yet"`)
  * Generic filler copy (e.g., `"Premium quality"`)
  * Dense early text blocks

## Navigation (Mobile & Desktop)

* **Mobile navigation test:** Hidden mobile navigation measurably degrades discoverability. NN/g (2016, 179 participants) found hidden nav was used by 57% of users vs. 86% for a combo pattern; content discoverability dropped >20%, task difficulty rose 21%, and tasks ran 15% slower.
  * Label and bound the control: in a ~240,000-user CXL test, adding the word `MENU` and a border to a hamburger icon beat the bare icon on revenue across all variants (though Booking.com saw no difference, so validate against your audience). Never ship a bare icon on faith.
* **Signifier strength:** Do not flatten buttons and links into ambiguous plain text. Weak signifiers cost 22% more task time and 25% more fixations (NN/g, 2017).

## Expertise & Capacity (Power-User Surfaces & Grids)

* **Expertise test (Expertise Reversal Effect):** Scaffolding that helps novices measurably hinders experts (Kalyuga et al., 2003). Identify the primary user: tuck guidance text, wizards, and inline explanations for repeat users. Serve experts with flat, stable, all-visible command layouts rather than nested or adaptive ones.
* **Anchor test:** Never delete, hide, or auto-reorder a control on low click telemetry alone (e.g., Microsoft removed the Windows 8 Start button on low-click data and reversed it after backlash). Infrequent controls act as spatial anchors and recovery paths. Experts navigate by remembered position (Cockburn, Gutwin & Greenberg), and adaptive menus that hide or reorder items degrade speed and satisfaction (Findlater & McGrenere, 2004, 2008). Verify anchor value qualitatively before any cut.
* **Flat-capacity test:** Breadth beats depth, but flat layouts do not scale infinitely. In FastTap grid experiments (Abdullah et al.), errors rose monotonically as a stable flat grid grew from 19 to 63 commands (0.05 to 0.16 errors/trial).
  * **Mitigation:** Group within the same level using colored landmark blocks, dividers, or explicit section markers rather than adding a hierarchy level. Adding colored landmark blocks to a large command grid sped expert selection (Abdullah et al., CHI EA 2025). Regroup before cutting.

## Computable Clutter & Inclusive Floor

* **Congestion smoke alarm:** Feature Congestion (Rosenholtz, Li & Nakano, 2007) correlates with perceived clutter at *r* up to 0.93 on search-threshold tasks and 0.92 on web screenshots; perceived clutter escalates sharply above a score of ~9.
  * **Tools:** Python `visual_clutter` package, Aalto Interface Metrics, or compressed image file size as a zero-dependency entropy proxy.
  * **Usage rule:** Use a high or rising score to trigger a regrouping pass, never as a metric to blindly minimize. It predicts bottom-up search when users do not know where items live; top-down spatial familiarity shrinks the effective set.
* **Inclusive floor test:** Minimalism never overrides accessibility or edge-population usability:
  * **Contrast:** ≥4.5:1 on text; ≥3:1 on input borders, icons, and focus indicators (WCAG 2.2 SC 1.4.11).
  * **Targets:** ≥24×24 CSS px minimum (WCAG 2.2 SC 2.5.8) and ≥44 px on touch.
  * **Help & consistency:** Consistent help placement (WCAG 2.2 SC 3.2.6).
  * **Low-literacy users:** A linear single-column reading path lifted low-literacy task success from 46% to 82% with no penalty to high-literacy users (Summers & Summers, 2005).
  * **Older users:** Run ~43% slower (NN/g) and are hit first by small type, low contrast, hover-only reveals, and icon-only controls. They prefer shallow, broad hierarchies and make no more errors there.

## Metric Divergence Check

* **Metric divergence test:** A removal can pass every aggregate dashboard while silently stripping a cue users rely on.
  * *YouTube dislike-count removal:* Left platform watch time flat while removing a quality-filtering signal users relied on to pick videos.
  * *Sonos 2024 redesign:* A feature-stripping redesign preceded an 8% revenue drop and the CEO's resignation (confounded by bugs, but heavily driven in user reports by missing core features).
  * **Rule:** Validate removals with users and task-level measurement, not solely with aggregate metrics unlikely to move.
