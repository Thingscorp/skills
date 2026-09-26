# Changelog

## Unreleased
- AUTHORING: adapter example lists all five `*-habits` skills; no default harness
- Title: `Agent skills` (was `Skills, not syllabi`)
- README / QUICKSTART / llms.txt: one job statement, no keyword stuffing
- Harness-neutral adapters: `cursor-habits`, `codex-habits`, `copilot-habits`, `gemini-cli-habits` (ADR-0007 supersedes ADR-0002; no default harness)
- README badges: validate CI, license, skills.sh catalog
- GitHub issue templates (bug, skill proposal) and PR template

- Validator rejects top-level `portability` and missing `license`
- All skills use `metadata.portability`
- Agent map: review first, quality-loop vs review, no-skill stop, product cwd
- Living quality sheet removed from this tree
- Human start: `docs/QUICKSTART.md`
- Naming table: `docs/NAMING.md`
- ADR ledger: `docs/adr/0001`–`0007`
- Default merge method: squash (ADR-0006)
- CI: `.github/workflows/validate.yml`
- GitHub About + topics set; skills.sh page is live
