# 🚀 Deployment Guide for Kidan's Portfolio

## Quick Deploy (2 Minutes) — Frontend Only

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Portfolio - Kidan Dibekulu"
git branch -M main

# Create a repo on github.com called "portfolio"
git remote add origin https://github.com/wdk2123/portfolio.git
git push -u origin main
```

### Step 2: Deploy on Vercel (FREE)
1. Go to **[vercel.com](https://vercel.com)** → Sign up with GitHub
2. Click **"Add New..." → "Project"**
3. Select your **portfolio** repo → Click **"Import"**
4. Settings are auto-detected:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **"Deploy"**
6. ✅ Your site is live at `portfolio-xxxx.vercel.app` in ~60 seconds!

### Step 3: Add Custom Domain (Optional)
1. In Vercel dashboard → Your project → **Settings → Domains**
2. Add your domain (e.g., `kidandibekulu.com`)
3. Follow DNS instructions
4. Free HTTPS is automatic!

---

## Full-Stack Deploy (Frontend + Backend)

### Backend on Render.com (FREE)

#### Step 1: Push backend to GitHub
Your `backend/` folder is already in the repo.

#### Step 2: Create Render Web Service
1. Go to **[render.com](https://render.com)** → Sign up with GitHub
2. Click **"New +" → "Web Service"**
3. Connect your portfolio repo
4. Configure:
   - **Name:** `portfolio-api`
   - **Root Directory:** `backend`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt && python manage.py collectstatic --noinput`
   - **Start Command:** `gunicorn portfolio.wsgi:application`
   - **Instance Type:** Free

#### Step 3: Add Environment Variables on Render
Click "Environment" tab and add:
```
DJANGO_SECRET_KEY=your-random-secret-key-here
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=your-api.onrender.com
DB_ENGINE=django.db.backends.postgresql
JWT_SECRET_KEY=your-jwt-secret-here
CORS_ALLOWED_ORIGINS=https://your-vercel-url.vercel.app
```

#### Step 4: Add PostgreSQL Database
1. In Render dashboard → **"New +" → "PostgreSQL"**
2. Name: `portfolio-db` → Free tier → Create
3. Copy the connection details
4. Add to your web service environment:
```
DB_NAME=portfolio_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=5432
```

#### Step 5: Run Migrations
In Render dashboard → Your service → **Shell** tab:
```bash
python manage.py migrate
python manage.py createsuperuser
```

#### Step 6: Connect Frontend to Backend
In Vercel → Your project → **Settings → Environment Variables**:
```
VITE_API_URL=https://your-api.onrender.com/api
```
Then **redeploy** your Vercel site.

---

## How the API Switch Works

The frontend automatically switches between mock data and real API:

```
No VITE_API_URL set     → Uses mock data (works offline)
VITE_API_URL=http://... → Connects to real Django backend
```

**Local development with backend:**
```bash
# Create .env.local file:
echo "VITE_API_URL=http://localhost:8000/api" > .env.local

# Run frontend:
npm run dev

# In another terminal, run backend:
cd backend
python manage.py runserver
```

**Production:**
```
Set VITE_API_URL in Vercel environment variables
Frontend automatically connects to your Render backend
```

---

## Environment Variables Summary

### Frontend (.env.local or Vercel)
| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_API_URL` | `https://your-api.onrender.com/api` | Django API URL (leave empty for mock data) |

### Backend (Render or .env)
| Variable | Value | Description |
|----------|-------|-------------|
| `DJANGO_SECRET_KEY` | random string | Django secret key |
| `DJANGO_DEBUG` | `False` | Disable debug in production |
| `DJANGO_ALLOWED_HOSTS` | `your-api.onrender.com` | Your backend domain |
| `DB_ENGINE` | `django.db.backends.postgresql` | Use PostgreSQL |
| `DB_NAME` | from Render | Database name |
| `DB_USER` | from Render | Database user |
| `DB_PASSWORD` | from Render | Database password |
| `DB_HOST` | from Render | Database host |
| `DB_PORT` | `5432` | Database port |
| `JWT_SECRET_KEY` | random string | JWT signing key |
| `CORS_ALLOWED_ORIGINS` | `https://your-site.vercel.app` | Frontend URL |

---

## Free Hosting Summary

| Service | What it hosts | Cost | URL |
|---------|--------------|------|-----|
| **Vercel** | React Frontend | Free | vercel.com |
| **Render** | Django Backend + PostgreSQL | Free | render.com |
| **GitHub** | Code repository | Free | github.com |

**Total cost: $0/month** 🎉
