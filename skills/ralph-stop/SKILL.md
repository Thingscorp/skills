---
name: ralph-stop
description: >-
  use this when you need a Ralph loop halted — set its run state to stopped
  without touching the item queue, then confirm on read-back
license: MIT
metadata:
  portability: portable
---
# ralph-stop

Halt the Ralph loop. Does not touch items: the queue in `.ralph/items.json`
is never the way to stop a loop.

## If the loop's state contract is owner-editable

Some Ralph runners keep run state in `.ralph/loop.md` for the owner to
write. For those:

1. Read `.ralph/loop.md`.
2. Set `running: false`.
3. Set `stop_reason: "stopped by owner"`.
4. Write the updated `.ralph/loop.md`.
5. Read it back and print the confirmation from the file, not from the
   write.

## If loop.md is engine-owned

This library's `ralph-loop` contract marks `.ralph/loop.md` **engine only**
and forbids editing it: the engine reads it at the start of each iteration,
decides continue vs stop after each one, and records the stop reason
itself. There is no stop file, signal, or command to invoke. The owner's
halt on that contract is:

1. Do not launch another iteration. A loop that is never launched again is
   halted; the in-flight iteration ends on its own and the engine records
   its stop reason.
2. Confirm the halt with `ralph-status`: read `loop.md`, `items.json`, and
   `progress.md` as they stand, and report the remaining items as remaining.
   A halted loop with items left is stopped, not finished.

Resume follows the same contract that stopped the loop. On this library's
contract, `ralph-plan` resets `loop.md` when it authors a fresh plan; do
not hand-set `running` to resume.

## Anti-patterns

- Marking items blocked or passing to make the loop stop. The queue is not
  the run state.
- Hand-editing an engine-owned `loop.md` to force a stop.
- Reporting the loop stopped without a read-back of the state files.

## Related
ralph-status · ralph-loop · ralph-plan
