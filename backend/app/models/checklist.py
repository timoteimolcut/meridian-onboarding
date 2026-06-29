from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base


class ChecklistTask(Base):
    __tablename__ = "checklist_tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    week = Column(Integer, nullable=False)
    is_completed = Column(Boolean, default=False)