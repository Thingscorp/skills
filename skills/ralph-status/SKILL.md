---
name: ralph-status
description: >-
  use this when you need the current state of a Ralph loop — branch, run
  state, item counts, recent progress, and the next eligible item
license: MIT
metadata:
  portability: portable
---
# ralph-status

Print the current state of the Ralph loop. Read-only: this skill changes
nothing.

## Steps

1. Print the current git branch.
2. Read and print `.ralph/loop.md`: running, iteration, stop_reason.
3. Read `.ralph/items.json` and print the counts:
   - Total items
   - Passing (`passes: true`)
   - Blocked (`blocked: true`)
   - Remaining (`passes: false`, `blocked: false`)
4. Print the last 3 entries from `.ralph/progress.md`.
5. Name the next eligible item: the first with `passes: false` and
   `blocked: false`, with its id and description.

## Anti-patterns

- Reporting loop state from memory or from an earlier read. State is what
  the files say now.
- Treating a quiet loop as a finished loop. Remaining items above zero
  means the queue is not done, whatever the run state says.

## Related
ralph-loop · ralph-stop · ralph-swarm
