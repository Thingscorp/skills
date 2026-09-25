# Contributing

Material changes land through a pull request. CI runs `python3 tools/validate.py`.
Direct-to-main is only for typos, dead-link fixes, and validator-green metadata.

1. Read `docs/AUTHORING.md` and `docs/NAMING.md`.
2. Edit one skill or one doc cluster.
3. Run `python3 tools/validate.py`.
4. If the change is a durable repo decision, add `docs/adr/NNNN-short-slug.md`.
5. Open a PR. Review uses `skills/review/SKILL.md`.

See ADR-0004.
