from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    department = Column(String, nullable=False)
    role = Column(String, nullable=False)
    slack_handle = Column(String)
    email = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)