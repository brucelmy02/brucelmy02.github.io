@echo off
setlocal EnableExtensions
chcp 65001 >nul

pushd "%~dp0"
title Muyu Liu Homepage - Development Server

echo.
echo ========================================
echo   Muyu Liu Homepage - Local Development
echo ========================================
echo.

set "NODE_EXE="
where node.exe >nul 2>&1
if not errorlevel 1 set "NODE_EXE=node.exe"

if not defined NODE_EXE if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" (
  set "NODE_EXE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
  set "PATH=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback;%PATH%"
)

if not defined NODE_EXE (
  echo [Error] Node.js is not installed or is not available in PATH.
  echo Please install Node.js 22.13 or newer from https://nodejs.org/
  echo.
  pause
  popd
  exit /b 1
)

"%NODE_EXE%" -e "const v=process.versions.node.split('.').map(Number);process.exit(Math.max(0,-Math.sign(v[0]*1000000+v[1]*1000+v[2]-22013000)))"
if errorlevel 1 (
  echo [Error] This project requires Node.js 22.13 or newer.
  echo Current version:
  "%NODE_EXE%" --version
  echo.
  pause
  popd
  exit /b 1
)

set "PACKAGE_MANAGER="
where npm.cmd >nul 2>&1
if not errorlevel 1 set "PACKAGE_MANAGER=npm.cmd"

if not defined PACKAGE_MANAGER (
  where pnpm.cmd >nul 2>&1
  if not errorlevel 1 set "PACKAGE_MANAGER=pnpm.cmd"
)

if not defined PACKAGE_MANAGER if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd" (
  set "PACKAGE_MANAGER=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd"
)

if not defined PACKAGE_MANAGER (
  echo [Error] npm or pnpm was not found.
  echo Reinstall Node.js with npm included, then try again.
  echo.
  pause
  popd
  exit /b 1
)

if not exist "node_modules\" (
  echo [1/2] Installing dependencies. This is only needed the first time...
  call "%PACKAGE_MANAGER%" install
  if errorlevel 1 (
    echo.
    echo [Error] Dependency installation failed. Review the message above.
    pause
    popd
    exit /b 1
  )
  echo.
)

if /I "%~1"=="--check" (
  echo [OK] Environment and dependencies are ready.
  popd
  exit /b 0
)

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command ^
  "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000/' -UseBasicParsing -TimeoutSec 1; if ($response.StatusCode -eq 200) { exit 0 } } catch {}; exit 1"

if not errorlevel 1 (
  echo [OK] The website is already running at http://localhost:3000/
  start "" "http://localhost:3000/"
  echo.
  echo You can close this window. Stop the existing server with Ctrl+C in its terminal.
  pause
  popd
  exit /b 0
)

echo [2/2] Starting the development server...
echo The browser will open automatically at http://localhost:3000/
echo Save your code to update the page automatically.
echo Press Ctrl+C in this window to stop the server.
echo.

start "" powershell.exe -NoProfile -WindowStyle Hidden -Command ^
  "$url='http://localhost:3000/'; for ($i=0; $i -lt 40; $i++) { try { $response=Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 1; if ($response.StatusCode -eq 200) { Start-Process $url; exit } } catch {}; Start-Sleep -Milliseconds 500 }"

if exist "node_modules\vinext\dist\cli.js" (
  "%NODE_EXE%" "node_modules\vinext\dist\cli.js" dev
) else (
  call "%PACKAGE_MANAGER%" run dev
)
set "DEV_EXIT=%ERRORLEVEL%"

echo.
if not "%DEV_EXIT%"=="0" (
  echo [Error] The development server stopped unexpectedly.
) else (
  echo Development server stopped.
)
pause
popd
exit /b %DEV_EXIT%
