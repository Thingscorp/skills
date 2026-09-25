# ADR-0004: Landing rule for this repository

Date: 2026-09-24
Status: Accepted

## Context
The first-day history went direct to main with no PR, issue, CI, or ADR. The review skill says material work gets a P0/P1/P2 read before it lands.

## Drivers
- Validator must run before merge
- Material changes need a review trail
- Owner may still patch typos on main

## Decision
Material changes (new skill, schema change, install docs, doctrine) land through a pull request. CI runs `python3 tools/validate.py`. Direct-to-main is allowed only for typo / broken-link / validator-green metadata fixes. Record durable repo decisions in `docs/adr/`.

This ADR does not invent historical PRs for the first-day commits.

## Consequences
Easier: later agents can see why a rule exists.
Forbidden: adding a skill on main without the validator passing.
