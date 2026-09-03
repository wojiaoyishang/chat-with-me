@echo off
setlocal EnableExtensions
pushd "%~dp0.." || exit /b 1

echo [CWM] Cleaning removed frontend files and stale build/test artifacts...

rem Removed generated analysis/test artifacts.
if exist "stats.html" del /f /q "stats.html"
if exist "tests" rmdir /s /q "tests"
if exist "coverage" rmdir /s /q "coverage"
if exist ".nyc_output" rmdir /s /q ".nyc_output"
if exist "test-results" rmdir /s /q "test-results"
if exist ".vite" rmdir /s /q ".vite"
if exist "node_modules\.vite" rmdir /s /q "node_modules\.vite"
if exist "dist" rmdir /s /q "dist"
if exist "docs\_build" rmdir /s /q "docs\_build"

rem Removed orphan assets.
for %%F in (
  "src\assets\#U673a#U5668#U4eba.png"
  "src\assets\AI.png"
  "src\assets\css\code-block.css"
  "src\assets\human.jpg"
  "src\assets\icon\TXT.png"
  "src\assets\react.svg"
  "src\assets\test.png"
) do if exist "%%~F" del /f /q "%%~F"

rem Removed unreachable/orphan source modules.
for %%F in (
  "src\components\debugger\Debugger.js"
  "src\components\markdown\card-block\StableCardBlock.jsx"
  "src\components\markdown\card-block\frozenCardStore.js"
  "src\components\markdown\card-block\index.jsx"
  "src\features\chat\page\components\MessageOverviewDialog.jsx"
  "src\features\chat\ui\message\components\ContextInspectorDialog.jsx"
  "src\features\chat\ui\message\components\MessageMenuButton.jsx"
  "src\features\execution\components\ToolInvocationCard.jsx"
  "src\features\execution\components\toolInvocationCardAdapter.js"
  "src\features\workspace\WorkspaceSelector.jsx"
  "src\features\workspace\components\WorkspaceTransferProgress.jsx"
) do if exist "%%~F" del /f /q "%%~F"

rem Generated API pages for removed modules.
for %%F in (
  "docs\source\api\javascript\components\debugger\Debugger.rst"
  "docs\source\api\javascript\components\markdown\card-block\StableCardBlock.rst"
  "docs\source\api\javascript\components\markdown\card-block\frozenCardStore.rst"
  "docs\source\api\javascript\components\markdown\card-block\index.rst"
  "docs\source\api\javascript\features\chat\page\components\MessageOverviewDialog.rst"
  "docs\source\api\javascript\features\chat\ui\message\components\ContextInspectorDialog.rst"
  "docs\source\api\javascript\features\chat\ui\message\components\MessageMenuButton.rst"
  "docs\source\api\javascript\features\execution\components\ToolInvocationCard.rst"
  "docs\source\api\javascript\features\workspace\WorkspaceSelector.rst"
  "docs\source\api\javascript\features\workspace\components\WorkspaceTransferProgress.rst"
) do if exist "%%~F" del /f /q "%%~F"

rem Remove directories only when they are now empty.
for %%D in (
  "src\components\debugger"
  "src\features\execution\components"
  "src\features\workspace\components"
  "src\assets\icon"
  "docs\source\api\javascript\components\debugger"
  "docs\source\api\javascript\features\execution\components"
  "docs\source\api\javascript\features\workspace\components"
) do if exist "%%~D" rmdir "%%~D" 2>nul

echo [CWM] Frontend cleanup complete.
popd
exit /b 0
