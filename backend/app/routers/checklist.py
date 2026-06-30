from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.checklist import ChecklistTask
from app.schemas.checklist import ChecklistTaskCreate, ChecklistTaskResponse, ChecklistTaskUpdate

router = APIRouter(
    prefix="/checklist",
    tags=["checklist"]
)

@router.get("/", response_model=list[ChecklistTaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    tasks = db.query(ChecklistTask).order_by(ChecklistTask.week, ChecklistTask.id).all()
    return tasks

@router.get("/{task_id}", response_model=ChecklistTaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(ChecklistTask).filter(ChecklistTask.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.post("/", response_model=ChecklistTaskResponse)
def create_task(task: ChecklistTaskCreate, db: Session = Depends(get_db)):
    db_task = ChecklistTask(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.patch("/{task_id}", response_model=ChecklistTaskResponse)
def update_task(task_id: int, task_update: ChecklistTaskUpdate, db: Session = Depends(get_db)):
    task = db.query(ChecklistTask).filter(ChecklistTask.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    task.is_completed = task_update.is_completed
    db.commit()
    db.refresh(task)
    return task

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(ChecklistTask).filter(ChecklistTask.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully"}