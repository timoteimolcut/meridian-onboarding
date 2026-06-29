# Meridian Onboarding

A web application that makes the first month at Meridian significantly less chaotic.

## Stack
- **Backend:** FastAPI + PostgreSQL + SQLAlchemy
- **Frontend:** React (TypeScript) + Vite

## How to run locally

### Prerequisites
- Python 3.11+
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

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Backend runs on http://localhost:8000  
Frontend runs on http://localhost:5173
