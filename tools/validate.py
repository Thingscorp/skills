#!/usr/bin/env python3
"""Fail if landmine phrases or catalogs drift."""
from __future__ import annotations

import json
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


def disk_skills() -> list[str]:
    names = []
    for path in sorted(SKILLS.glob("*/SKILL.md")):
        names.append(path.parent.name)
    return names


def skill_text() -> str:
    return "\n".join(
        (SKILLS / name / "SKILL.md").read_text(encoding="utf-8")
        for name in disk_skills()
    )


def check_phrases(blob: str) -> list[str]:
    return [p for p in PHRASES if p not in blob]


def check_catalogs(names: list[str]) -> list[str]:
    errors = []
    plugin = json.loads((ROOT / ".claude-plugin" / "plugin.json").read_text())
    plugin_names = [p.rsplit("/", 1)[-1] for p in plugin.get("skills", [])]
    if sorted(plugin_names) != names:
        errors.append(f"plugin.json skills != disk: {sorted(plugin_names)} vs {names}")

    market_path = ROOT / ".claude-plugin" / "marketplace.json"
    if market_path.exists():
        market = json.loads(market_path.read_text())
        listed = []
        for plug in market.get("plugins", []):
            listed.extend(p.rsplit("/", 1)[-1] for p in plug.get("skills", []))
        if listed and sorted(listed) != names:
            errors.append(f"marketplace.json skills != disk: {sorted(listed)} vs {names}")

    grouped = []
    sh = json.loads((ROOT / "skills.sh.json").read_text())
    for group in sh.get("groupings", []):
        grouped.extend(group.get("skills", []))
    if sorted(grouped) != names:
        errors.append(f"skills.sh.json groupings != disk: {sorted(grouped)} vs {names}")

    agents = (ROOT / "AGENTS.md").read_text(encoding="utf-8")
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    for name in names:
        if name == "claude-code-habits":
            continue
        needle = f"skills/{name}/SKILL.md"
        if needle not in agents:
            errors.append(f"AGENTS.md missing {needle}")
        if f"`{name}`" not in readme:
            errors.append(f"README.md missing `{name}`")
    return errors


def main() -> int:
    names = disk_skills()
    missing = check_phrases(skill_text())
    catalog = check_catalogs(names)
    failed = False
    if missing:
        failed = True
        print("landmine phrases missing from skills/:")
        for p in missing:
            print(f"  - {p}")
    if catalog:
        failed = True
        print("catalog drift:")
        for e in catalog:
            print(f"  - {e}")
    if failed:
        return 1
    print(f"ok: {len(PHRASES)} phrases, {len(names)} skills, catalogs match")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
