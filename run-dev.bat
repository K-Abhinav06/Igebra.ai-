@echo off
REM Run the development server

set NODEJS_PATH=C:\nodejs\node-v20.11.0-win-x64
set PATH=%NODEJS_PATH%;%PATH%

echo.
echo === Starting EduAI Development Server ===
echo.
echo Access at: http://localhost:3000
echo.
echo Press Ctrl+C to stop
echo.

%NODEJS_PATH%\npm.cmd run dev

pause
