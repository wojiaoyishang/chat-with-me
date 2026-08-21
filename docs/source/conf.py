# Configuration file for the Sphinx documentation builder.

project = "Chat With Me Frontend"
copyright = "2026, CWM"
author = "CWM"
release = "Protocol v1 Developer Manual"

extensions = [
    "sphinx.ext.intersphinx",
    "sphinx.ext.todo",
]

templates_path = ["_templates"]
exclude_patterns = ["api/javascript/GENERATION_SUMMARY.txt"]
language = "zh_CN"

html_theme = "sphinx_rtd_theme"
html_static_path = ["_static"]
html_css_files = ["custom.css"]
html_show_sourcelink = True
html_theme_options = {
    "navigation_depth": 3,
    "collapse_navigation": False,
    "sticky_navigation": True,
    "includehidden": False,
    "titles_only": True,
}

todo_include_todos = True
suppress_warnings = ["misc.highlighting_failure"]
