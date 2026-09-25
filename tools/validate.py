#!/usr/bin/env python3
"""Fail if a landmine phrase is missing from skills/."""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKILLS = ROOT / "skills"

# Exact substrings. Keep in lockstep with docs/LANDMINES.md.
PHRASES = [
    "150k",
    "Archive, don't delete",
    "A goal loop on a whole spec is a trap",
    "Same-session execute",
    "Deny + quit/relaunch",
    "quality of attention, not min-maxing spend",
    "Vertical tickets, not horizontal",
    "Push vs point",
    "Do not manufacture findings",
    "Docs describe shipped behavior",
    "No fake eval",
    "Confirm cwd is the named product",
    "Inferred facts are candidates, not commits",
]


def skill_text() -> str:
    parts = []
    for path in sorted(SKILLS.glob("*/SKILL.md")):
        parts.append(path.read_text(encoding="utf-8"))
    return "\n".join(parts)


def main() -> int:
    blob = skill_text()
    missing = [p for p in PHRASES if p not in blob]
    if missing:
        print("landmine phrases missing from skills/:")
        for p in missing:
            print(f"  - {p}")
        return 1
    print(f"ok: {len(PHRASES)} landmine phrases present in {len(list(SKILLS.glob('*/SKILL.md')))} skills")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
