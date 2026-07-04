from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate, EmployeeResponse


router = APIRouter(
    prefix="/employees",
    tags=["employees"]
)
# Create
@router.post("/", response_model=EmployeeResponse)
def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    db_employee = Employee(**employee.model_dump())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee
# Read
@router.get("/", response_model=list[EmployeeResponse])
def get_employees(db: Session = Depends(get_db)):
    employees = db.query(Employee).all()
    return employees
@router.get("/{employee_id}", response_model=EmployeeResponse)
def get_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee
# Update
@router.patch("/{employee_id}", response_model=EmployeeResponse)
def update_employee(employee_id: int, employee: EmployeeCreate, db: Session = Depends(get_db)):
    db_employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    for key, value in employee.model_dump(exclude_unset=True).items():
        setattr(db_employee, key, value)
    db.commit()
    db.refresh(db_employee)
    return db_employee
# Delete
@router.delete("/{employee_id}")
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    if employee.user_id:
        from app.models.user import User
        user = db.query(User).filter(User.id == employee.user_id).first()
        if user:
            db.delete(user)
    db.delete(employee)
    db.commit()
    return {"message": "Employee deleted successfully"}