#!/usr/bin/env python3
"""Library checks for Thingscorp/skills.

Not a product test framework. Checks that:
- every skills/<name>/SKILL.md exists and name matches the folder
- catalogs list the same names as the folders
- landmine phrases still appear in some SKILL.md
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKILLS = ROOT / "skills"

PHRASES = [
    "Archive, don't delete",
    "Same-session execute",
    "Push vs point",
    "Do not manufacture findings",
    "Docs describe shipped behavior",
    "No fake eval",
    "Confirm cwd is the named product",
    "Inferred facts are candidates, not commits",
    "150,000",
    "quality of attention",
    "deny without relaunch",
    "Reject horizontal tickets",
]

MUST_EXIST = [
    "AGENTS.md",
    "README.md",
    "CLAUDE.md",
    "llms.txt",
    "docs/AUTHORING.md",
    "docs/LANDMINES.md",
    "docs/glossary.md",
    "skills.sh.json",
    ".claude-plugin/plugin.json",
    ".claude-plugin/marketplace.json",
    "tools/validate.py",
    "skills/review/references/adr.md",
]

MUST_NOT_EXIST = [
    "tools/install.sh",
    "docs/HARNESS-MATRIX.md",
    "docs/CONFIG-SCHEMA.md",
]


def folders() -> list[str]:
    names = []
    for path in sorted(SKILLS.iterdir()):
        if path.is_dir() and (path / "SKILL.md").is_file():
            names.append(path.name)
    return names


def skill_blob() -> str:
    return "\n".join(
        (SKILLS / name / "SKILL.md").read_text(encoding="utf-8") for name in folders()
    )


def frontmatter_name(text: str) -> str | None:
    m = re.search(r"(?m)^name:\s*([\w-]+)\s*$", text)
    return m.group(1) if m else None


def plugin_names() -> list[str]:
    data = json.loads((ROOT / ".claude-plugin/plugin.json").read_text(encoding="utf-8"))
    out = []
    for item in data.get("skills", []):
        out.append(Path(item).name)
    return out


def skills_sh_names() -> list[str]:
    data = json.loads((ROOT / "skills.sh.json").read_text(encoding="utf-8"))
    out: list[str] = []
    for group in data.get("groupings", []):
        out.extend(group.get("skills", []))
    return out


def mentioned(path: str, name: str) -> bool:
    text = (ROOT / path).read_text(encoding="utf-8")
    return bool(re.search(rf"\b{re.escape(name)}\b", text))


def main() -> int:
    errors: list[str] = []
    names = folders()
    if not names:
        errors.append("no skills/*/SKILL.md found")

    for rel in MUST_EXIST:
        if not (ROOT / rel).is_file():
            errors.append(f"missing required file: {rel}")
    for rel in MUST_NOT_EXIST:
        if (ROOT / rel).exists():
            errors.append(f"phantom file should not exist: {rel}")

    for name in names:
        body = (SKILLS / name / "SKILL.md").read_text(encoding="utf-8")
        fm = frontmatter_name(body)
        if fm != name:
            errors.append(f"{name}: frontmatter name={fm!r} != folder")
        if not body.lstrip().startswith("---"):
            errors.append(f"{name}: missing YAML frontmatter")
        if "use this when" not in body[:800].lower():
            errors.append(f"{name}: description should start with 'use this when'")

    plugin = plugin_names()
    grouped = skills_sh_names()
    if sorted(plugin) != sorted(names):
        errors.append(
            f"plugin.json skills != folders\n  plugin: {plugin}\n  disk: {names}"
        )
    extra = sorted(set(grouped) - set(names))
    missing = sorted(set(names) - set(grouped))
    if extra or missing:
        errors.append(f"skills.sh.json drift extra={extra} missing={missing}")

    for catalog in ("AGENTS.md", "README.md", "llms.txt"):
        for name in names:
            if not mentioned(catalog, name):
                errors.append(f"{catalog} does not mention {name}")

    blob = skill_blob()
    missing_phrases = [p for p in PHRASES if p not in blob]
    if missing_phrases:
        errors.append("landmine phrases missing from skills/:")
        errors.extend(f"  - {p}" for p in missing_phrases)

    if errors:
        print("FAIL")
        print("\n".join(errors))
        return 1
    print(f"ok: {len(names)} skills, catalogs aligned, {len(PHRASES)} phrases present")
    return 0


if __name__ == "__main__":
    sys.exit(main())
