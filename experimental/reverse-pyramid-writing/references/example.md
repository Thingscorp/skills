# Worked Example

Raw material, in research order: a backup tool stores copies on a
schedule the user sets; copies are encrypted before they leave the
device; setup needs an account and a destination folder; restoring a
file returns the most recent copy by default; the user can keep up to
30 daily copies; copies run in the background.

## The skeleton (Step 1)

1. Outcome: your files restore after loss, from copies that run on
   their own.
2. Key facts: copies are encrypted before they leave your device; you
   keep up to 30 daily copies.
3. How it works: set a schedule; copies run in the background; a
   restore returns the most recent copy.
4. Prerequisites: an account and a destination folder, before setup.
5. Detail: how retention counts days, how a restore picks a copy when
   several exist for one file.

## The piece

**Layer 1.** You protect your files against loss. You set a schedule
once, and copies run on their own from that point forward. When you
lose a file, you restore it from a copy.

**Layer 2.** Copies are encrypted before they leave your device, so
the destination stores data it cannot read. You keep up to 30 daily
copies, which gives you a month of earlier versions for any file.

**Layer 3.** You choose the folders to protect and the time copies
run. Copies then run in the background at that time each day. To
restore, you pick a file and confirm; you receive the most recent
copy by default.

**Layer 4.** Before setup, create an account and choose a destination
folder with enough free space for your largest protected folder.
Setup succeeds when the first scheduled copy completes and the file
list shows a copy time.

**Layer 5.** Retention counts calendar days, not copy runs: two
copies on one day occupy one day of the 30. When several copies of
one file exist, a restore offers each copy by its time before it
returns the most recent one.

## What the pyramid did

- The outcome moved from last in the research order (copies run in
  the background) to first, joined with the benefit it produces.
- Encryption appears once, in layer 2, as a fact. No layer below
  restates it.
- Prerequisites sit in layer 4, after the reader knows what the tool
  does, and before the setup outcome they gate.
- Nothing in the raw material was quoted, judged, or named.
