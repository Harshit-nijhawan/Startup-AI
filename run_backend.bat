@echo off
.\.venv_stable\Scripts\python.exe -m uvicorn app.main:app --reload
pause
