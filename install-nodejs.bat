@echo off
REM Download and install Node.js LTS
echo Downloading Node.js...
powershell -Command "& {$ProgressPreference = 'SilentlyContinue'; (New-Object System.Net.WebClient).DownloadFile('https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi', 'node-installer.msi')}"

if exist node-installer.msi (
    echo Installing Node.js...
    start /wait node-installer.msi /quiet
    del node-installer.msi
    echo Node.js installed successfully!
    echo.
    echo Run: npm install
) else (
    echo Failed to download Node.js
    echo Please download manually from: https://nodejs.org
)
pause
