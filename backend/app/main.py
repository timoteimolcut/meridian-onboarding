from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.models import employee, checklist, resource
from app.routers import employee, checklist, resource
from app.routers import auth
from app.models import user

app = FastAPI(title="Meridian Onboarding API")
Base.metadata.create_all(bind=engine)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://meridian-onboarding.netlify.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    return {"message": "Meridian Onboarding API is running"}

@app.get("/health")
def health():
    return {"status": "ok"}


app.include_router(employee.router)
app.include_router(checklist.router)
app.include_router(resource.router)
app.include_router(auth.router)