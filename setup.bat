@echo off
REM Setup Node.js path and install dependencies

set NODEJS_PATH=C:\nodejs\node-v20.11.0-win-x64
set PATH=%NODEJS_PATH%;%PATH%

echo.
echo === Node.js Environment Setup ===
echo Path: %NODEJS_PATH%
echo.

%NODEJS_PATH%\node.exe --version
%NODEJS_PATH%\npm.cmd --version

echo.
echo === Installing Dependencies ===
echo.

%NODEJS_PATH%\npm.cmd install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo === Installation Complete ===
    echo.
    echo Next steps:
    echo 1. Create .env.local with your API keys
    echo 2. Run: npm run dev
    echo.
) else (
    echo.
    echo === Installation Failed ===
    echo Check the errors above
    echo.
)

pause
