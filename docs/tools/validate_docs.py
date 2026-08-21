#!/usr/bin/env python3
"""Validate the CWM developer manual without importing the application.

The validator checks navigation depth, toctree targets, document reachability,
source-to-API coverage and generated function markers.  It is deliberately
independent of Sphinx so obvious packaging errors are caught before the strict
HTML build starts.
"""

from __future__ import annotations

import ast
import re
import sys
from collections import Counter, deque
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
DOCS_ROOT = PROJECT_ROOT / "docs"
SOURCE_ROOT = DOCS_ROOT / "source"
IS_BACKEND = (SOURCE_ROOT / "api" / "python").exists()
API_DOMAIN = "python" if IS_BACKEND else "javascript"
API_ROOT = SOURCE_ROOT / "api" / API_DOMAIN
SUMMARY_FILE = API_ROOT / "GENERATION_SUMMARY.txt"

EXCLUDED_SOURCE_DIRS = {
    ".git",
    ".idea",
    ".mypy_cache",
    ".pytest_cache",
    ".ruff_cache",
    ".venv",
    ".vite",
    "__pycache__",
    "build",
    "coverage",
    "dist",
    "docs",
    "htmlcov",
    "node_modules",
    "venv",
}

MANUAL_SECTIONS = {
    "backend": {"welcome", "architecture", "runtime", "protocol", "development", "modules"},
    "frontend": {"welcome", "architecture", "protocol", "development", "modules"},
}

errors: list[str] = []
warnings: list[str] = []


def fail(message: str) -> None:
    errors.append(message)


def warn(message: str) -> None:
    warnings.append(message)


def rel(path: Path) -> str:
    return path.relative_to(PROJECT_ROOT).as_posix()


def docname(path: Path) -> str:
    return path.relative_to(SOURCE_ROOT).with_suffix("").as_posix()


def is_underline(line: str) -> bool:
    stripped = line.strip()
    return len(stripped) >= 2 and len(set(stripped)) == 1 and stripped[0] in "=-~^\"'#*+_"


def first_nonblank(lines: list[str], start: int = 0) -> int | None:
    for index in range(start, len(lines)):
        if lines[index].strip():
            return index
    return None


def has_document_title(lines: list[str]) -> bool:
    first = first_nonblank(lines)
    if first is None:
        return False
    if lines[first].strip().startswith(".. title::"):
        return True
    second = first_nonblank(lines, first + 1)
    return second is not None and is_underline(lines[second])


def parse_toctrees(path: Path, lines: list[str]) -> list[dict[str, object]]:
    trees: list[dict[str, object]] = []
    index = 0
    while index < len(lines):
        line = lines[index]
        if line.lstrip().startswith(".. toctree::"):
            base_indent = len(line) - len(line.lstrip())
            options: dict[str, str] = {}
            entries: list[str] = []
            cursor = index + 1
            while cursor < len(lines):
                current = lines[cursor]
                if not current.strip():
                    cursor += 1
                    continue
                indent = len(current) - len(current.lstrip())
                if indent <= base_indent:
                    break
                stripped = current.strip()
                option = re.match(r":([^:]+):\s*(.*)$", stripped)
                if option:
                    options[option.group(1)] = option.group(2)
                elif not stripped.startswith(".. "):
                    entries.append(stripped)
                cursor += 1
            trees.append({"line": index + 1, "options": options, "entries": entries})
            index = cursor
            continue
        index += 1
    return trees


def strip_toctree_title(entry: str) -> str:
    match = re.match(r".*?<([^<>]+)>\s*$", entry)
    return match.group(1).strip() if match else entry.strip()


def resolve_doc_target(current: Path, entry: str) -> Path | None:
    target = strip_toctree_title(entry).split("#", 1)[0]
    if not target or target in {"self", "genindex", "modindex", "search"}:
        return None
    if re.match(r"^[a-zA-Z][a-zA-Z0-9+.-]*://", target):
        return None
    if any(character in target for character in "*?["):
        return None
    base = SOURCE_ROOT if target.startswith("/") else current.parent
    candidate = base / target.lstrip("/")
    candidates = []
    if str(candidate).endswith(".rst"):
        candidates.append(candidate)
    else:
        candidates.extend([Path(str(candidate) + ".rst"), candidate / "index.rst"])
    for item in candidates:
        if item.exists():
            return item.resolve()
    fail(f"{rel(current)}: toctree target does not exist: {entry!r}")
    return None


def parse_summary() -> dict[str, int]:
    if not SUMMARY_FILE.exists():
        fail(f"Missing generated API summary: {rel(SUMMARY_FILE)}")
        return {}
    values: dict[str, int] = {}
    for line in SUMMARY_FILE.read_text(encoding="utf-8").splitlines():
        if "=" not in line:
            continue
        key, value = line.split("=", 1)
        try:
            values[key.strip()] = int(value.strip())
        except ValueError:
            continue
    if values.get("failures", -1) != 0:
        fail(f"Generated API reports failures={values.get('failures')}")
    return values


def validate_rst() -> tuple[dict[str, set[str]], set[str]]:
    rst_files = sorted(SOURCE_ROOT.rglob("*.rst"))
    if not rst_files:
        fail("No RST files found under docs/source")
        return {}, set()

    graph: dict[str, set[str]] = {}
    all_docs = {docname(path) for path in rst_files}
    admonitions: Counter[str] = Counter()
    kind = "backend" if IS_BACKEND else "frontend"

    for path in rst_files:
        text = path.read_text(encoding="utf-8")
        lines = text.splitlines()
        current_doc = docname(path)
        graph.setdefault(current_doc, set())

        if not has_document_title(lines):
            fail(f"{rel(path)}: document has no title or '.. title::' directive")

        for number, line in enumerate(lines, 1):
            if "\t" in line:
                fail(f"{rel(path)}:{number}: tab character found")
            if line.rstrip() != line:
                fail(f"{rel(path)}:{number}: trailing whitespace found")
            match = re.match(r"\s*\.\.\s+(note|important|warning|tip)::", line)
            if match:
                admonitions[match.group(1)] += 1

        for number, line in enumerate(lines):
            if line.strip() == "目录索引":
                next_line = first_nonblank(lines, number + 1)
                if next_line is not None and is_underline(lines[next_line]):
                    fail(
                        f"{rel(path)}:{number + 1}: '目录索引' must be plain text, not a section heading"
                    )

        for match in re.finditer(r":doc:`([^`]+)`", text):
            role_value = match.group(1).strip()
            labelled = re.match(r".*?<([^<>]+)>\s*$", role_value)
            role_target = labelled.group(1).strip() if labelled else role_value
            resolve_doc_target(path, role_target)

        trees = parse_toctrees(path, lines)
        relative = path.relative_to(SOURCE_ROOT)
        manual_index = relative == Path("index.rst") or (
            path.name == "index.rst" and relative.parts[0] in MANUAL_SECTIONS[kind]
        )
        api_index = relative == Path("api") / API_DOMAIN / "index.rst"
        for tree in trees:
            options = tree["options"]
            assert isinstance(options, dict)
            if (manual_index or api_index) and "hidden" not in options:
                if options.get("maxdepth") != "1":
                    fail(f"{rel(path)}:{tree['line']}: visible toctree must use ':maxdepth: 1'")
                if "titlesonly" not in options:
                    fail(f"{rel(path)}:{tree['line']}: visible toctree must use ':titlesonly:'")
            entries = tree["entries"]
            assert isinstance(entries, list)
            for entry in entries:
                target = resolve_doc_target(path, entry)
                if target is not None:
                    graph[current_doc].add(docname(target))

    for required in ("note", "important", "warning", "tip"):
        if admonitions[required] == 0:
            fail(f"No '.. {required}::' admonition found in the manual")

    conf = SOURCE_ROOT / "conf.py"
    conf_text = conf.read_text(encoding="utf-8") if conf.exists() else ""
    if '"titles_only": True' not in conf_text and "'titles_only': True" not in conf_text:
        fail("docs/source/conf.py must enable RTD theme option titles_only=True")
    if '"includehidden": False' not in conf_text and "'includehidden': False" not in conf_text:
        fail("docs/source/conf.py must disable includehidden for the sidebar")
    css = SOURCE_ROOT / "_static" / "custom.css"
    css_text = css.read_text(encoding="utf-8") if css.exists() else ""
    if "toctree-l3" not in css_text:
        warn("custom.css does not contain the defensive toctree-l3 navigation rule")

    reachable: set[str] = set()
    queue: deque[str] = deque(["index"])
    while queue:
        current = queue.popleft()
        if current in reachable:
            continue
        reachable.add(current)
        queue.extend(graph.get(current, ()))
    orphaned = sorted(all_docs - reachable)
    for orphan in orphaned:
        fail(f"Orphan RST document is not reachable from source/index.rst: {orphan}")

    print(
        "RST navigation | "
        f"documents={len(rst_files)} | reachable={len(reachable & all_docs)} | "
        + " | ".join(f"{name}={admonitions[name]}" for name in ("note", "important", "warning", "tip"))
    )
    return graph, all_docs


def backend_source_files() -> list[Path]:
    result: list[Path] = []
    for path in PROJECT_ROOT.rglob("*.py"):
        relative = path.relative_to(PROJECT_ROOT)
        if any(part in EXCLUDED_SOURCE_DIRS for part in relative.parts):
            continue
        result.append(path)
    return sorted(result)


def python_marker(path: Path, node: ast.AST, kind: str) -> str:
    relative = path.relative_to(PROJECT_ROOT).as_posix()
    return ":".join(
        [
            relative,
            str(getattr(node, "lineno", 0)),
            str(getattr(node, "col_offset", 0)),
            str(getattr(node, "end_lineno", 0)),
            str(getattr(node, "end_col_offset", 0)),
            kind,
        ]
    )


def validate_generated_api(summary: dict[str, int]) -> None:
    api_rst = sorted(API_ROOT.rglob("*.rst"))
    if not api_rst:
        fail(f"No generated API pages found under {rel(API_ROOT)}")
        return
    marker_pattern = re.compile(r"^\s*\.\. CWM-AST-(FUNCTION|LAMBDA) (.+)$", re.MULTILINE)
    markers: list[str] = []
    module_directive = ".. py:module::" if IS_BACKEND else ".. js:module::"
    module_pages = 0
    for path in api_rst:
        text = path.read_text(encoding="utf-8")
        markers.extend(match.group(2) for match in marker_pattern.finditer(text))
        if module_directive in text:
            module_pages += 1
        for match in marker_pattern.finditer(text):
            tail = text[match.end() : match.end() + 7000]
            next_marker = re.search(r"\n\s*\.\. CWM-AST-(?:FUNCTION|LAMBDA) ", tail)
            block = tail[: next_marker.start()] if next_marker else tail
            if "**参数**" not in block:
                fail(f"{rel(path)}: callable {match.group(2)} has no parameter explanation")
            if "**返回值**" not in block:
                fail(f"{rel(path)}: callable {match.group(2)} has no return-value explanation")

    duplicates = [item for item, count in Counter(markers).items() if count > 1]
    if duplicates:
        fail(f"Generated API contains {len(duplicates)} duplicate function markers; sample={duplicates[:3]}")
    expected_summary_count = summary.get("function_nodes")
    if expected_summary_count is None:
        fail("GENERATION_SUMMARY.txt does not contain function_nodes")
    elif expected_summary_count != len(markers):
        fail(f"Summary function_nodes={expected_summary_count}, but generated pages contain {len(markers)} markers")
    if summary.get("modules") != module_pages:
        fail(f"Summary modules={summary.get('modules')}, but generated pages contain {module_pages} module directives")

    if IS_BACKEND:
        expected: set[str] = set()
        sources = backend_source_files()
        for path in sources:
            try:
                tree = ast.parse(path.read_text(encoding="utf-8-sig"), filename=str(path))
            except SyntaxError as exc:
                fail(f"Cannot parse backend source {rel(path)}: {exc}")
                continue
            for node in ast.walk(tree):
                if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
                    expected.add(python_marker(path, node, "FUNCTION"))
                elif isinstance(node, ast.Lambda):
                    expected.add(python_marker(path, node, "LAMBDA"))
            output = API_ROOT / path.relative_to(PROJECT_ROOT).with_suffix(".rst")
            if not output.exists():
                fail(f"Missing generated module page for {rel(path)}")
        actual = set(markers)
        missing = sorted(expected - actual)
        extra = sorted(actual - expected)
        if missing:
            fail(f"Python API is missing {len(missing)} callable nodes; sample={missing[:3]}")
        if extra:
            fail(f"Python API contains {len(extra)} stale callable nodes; sample={extra[:3]}")

    print(
        f"{API_DOMAIN} API coverage | modules={module_pages} | "
        f"function_nodes={len(markers)} | duplicates={len(markers) - len(set(markers))}"
    )


def main() -> int:
    if not SOURCE_ROOT.exists():
        print(f"ERROR: documentation source does not exist: {SOURCE_ROOT}", file=sys.stderr)
        return 2
    validate_rst()
    summary = parse_summary()
    validate_generated_api(summary)
    for message in warnings:
        print(f"WARNING: {message}")
    if errors:
        print("\nDocumentation validation failed:", file=sys.stderr)
        for message in errors:
            print(f"  - {message}", file=sys.stderr)
        return 1
    print(f"CWM {API_DOMAIN} developer manual validation passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
