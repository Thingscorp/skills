# ADR-0006: Squash is the default merge method

Date: 2026-09-25
Status: Accepted

## Context
ADR-0004 requires pull requests for material changes. It does not say how those PRs merge.
PRs #3–#15 used merge commits. PR #16 used squash. `git log --merges` then misses the PR that followed the review trail.

## Drivers
- `main` must stay readable without a rewrite
- A later agent must find the landing PR from one commit
- Validator must still run on the PR head

## Options considered
- Merge commit — keeps branch history; doubles the log when many small PRs land
- Rebase-and-merge — linear, but rewrites the PR branch
- Squash — one commit on `main` per concern; PR number stays in GitHub

## Decision
In the context of landing PRs on this library, facing a mixed merge-commit and squash history, we chose squash as the default, accepting that feature-branch commits leave `main`.

Use GitHub "Squash and merge." Title the squash commit as the concern, not "Merge pull request."

ADR-0004 still owns PR-vs-main. This ADR owns merge method only.

## Consequences
Easier: `git log` on `main` is one line per concern.
Forbidden: a stack of merge commits for one-file doc PRs.
Allowed: a merge commit only when the PR must keep multiple commits (rare here).

## Confirmation
The next material PR's merge commit on `main` has one parent.
