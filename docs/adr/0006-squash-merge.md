# ADR-0006: Squash merge onto main

Date: 2026-09-25
Status: Accepted

## Context
PRs #3–#15 landed as merge commits. PR #16 landed as a squash. `git log --merges` then misses the one PR that followed the landing rule. Two parents per enhance PR also keep the branch commit on `main`.

ADR-0004 already requires a pull request for material work. It does not pick a merge method.

## Drivers
- `main` should stay linear so later agents can read one commit per landed change
- Merge method should match what `git log --merges` and GitHub's merged flag both show
- Review trail lives on the PR, not in a second parent

## Decision
Default merge method is **squash**. One concern per PR. Title stays operational.

Allowed exceptions: a true merge commit when the branch must keep its individual commits (release integration). Say so on the PR.

This does not rewrite #3–#15.

## Consequences
Easier: `main` is one commit per landed change.
Forbidden: stacking "docs: enhance" branches from the same base and merging them in number order as two-parent commits.
