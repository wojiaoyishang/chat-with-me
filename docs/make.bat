@ECHO OFF
SETLOCAL
CD /D "%~dp0"

IF /I "%~1"=="clean" GOTO clean

SET "PYTHON_EXE=..\.venv\Scripts\python.exe"
IF NOT EXIST "%PYTHON_EXE%" SET "PYTHON_EXE=python"

node tools\generate_javascript_api.mjs --optional
IF ERRORLEVEL 1 GOTO error
node tools\validate_javascript_api.mjs --optional
IF ERRORLEVEL 1 GOTO error
"%PYTHON_EXE%" tools\normalize_rst.py
IF ERRORLEVEL 1 GOTO error
"%PYTHON_EXE%" tools\validate_docs.py
IF ERRORLEVEL 1 GOTO error
"%PYTHON_EXE%" -c "import sphinx, sphinx_rtd_theme" >NUL 2>NUL
IF ERRORLEVEL 1 (
  ECHO Sphinx is not installed.
  ECHO Run: "%PYTHON_EXE%" -m pip install -r requirements.txt
  GOTO error
)
"%PYTHON_EXE%" -m sphinx -W --keep-going -E -a -b html source _build\html
IF ERRORLEVEL 1 GOTO error

ECHO.
ECHO Frontend developer manual: %CD%\_build\html\index.html
EXIT /B 0

:clean
IF EXIST "_build" RMDIR /S /Q "_build"
ECHO Frontend documentation build output removed.
EXIT /B 0

:error
ECHO Frontend documentation build failed.
EXIT /B 1
