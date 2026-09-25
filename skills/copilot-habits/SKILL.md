---
name: copilot-habits
description: >-
  use this when starting a GitHub Copilot CLI or VS Code agent session —
  /skills, /agent, /cwd, skill paths; context-floor slash is a stub
license: MIT
metadata:
  portability: copilot
---
# copilot-habits

GitHub Copilot instance of **session-hygiene** — read that skill first for the
portable doctrine. This skill is only Copilot mechanics.

Sources: [docs.github.com Copilot CLI skills](https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/create-skills),
[docs.github.com Copilot CLI](https://docs.github.com/copilot/how-tos/use-copilot-agents/use-copilot-cli),
[VS Code Agent Skills](https://code.visualstudio.com/docs/copilot/customization/agent-skills).

## When
- Starting Copilot CLI or VS Code Agent.
- After adding a skill mid-session — `/skills reload`.
- Before changing cwd — `/cwd` or `/cd`.

## Session checks
**Stub.** No documented `/context` (or equivalent context-floor slash) in Copilot CLI
or VS Code Agent Skills docs as of 2026-09-25. Fill in when GitHub publishes one.
Until then: ask Copilot what skills are loaded (`/skills list`) and keep starting
context lean via session-hygiene + kill-context-bloat.

## Rewind options (escalating)
1. Cancel the in-flight turn in the CLI.
2. **Stub.** No documented `/rewind` on Copilot CLI. Start a new CLI session or a
   new VS Code Agent chat for a conversation rewind.
3. **`git` recovery** — last resort. Git is the ground truth.

## Slash commands worth knowing
- `/skills list` — available skills. `/skills info` — one skill's path.
- `/skills` — enable or disable a skill. `/skills add` — extra skills directory.
- `/skills reload` — pick up skills added this session.
- `/skill-name` — invoke a skill by name.
- `/agent` — pick a custom agent profile.
- `/cwd` / `/cd` — change the working directory. `/add-dir` — extra workspace root.

## Skills and settings
Project: `.github/skills/`, `.agents/skills/`, `.claude/skills/`.
User: `~/.copilot/skills/`, `~/.agents/skills/`.
VS Code: enable `chat.useAgentSkills`.
Custom agents: `.github/agents/`, `~/.copilot/agents/`.
Env extras: `COPILOT_SKILLS_DIRS`.

## Related
session-hygiene
