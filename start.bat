@echo off
cd /d "%~dp0"
title Discord V14 Advanced Infrastructure - Bot
node src/index.js
if %errorlevel% equ 0 (
    echo Bot started successfully!
) else (
    echo Bot failed to start. Check the logs in src/logs/ for details.
)
pause