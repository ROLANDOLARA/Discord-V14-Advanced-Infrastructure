@echo off
title Discord V14 Advanced Infrastructure - Install Dependencies
cd /d "%~dp0"
if not exist package.json (
    echo Error: package.json not found in %CD%. Please ensure you are in the correct directory.
    pause
    exit /b 1
)
echo Installing dependencies...
npm install
if %errorlevel% equ 0 (
    echo Dependencies installed successfully!
) else (
    echo Failed to install dependencies. Please check the errors above and ensure Node.js is installed.
)
pause