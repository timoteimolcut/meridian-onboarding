from sqlalchemy import Column, Integer, String
from app.database import Base


class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    url = Column(String)
    category = Column(String, nullable=False)


    