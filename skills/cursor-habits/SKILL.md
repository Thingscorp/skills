---
name: cursor-habits
description: >-
  use this when starting a Cursor session, after a bad run you want
  to rewind, or before changing Agent settings — /rewind, /summarize,
  skill paths, CLI config
license: MIT
metadata:
  portability: cursor
---
# cursor-habits

Cursor instance of **session-hygiene** — read that skill first for the
portable doctrine. This skill is only Cursor mechanics.

Sources: [cursor.com/docs/cli/reference/slash-commands](https://cursor.com/docs/cli/reference/slash-commands),
[cursor.com/docs/context/skills](https://cursor.com/docs/context/skills),
[cursor.com/docs/cli/reference/configuration](https://cursor.com/docs/cli/reference/configuration).

## When
- Starting a Cursor Agent or CLI session.
- After a bad run — `/rewind` or a fresh chat.
- Before changing what the agent may run — CLI permissions in `cli-config.json`.

## Session checks
There is no `/context` slash. Context cost for skills is the **Skills** category
on the context ring next to the prompt. Watch that, not a invented command.

## Rewind options (escalating)
1. **Cancel mid-run** in the Agent input.
2. **`/rewind`** — jump back to a previous message (CLI; enable `rewind` in `cli-config.json` if it is off).
3. **`/clear`** (`/new`, `/new-chat`, `/newchat`) — new chat. **`/resume`** — reopen a recent one. **`/fork`** — copy this chat.
4. **`/summarize`** (`/compress`) — shrink this thread without clearing.
5. **`git` recovery** — last resort. Git is the ground truth.

## Slash commands worth knowing
- `/model` — pick the model.
- `/plan` — Plan mode.
- `/ask` — read-only Ask mode.
- `/update-cli-config` — edit `~/.cursor/cli-config.json`.
- `/update-cursor-settings` — find the Cursor / VS Code setting to change.

## Skills and settings
Project: `.cursor/skills/`, `.agents/skills/`.
User: `~/.cursor/skills/`, `~/.agents/skills/`.
CLI config: `~/.cursor/cli-config.json` (Windows: `%USERPROFILE%\.cursor\cli-config.json`).
Permissions live under `permissions.allow` / `permissions.deny` in that file.
Agent UI: Settings → Agents (Cmd/Ctrl+Shift+J).

## Related
session-hygiene
