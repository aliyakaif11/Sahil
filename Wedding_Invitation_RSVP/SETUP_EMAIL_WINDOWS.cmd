@echo off
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0SETUP_EMAIL.ps1"
echo.
pause
