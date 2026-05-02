@echo off
echo ========================================
echo   Kidan's Portfolio - Setup Script
echo ========================================
echo.

echo [1/4] Setting up Python backend...
cd backend

echo Creating virtual environment...
python -m venv venv
if errorlevel 1 (
    echo ERROR: Failed to create virtual environment.
    echo Make sure Python is installed and added to PATH.
    echo Try: python --version
    pause
    exit /b 1
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing Python packages...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install packages.
    pause
    exit /b 1
)

echo Running database migrations...
python manage.py migrate

echo Creating .env file...
if not exist .env (
    echo DJANGO_SECRET_KEY=my-secret-key-change-in-production > .env
    echo DJANGO_DEBUG=True >> .env
    echo DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1 >> .env
    echo DB_ENGINE=django.db.backends.sqlite3 >> .env
    echo DB_NAME=db.sqlite3 >> .env
    echo JWT_SECRET_KEY=my-jwt-secret >> .env
    echo CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000 >> .env
    echo .env file created!
)

cd ..

echo.
echo [2/4] Setting up frontend...
echo Installing Node packages...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install npm packages.
    echo Make sure Node.js is installed: https://nodejs.org
    pause
    exit /b 1
)

echo Creating .env.local file...
if not exist .env.local (
    echo VITE_API_URL=http://localhost:8000/api > .env.local
    echo .env.local created!
)

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo To start the project:
echo.
echo   1. Backend (terminal 1):
echo      cd backend
echo      venv\Scripts\activate
echo      python manage.py runserver
echo.
echo   2. Frontend (terminal 2):
echo      npm run dev
echo.
echo Then open: http://localhost:5173
echo.
pause
