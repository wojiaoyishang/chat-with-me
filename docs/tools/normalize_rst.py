#!/usr/bin/env python3
"""Normalize generated/manual RST before strict Sphinx builds.

The developer manual intentionally uses ``-W``.  This helper fixes two
structural issues that should never make a documentation build noisy:

* section adornments shorter than mixed Chinese/ASCII headings;
* curated ``source/modules`` pages registering the same domain objects as the
  exhaustive generated API reference.

It does not suppress Sphinx warnings globally.  Real broken references and
invalid directives still fail the build.
"""
from __future__ import annotations

import re
import unicodedata
from pathlib import Path

DOCS_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = DOCS_ROOT / "source"
ADORNMENT_RE = re.compile(r"^([=\-~^\"'+*#<>_.:])\1{2,}\s*$")
DOMAIN_RE = re.compile(r"^(?P<indent>\s*)\.\.\s+(?:py|js):(?:module|class|method|classmethod|staticmethod|property|function|attribute)::\s+.+$")


def display_width(text: str) -> int:
    width = 0
    for char in text.rstrip():
        if char == "\t":
            width += 4
        else:
            width += 2 if unicodedata.east_asian_width(char) in {"W", "F"} else 1
    return width


def normalize_headings(lines: list[str]) -> list[str]:
    result = list(lines)
    for index in range(1, len(result)):
        match = ADORNMENT_RE.fullmatch(result[index].rstrip("\r\n"))
        if not match:
            continue
        title = result[index - 1].rstrip("\r\n")
        if not title.strip() or title.lstrip().startswith(".. "):
            continue
        newline = "\r\n" if result[index].endswith("\r\n") else "\n"
        required = max(80, display_width(title) + 8)
        if len(result[index].rstrip("\r\n")) < required:
            result[index] = match.group(1) * required + newline
    return result


def add_no_index_to_curated_modules(lines: list[str]) -> list[str]:
    result: list[str] = []
    index = 0
    while index < len(lines):
        line = lines[index]
        result.append(line)
        match = DOMAIN_RE.match(line.rstrip("\r\n"))
        if match:
            next_line = lines[index + 1] if index + 1 < len(lines) else ""
            if ":no-index:" not in next_line:
                newline = "\r\n" if line.endswith("\r\n") else "\n"
                result.append(match.group("indent") + "   :no-index:" + newline)
        index += 1
    return result



def sanitize_generated_javascript_api(lines: list[str]) -> list[str]:
    """Make bundled generated JS API pages safe even without TypeScript installed."""

    result: list[str] = []
    inline_literal = re.compile(r"``([^`\n]*?)``")
    for line in lines:
        # Old generated pages escaped template-literal backticks as ``\```,
        # which can confuse Docutils inside an inline literal.  Render the
        # character visibly instead of nesting a backtick delimiter.
        line = line.replace("\\`", "\\x60")
        # Destructured parameters may become text such as ``options = `` after
        # braces are stripped.  RST forbids whitespace next to an inline
        # literal delimiter, so trim only the literal payload.
        line = inline_literal.sub(lambda match: "``" + match.group(1).strip() + "``", line)
        result.append(line)
    return result

def normalize_file(path: Path) -> bool:
    original = path.read_text(encoding="utf-8")
    newline = "\r\n" if "\r\n" in original else "\n"
    lines = original.splitlines(keepends=True)
    lines = normalize_headings(lines)
    try:
        relative = path.relative_to(SOURCE_ROOT)
    except ValueError:
        relative = path
    if relative.parts and relative.parts[0] == "modules":
        lines = add_no_index_to_curated_modules(lines)
    if len(relative.parts) >= 2 and relative.parts[0] == "api" and relative.parts[1] == "javascript":
        lines = sanitize_generated_javascript_api(lines)
    updated = "".join(lines)
    if updated and not updated.endswith(("\n", "\r")):
        updated += newline
    if updated == original:
        return False
    path.write_text(updated, encoding="utf-8", newline="")
    return True


def main() -> int:
    changed = 0
    for path in sorted(SOURCE_ROOT.rglob("*.rst")):
        changed += int(normalize_file(path))
    print(f"RST normalization complete | changed={changed}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
