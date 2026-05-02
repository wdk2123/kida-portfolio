# 📋 Setup Guide — Kidan's Portfolio

## What You Need Installed First

### 1. Python (you already have it ✅)
Check: Open terminal and type:
```
python --version
```
You should see Python 3.x.x

### 2. Node.js (you need this for the frontend)
- Download from: **https://nodejs.org**
- Choose the **"LTS"** version (recommended)
- Install it (just click Next, Next, Next)
- After install, **close and reopen your terminal**
- Check: Type `node --version` — you should see v20.x.x or similar

### 3. VS Code (you already have it ✅)

---

## 🚀 Easy Setup (Windows — Double Click)

### Step 1: Run Setup
1. Open your project folder in VS Code
2. In the file list, find **`setup.bat`**
3. **Right-click** → "Open in Terminal" (or double-click it in File Explorer)
4. Wait for it to finish (it installs everything)

### Step 2: Start the Project
1. Find **`start.bat`**
2. **Right-click** → "Open in Terminal" (or double-click it)
3. Two windows will open:
   - One for Django backend (port 8000)
   - One for React frontend (port 5173)
4. Open browser: **http://localhost:5173**

---

## 🚀 Manual Setup (Step by Step)

If the batch files don't work, do it manually:

### Terminal 1 — Backend (Django)
```bash
# Go to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate

# Install packages
pip install -r requirements.txt

# Create database
python manage.py migrate

# Create .env file (copy from example)
copy ..\backend\.env.example .env
# Or just create it manually with the content below

# Start the server
python manage.py runserver
```

### Terminal 2 — Frontend (React)
```bash
# Go to project root (if you're in backend, go up one level)
cd ..

# Install packages
npm install

# Create .env.local file
echo VITE_API_URL=http://localhost:8000/api > .env.local

# Start the server
npm run dev
```

### Open in Browser
- Frontend: **http://localhost:5173**
- Backend API: **http://localhost:8000/api/**
- API Docs: **http://localhost:8000/api/docs/**
- Django Admin: **http://localhost:8000/admin/**

---

## 🔧 Common Problems & Fixes

### Problem: "python is not recognized"
**Fix:** Python is not in your PATH
1. Open Windows Search → type "Environment Variables"
2. Click "Edit the system environment variables"
3. Click "Environment Variables" button
4. Find "Path" in the bottom section → Click "Edit"
5. Click "New" and add: `C:\Users\YOUR_USERNAME\AppData\Local\Programs\Python\Python312\`
6. Also add: `C:\Users\YOUR_USERNAME\AppData\Local\Programs\Python\Python312\Scripts\`
7. Click OK on everything
8. **Close and reopen your terminal**

### Problem: "npm is not recognized"
**Fix:** Node.js is not installed or not in PATH
1. Download from https://nodejs.org (LTS version)
2. Install it
3. **Close and reopen your terminal**
4. Check: `node --version`

### Problem: "pip install" fails
**Fix:** Try upgrading pip first
```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### Problem: Frontend doesn't connect to backend
**Fix:** Make sure `.env.local` exists in the project root
```bash
# In the main project folder (not backend)
echo VITE_API_URL=http://localhost:8000/api > .env.local
```
Then restart the frontend: `npm run dev`

### Problem: "port 8000 already in use"
**Fix:** Use a different port
```bash
python manage.py runserver 8001
```
Then update `.env.local`:
```
VITE_API_URL=http://localhost:8001/api
```

### Problem: CORS error in browser console
**Fix:** Make sure your backend `.env` file has:
```
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

---

## 📁 The .env File (Backend)

Create this file at `backend/.env`:
```
DJANGO_SECRET_KEY=my-super-secret-key-12345
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
DB_ENGINE=django.db.backends.sqlite3
DB_NAME=db.sqlite3
JWT_SECRET_KEY=my-jwt-secret-key-12345
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

## 📁 The .env.local File (Frontend)

Create this file at the project root (same level as package.json):
```
VITE_API_URL=http://localhost:8000/api
```

---

## 🎯 Quick Test — Is Everything Working?

1. **Backend test:** Open http://localhost:8000/api/health/
   - Should show: `{"status": "healthy", "service": "Portfolio API"}`

2. **Frontend test:** Open http://localhost:5173
   - Should show your portfolio home page with your name

3. **Connection test:** Open browser console (F12)
   - If you see API calls to localhost:8000 → Connected! ✅
   - If no API calls → Check `.env.local` file

---

## 📞 Need Help?

If something doesn't work, tell me:
1. What error message you see
2. Which step you're on
3. What happens when you run each command

I'll help you fix it! 💪
