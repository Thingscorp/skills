# Evidence Base, Debunked Myths & Standing Rituals

Load this reference to defend audit verdicts, calibrate confidence, or push back on stakeholder myths.

## Foundational Principles & Cognitive Costs

* **Burden of proof, not "simpler is always better":** Occam's actual principle (Stanford Encyclopedia of Philosophy, "Simplicity") forbids multiplying entities beyond necessity—each element must argue its way in.
* **Iterative endpoint:** Saint-Exupéry (*Wind, Sand and Stars*, 1939)—perfection is reached not when there is nothing more to add, but when there is nothing left to take away.
* **Addition bias:** Adams, Converse, Hales & Klotz (*Nature*, 2021) showed across eight experiments that people systematically overlook subtractive changes (only 11% of 651 improvement suggestions removed anything). The 2025 replications held but were strongly modulated by prompt wording and social norms (odds ratios ~7 for norm cues)—counter it with explicit rituals and language.
* **Measured costs of clutter:** Every element charges decision time (Hick), scanning time, and extraneous cognitive load (Sweller, 1988: cut extraneous load, protect intrinsic task load). Visual complexity measurably worsens search efficiency and recall (Baughan et al., CHI 2020), and visual appeal judgments form within 50 ms, rewarding low complexity paired with high prototypicality (Lindgaard et al., 2006).
* **Latency dose-response:** Bing's randomized slowdown trial found every 100 ms of latency cost ~0.6% of revenue (Kohavi et al.); Amazon's practitioner-reported figure is ~1% of sales per 100 ms.
* **Defaults vs. active choice:** Users rarely change defaults (Nielsen, "The Power of Defaults"), but wrong defaults anchor bad outcomes when preferences diverge or stakes are high (Madrian & Shea, 2001: automatic 401(k) enrollment raised participation but trapped higher savers at the low default rate).

## Claims the Evidence Does Not Support

| Myth | Reality / Evidence |
| :--- | :--- |
| **"Everything must be reachable within 3 clicks."** | Debunked (Porter, 2003; NN/g). Users do not abandon at click three; information scent and per-click cost govern. |
| **"Miller's 7±2 caps items per menu or screen."** | Memory finding (1956), not a layout rule. Cowan's ~4 chunks (2001) is likewise a memory limit, not a UI cap. No study establishes a universal per-screen element cap. |
| **"Hick's law means cutting items per menu speeds the UI."** | Hick-Hyman decision time (1952, 1953) is logarithmic and concave: splitting 16 items into 4×4 costs more decision entropy than a flat 16, before extra clicks/loads (Liu et al., CHI 2020). Larson & Czerwinski (CHI 1998): 16×32 was fastest (36 s) vs. 8×8×8 slowest (58 s, timeouts 4.5×). Error rates climbed from 4.0% at 1 level to 34.0% at 6 (Parkinson & Sisson, 1983). |
| **"Cutting form fields linearly raises conversion."** | Field count alone barely moves conversion; effort class, label clarity, and semantic collisions dominate. Cutting fields lowered conversion in controlled tests (Aagaard, CXL). |
| **"More options inherently cause choice overload."** | The jam study (Iyengar & Lepper, 2000) failed as a main effect: Scheibehenne (2010, 50 experiments, *n* = 5,036) found a near-zero mean effect. Overload is reliable only when four moderators coincide (Chernev, Böckenholt & Goodman, 2015): complex choice set, difficult task, uncertain preferences, and effort-minimizing goal. Google's 10-to-30 results test was confounded by latency, pagination, and ads. |
| **"A hamburger or overflow menu is cleaner and better."** | Contradicted by NN/g's hidden-nav study (2016) and CXL's ~240,000-user mobile A/B test where `MENU` + border beat the bare icon on revenue. |
| **"Low analytics usage means an element is safe to delete."** | Telemetry cannot measure spatial anchor or recovery value (e.g., Windows 8 Start button). |
| **"Everything important must fit above the fold."** | Users scroll within seconds when the top carries strong information scent; the fold is not a hard budget. |
| **"Placeholder text can replace labels."** | Placeholder-only labels fail seven documented ways (NN/g); always use persistent external labels. |

## Evidence Confidence Tiers

* **Well replicated:** Hick-Hyman decision time; extraneous cognitive load (Sweller); addition bias (Adams et al., 2021; modulated by norms in 2025); hidden navigation and weak signifier costs (NN/g 2016, 2017); feature fatigue—users pick feature-rich products pre-use and prefer simpler ones post-use (Thompson, Hamilton & Rust, 2005); visual complexity harming search (Baughan et al., CHI 2020); breadth beating depth in hierarchies (Larson & Czerwinski, 1998; Parkinson & Sisson, 1983; Liu et al., 2020); flat-capacity ceilings and landmark grouping in large grids (Abdullah et al., FastTap); expertise reversal effect (Kalyuga et al., 2003); adaptive-menu harm (Findlater & McGrenere, 2004, 2008); card under-inclusion and form label effects (Baymard); low-literacy linear reading path (Summers & Summers, 2005).
* **Conditional / Context-dependent:** Choice overload (requires Chernev et al.'s four moderators); working memory ~4 chunks (memory, not layout); single-platform latency figures (Bing 0.6%, Amazon ~1% per 100 ms); Feature Congestion (bottom-up search without spatial knowledge); hamburger-icon labeling (helped in CXL test, neutral at Booking.com); practitioner removal case studies (Expedia, GOV.UK, YouTube dislikes, Sonos, Windows 8—useful for mechanism, not effect size).
* **Doctrine (useful, not experimental):** Occam's razor; Saint-Exupéry; Dieter Rams' tenth principle ("less, but better"); Tufte's data-ink ratio (1983); Krug's word halving (*Don't Make Me Think*); Tesler's law; Maeda's *Laws of Simplicity* (2006: Reduce, Organize, Failure, The One); GOV.UK's "Do less" and "Do the hard work to make it simple".

## Standing Team Rituals

1. **Open design reviews with removals before additions.** Counter addition bias structurally. Follow GOV.UK's "Do less" policy (consolidation lifted ease of use from 75% to 93% and cut task time by a third; GDS found 73% of GOV.UK pages got <10 views/month; Carer's Allowance removals were validated live with pre-specified hypotheses).
2. **Treat removals with the same skepticism as additions.** Experimentation base rates at Microsoft, Google, Netflix, and Booking show 70–92% of product hypotheses fail to move their target metric. Pre-specify success criteria and test removals with users, not just dashboards.
3. **Count every pass.** Record before/after element counts (per screen and per card), primary content lift, and Feature Congestion score if tracked.
4. **Unify to existing calm patterns.** When one surface already solves a problem cleanly (e.g., toolbar popovers instead of a filter rail), adopt it elsewhere instead of inventing a second calm pattern.
5. **Re-run on a schedule.** Screens re-accumulate clutter one "reasonable" addition at a time. Treat subtraction as recurring maintenance, not a one-time launch pass.
