# ADR-0007: Harness-neutral core, N named adapters

Date: 2026-09-25
Status: Accepted

## Context
ADR-0002 allowed one labeled adapter (`claude-code-habits`). Portable skills still named Claude Code slashes. README already lists Cursor, Codex, Copilot, and Gemini CLI as install targets. One adapter made Claude Code the default in practice.

## Drivers
- Portable doctrine must not name a vendor command as the only path
- Adapters may exist if each is labeled and optional
- Command names in an adapter must be verified against that harness's current docs
- No harness is the default
- Do not claim a matrix we will not maintain

## Options considered
- Keep one adapter — loses every non-Claude session
- `docs/HARNESS-MATRIX.md` — a file we will not maintain
- N `*-habits` adapters; portable bodies point at "your harness's command" — wins

## Decision
Core skills stay harness-neutral. Adapters in this repo are `claude-code-habits`, `cursor-habits`, `codex-habits`, `copilot-habits`, and `gemini-cli-habits`. None is the default. Load one only when this session is that harness.

`metadata.portability` values: `portable | claude-code | cursor | codex | copilot | gemini-cli`. Living list: `docs/AUTHORING.md` and `tools/validate.py`. ADR-0003 still owns "house fields live under metadata."

There is no `docs/HARNESS-MATRIX.md` and no `harness/` tree.

## Consequences
Easier: one portable doctrine; each harness owns its slashes.
Forbidden: hardcoded vendor slashes in portable bodies; inventing unverified command names; treating Claude Code as the default adapter.

## Confirmation
`python3 tools/validate.py` accepts the five adapter portability values. `session-hygiene` and `kill-context-bloat` do not name Claude Code slashes as the only path.

## Supersedes
ADR-0002
