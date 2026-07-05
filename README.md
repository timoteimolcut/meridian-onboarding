# Meridian Onboarding

A web application that makes the first month at Meridian significantly less chaotic.

Built as a practical solution to a real problem — the painful, disorganised onboarding experience that new hires face at many companies.

## Live Demo
- **Frontend:** https://meridian-onboarding.netlify.app
- **Backend API docs:** https://meridian-backend-kf77.onrender.com/docs

> Note: the backend runs on Render's free tier and may take 30-50 seconds to wake up after inactivity. If the app feels slow on first load, wait a moment and try again.

## Demo credentials
- **Admin:** username `admin` / password `admin123`
- **Employee:** username `employee` / password `employee123`
- Or sign up as a new employee directly from the app

> To create admin and employee accounts on a fresh database, call:
> `POST /auth/register` with body `{"username": "admin", "password": "admin123", "role": "admin"}`
> and `{"username": "employee", "password": "employee123", "role": "employee"}`
> Or call `POST /auth/seed` to populate all sample data at once.

## Stack
- **Backend:** FastAPI + PostgreSQL + SQLAlchemy
- **Frontend:** React (TypeScript) + Vite + Tailwind CSS
- **Auth:** JWT + bcrypt
- **Deployment:** Render (backend + DB) + Netlify (frontend)

## Features
- 🔐 Authentication with two roles: new employee and HR admin
- ✅ Onboarding checklist organised by week with progress tracking
- 👥 Team directory with department filter
- 📚 Resources hub with category filter
- 🛠️ Admin panel — manage employees, tasks and resources
- 👤 Personal profile page linked to employee record

## How to run locally

### Prerequisites
- Python 3.12+
- Node.js 18+
- PostgreSQL running locally

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env      # fill in your DB credentials
uvicorn app.main:app --reload
```

The `.env` file should contain:
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/meridian

### Frontend

Create a `frontend/.env` file:
VITE_API_URL=http://localhost:8000

Then:

```bash
cd frontend
npm install
npm run dev
```

Backend runs on http://localhost:8000  
Frontend runs on http://localhost:5173  
API docs available at http://localhost:8000/docs

### Seed the database (optional)

To populate the database with sample data, call the seed endpoint once after the backend is running:
POST http://localhost:8000/auth/seed
Then create admin and employee accounts via:
POST http://localhost:8000/auth/register

## Deployment

- Frontend deployed on **Netlify:** https://meridian-onboarding.netlify.app
- Backend deployed on **Render:** https://meridian-backend-kf77.onrender.com
- Database: **PostgreSQL on Render** (free tier, expires August 2, 2026)

For deployment, set the following environment variable on Netlify:
VITE_API_URL=https://meridian-backend-kf77.onrender.com