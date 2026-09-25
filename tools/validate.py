#!/usr/bin/env python3
"""Fail if landmine phrases or catalog maps drift from skills/."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKILLS = ROOT / "skills"

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

CATALOGS = [
    ROOT / "AGENTS.md",
    ROOT / "README.md",
    ROOT / "llms.txt",
]


def skill_dirs() -> list[str]:
    return sorted(p.name for p in SKILLS.iterdir() if (p / "SKILL.md").is_file())


def skill_text() -> str:
    parts = []
    for name in skill_dirs():
        parts.append((SKILLS / name / "SKILL.md").read_text(encoding="utf-8"))
    return "\n".join(parts)


def plugin_skills() -> list[str]:
    path = ROOT / ".claude-plugin" / "plugin.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    out = []
    for raw in data.get("skills", []):
        m = re.search(r"skills/([^/]+)\s*$", raw.replace("\\", "/"))
        if m:
            out.append(m.group(1))
    return sorted(out)


def main() -> int:
    names = skill_dirs()
    blob = skill_text()
    errors: list[str] = []

    missing = [p for p in PHRASES if p not in blob]
    if missing:
        errors.append("landmine phrases missing from skills/")
        errors.extend(f"  - {p}" for p in missing)

    plugin = plugin_skills()
    if plugin != names:
        errors.append(f"plugin.json skills {plugin} != disk {names}")

    for catalog in CATALOGS:
        text = catalog.read_text(encoding="utf-8")
        absent = [n for n in names if n not in text]
        if absent:
            errors.append(f"{catalog.name} missing: {', '.join(absent)}")

    if errors:
        print("validate failed:")
        print("\n".join(errors))
        return 1
    print(f"ok: {len(PHRASES)} phrases, {len(names)} skills, catalogs in lockstep")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
