@echo off
echo ========================================
echo   Starting Kidan's Portfolio
echo ========================================
echo.
echo Starting Django backend on port 8000...
echo.

start "Django Backend" cmd /k "cd backend && venv\Scripts\activate && python manage.py runserver"

echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Starting React frontend on port 5173...
echo.
start "React Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo   Both servers starting!
echo ========================================
echo.
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:8000
echo   API Docs: http://localhost:8000/api/docs/
echo   Admin:    http://localhost:8000/admin/
echo.
echo Close both terminal windows to stop.
echo.
pause
