from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import LoginRequest, Token, UserCreate, UserResponse, SignUpRequest
from app.schemas.employee import EmployeeResponse
import bcrypt
from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "meridian-secret-key-2026"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

router = APIRouter(prefix="/auth", tags=["auth"])

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed.encode())

def create_token(data: dict) -> str:
    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/login", response_model=Token)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == request.username).first()
    if user is None or not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    token = create_token({"sub": user.username, "role": user.role})
    return {"access_token": token, "token_type": "bearer", "role": user.role}

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.username == user.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed = hash_password(user.password)
    db_user = User(username=user.username, hashed_password=hashed, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/signup", response_model=UserResponse)
def signup(request: SignUpRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.username == request.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed = hash_password(request.password)
    db_user = User(username=request.username, hashed_password=hashed, role="employee")
    db.add(db_user)
    db.flush()
    from app.models.employee import Employee
    db_employee = Employee(
        name=request.name,
        department=request.department,
        role=request.role,
        slack_handle=request.slack_handle,
        email=request.email,
        user_id=db_user.id
    )
    db.add(db_employee)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/me", response_model=EmployeeResponse)
def get_me(token: str, db: Session = Depends(get_db)):
    from app.models.employee import Employee
    from app.schemas.employee import EmployeeResponse
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
    except:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    employee = db.query(Employee).filter(Employee.user_id == user.id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee profile not found")
    return employee

@router.post("/seed")
def seed_database(db: Session = Depends(get_db)):
    from app.models.employee import Employee
    from app.models.checklist import ChecklistTask
    from app.models.resource import Resource
    
    employees = [
        Employee(name="Sarah Chen", department="HR", role="HR Manager", slack_handle="@sarah.chen", email="sarah.chen@meridian.com"),
        Employee(name="Marcus Webb", department="Engineering", role="Backend Engineer", slack_handle="@marcus.webb", email="marcus.webb@meridian.com"),
        Employee(name="Priya Nair", department="Engineering", role="Frontend Engineer", slack_handle="@priya.nair", email="priya.nair@meridian.com"),
        Employee(name="Tom Bakker", department="Engineering", role="DevOps Engineer", slack_handle="@tom.bakker", email="tom.bakker@meridian.com"),
        Employee(name="Lucia Ferrero", department="Sales", role="Sales Lead", slack_handle="@lucia.ferrero", email="lucia.ferrero@meridian.com"),
        Employee(name="James Okafor", department="Marketing", role="Marketing Manager", slack_handle="@james.okafor", email="james.okafor@meridian.com"),
        Employee(name="Ana Popescu", department="Finance", role="Finance Analyst", slack_handle="@ana.popescu", email="ana.popescu@meridian.com"),
        Employee(name="David Müller", department="Engineering", role="ML Engineer", slack_handle="@david.muller", email="david.muller@meridian.com"),
    ]
    
    tasks = [
        ChecklistTask(title="Set up your laptop", description="Install required software: Slack, Chrome, VS Code, and any department-specific tools", week=1, is_completed=False),
        ChecklistTask(title="Join Slack workspace", description="Ask Sarah Chen for the invite link and join your department channel", week=1, is_completed=False),
        ChecklistTask(title="Set up company email", description="Contact IT to configure your @meridian.com email account", week=1, is_completed=False),
        ChecklistTask(title="Meet your team lead", description="Schedule a 30 min intro call on Google Meet to discuss your role and first tasks", week=1, is_completed=False),
        ChecklistTask(title="Get access to Git repository", description="Ask your team lead to add you to the company GitHub organization", week=2, is_completed=False),
        ChecklistTask(title="Request GPU cluster access", description="Submit a request via IT Helpdesk to get access to Meridian's GPU cluster for model training", week=2, is_completed=False),
        ChecklistTask(title="Set up conda environments", description="Follow the guide at docs.meridian.com to configure the standard ML conda environments on the cluster", week=2, is_completed=False),
        ChecklistTask(title="Complete security training", description="Mandatory online course available at training.meridian.com, must be completed within first 2 weeks", week=2, is_completed=False),
        ChecklistTask(title="Get access to Jarvis", description="Request access to Meridian's internal neural network training platform via your team lead", week=3, is_completed=False),
        ChecklistTask(title="Read the engineering handbook", description="Available at docs.meridian.com/engineering — covers coding standards, PR process, and deployment guidelines", week=3, is_completed=False),
        ChecklistTask(title="Set up your development environment", description="Follow the setup guide at docs.meridian.com/dev-setup to configure your local environment", week=3, is_completed=False),
        ChecklistTask(title="Meet the other departments", description="Schedule short intro calls with Sales, Marketing and Finance leads to understand the business context", week=3, is_completed=False),
        ChecklistTask(title="Run your first training job on the cluster", description="Use Jarvis to submit a test training job on the GPU cluster — follow the quickstart at docs.meridian.com/jarvis", week=4, is_completed=False),
        ChecklistTask(title="Complete first task assignment", description="Pick a starter task from the backlog together with your team lead", week=4, is_completed=False),
        ChecklistTask(title="Submit first pull request", description="Make a small contribution and go through the full PR review process", week=4, is_completed=False),
        ChecklistTask(title="One month check-in with HR", description="Schedule a 30 min call with Sarah Chen to discuss your first month experience", week=4, is_completed=False),
    ]
    
    resources = [
        Resource(title="Engineering Handbook", description="Coding standards, PR process, and best practices", url="https://docs.meridian.com/engineering", category="Processes"),
        Resource(title="Development Environment Setup", description="Step by step guide to configure your local environment", url="https://docs.meridian.com/dev-setup", category="Processes"),
        Resource(title="Hybrid Work Policy", description="Guidelines for office and remote days — 3 days office, 2 remote", url="https://docs.meridian.com/hybrid-policy", category="Processes"),
        Resource(title="Company GitHub Organization", description="Access to all internal repositories", url="https://github.com/meridian-ai", category="Repos"),
        Resource(title="ML Models Repository", description="Internal repository for all ML model code and experiments", url="https://github.com/meridian-ai/models", category="Repos"),
        Resource(title="Slack Workspace", description="Main communication tool — all team channels", url="https://meridian.slack.com", category="Tools"),
        Resource(title="Google Meet", description="Video calls and meetings", url="https://meet.google.com", category="Tools"),
        Resource(title="Jarvis — Neural Network Training Platform", description="Meridian's internal tool for training and managing neural networks on the GPU cluster", url="https://jarvis.meridian.com", category="Tools"),
        Resource(title="GPU Cluster Dashboard", description="Monitor your training jobs, GPU usage and queue status", url="https://cluster.meridian.com", category="Tools"),
        Resource(title="IT Helpdesk", description="For laptop issues, software access, GPU cluster requests and account problems", url="https://it.meridian.com", category="HR"),
        Resource(title="HR Portal", description="Time off requests, payslips and company policies", url="https://hr.meridian.com", category="HR"),
        Resource(title="Company Org Chart", description="Full organizational structure and reporting lines", url="https://docs.meridian.com/org-chart", category="HR"),
        Resource(title="Conda Environments Guide", description="How to use and create conda environments on the GPU cluster", url="https://docs.meridian.com/conda", category="Processes"),
        Resource(title="Jarvis Quickstart Guide", description="How to submit your first training job on Jarvis", url="https://docs.meridian.com/jarvis", category="Processes"),
    ]
    
    db.add_all(employees)
    db.add_all(tasks)
    db.add_all(resources)
    db.commit()
    return {"message": "Database seeded successfully!"}

@router.delete("/reset")
def reset_database(db: Session = Depends(get_db)):
    from app.models.employee import Employee
    from app.models.checklist import ChecklistTask
    from app.models.resource import Resource
    db.query(ChecklistTask).delete()
    db.query(Resource).delete()
    db.query(Employee).delete()
    db.query(User).delete()
    db.commit()
    # Recreate default users
    admin = User(username="admin", hashed_password=hash_password("admin123"), role="admin")
    employee = User(username="employee", hashed_password=hash_password("employee123"), role="employee")
    db.add(admin)
    db.add(employee)
    db.commit()
    return {"message": "Database reset successfully! Default users recreated."}