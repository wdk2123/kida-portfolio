# Kidan Dibekulu — Portfolio

A professional full-stack portfolio web application built with React + Django REST Framework.

**Owner:** Kidan Dibekulu — Full-Stack Developer & Electrical and Computer Engineer  
**Email:** kidandibekulu0@gmail.com  
**Location:** Addis Ababa, Ethiopia

## Architecture

```
┌─────────────────────┐     REST API      ┌─────────────────────┐
│   React Frontend    │ ◄───────────────► │   Django Backend    │
│   (Vite + Tailwind) │   JWT Auth + JSON │   (DRF + PostgreSQL)│
└─────────────────────┘                   └─────────────────────┘
```

## Frontend (React + Vite + Tailwind)

### Features
- 🏠 **Home Page** - Hero section with animated backgrounds, stats, services, and featured projects
- 👤 **About Page** - Skills with animated progress bars, experience timeline, education cards
- 📁 **Projects Page** - Filterable/searchable project gallery with detail pages
- 📝 **Blog Section** - Blog listing with categories, search, and full article pages
- 📬 **Contact Form** - Validated contact form with success/error states
- 🔐 **Admin Dashboard** - Full CRUD management for projects, blog posts, skills, and messages
- 📱 **Responsive Design** - Mobile-first design with beautiful dark theme

### Tech Stack
- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS v4
- React Router v6
- React Hook Form
- Lucide React icons

### Running the Frontend

```bash
npm install
npm run dev      # Development server at localhost:5173
npm run build    # Production build
```

### Connecting to Real Backend

Edit `src/services/api.ts` and replace mock implementations with actual API calls:

```typescript
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Example: Replace mock with real call
export const projectApi = {
  getAll: async () => {
    const response = await api.get('/projects/');
    return { data: response.data.results, count: response.data.count };
  },
  // ...
};
```

---

## Backend (Django + DRF)

### Features
- 🔐 **JWT Authentication** - Secure token-based auth with refresh tokens
- 📊 **RESTful API** - Full CRUD endpoints for all models
- 📚 **Auto Documentation** - Swagger/OpenAPI docs at `/api/docs/`
- 🔍 **Filtering & Search** - Django filters, search, and ordering
- ⚡ **Throttling** - Rate limiting for contact form and API
- 🔒 **Security** - CORS, HTTPS, XSS protection, CSRF tokens
- 📦 **Pagination** - Built-in pagination for list endpoints

### API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/health/` | Health check | Public |
| POST | `/api/auth/login/` | JWT login | Public |
| POST | `/api/auth/refresh/` | Refresh token | Public |
| POST | `/api/auth/verify/` | Verify token | Public |
| GET | `/api/projects/` | List projects | Public |
| GET | `/api/projects/{id}/` | Project detail | Public |
| POST | `/api/projects/` | Create project | Admin |
| PUT/PATCH | `/api/projects/{id}/` | Update project | Admin |
| DELETE | `/api/projects/{id}/` | Delete project | Admin |
| GET | `/api/projects/featured/` | Featured projects | Public |
| GET | `/api/skills/` | List skills | Public |
| POST/PUT/DELETE | `/api/skills/` | Manage skills | Admin |
| GET | `/api/experience/` | List experience | Public |
| POST/PUT/DELETE | `/api/experience/` | Manage experience | Admin |
| GET | `/api/education/` | List education | Public |
| POST/PUT/DELETE | `/api/education/` | Manage education | Admin |
| GET | `/api/blog/` | List blog posts | Public |
| GET | `/api/blog/{slug}/` | Blog post detail | Public |
| POST | `/api/blog/` | Create post | Admin |
| PUT/PATCH/DELETE | `/api/blog/{id}/` | Manage post | Admin |
| POST | `/api/contact/` | Submit message | Public (throttled) |
| GET | `/api/contact/` | List messages | Admin |

### Running the Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver

# Access admin at http://localhost:8000/admin/
# Access API docs at http://localhost:8000/api/docs/
```

### Production Deployment

```bash
# Set DEBUG=False in .env
# Configure PostgreSQL
# Set proper ALLOWED_HOSTS
# Set CORS_ALLOWED_ORIGINS

# Collect static files
python manage.py collectstatic

# Run with gunicorn
gunicorn portfolio.wsgi:application --bind 0.0.0.0:8000
```

---

## Admin Login (Demo)

- **Username:** `admin`
- **Password:** `admin123`

---

## Project Structure

```
├── src/                          # React Frontend
│   ├── components/               # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ProtectedRoute.tsx
│   ├── context/                  # React Context (Auth)
│   │   └── AuthContext.tsx
│   ├── data/                     # Mock data
│   │   └── mockData.ts
│   ├── pages/                    # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogDetail.tsx
│   │   ├── Contact.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── Login.tsx
│   ├── services/                 # API service layer
│   │   └── api.ts
│   ├── types/                    # TypeScript types
│   │   └── index.ts
│   ├── App.tsx                   # Main app with routing
│   ├── index.css                 # Global styles
│   └── main.tsx                  # Entry point
│
├── backend/                      # Django Backend
│   ├── portfolio/                # Django project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── api/                      # API app
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── admin.py
│   ├── requirements.txt
│   ├── manage.py
│   └── .env.example
│
└── index.html                    # Frontend HTML entry
```
