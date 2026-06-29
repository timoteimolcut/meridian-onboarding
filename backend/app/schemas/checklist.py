from pydantic import BaseModel


class ChecklistTaskBase(BaseModel):
    title: str
    description: str | None = None
    week: int
    is_completed: bool = False

class ChecklistTaskCreate(ChecklistTaskBase):
    pass

class ChecklistTaskUpdate(BaseModel):
    is_completed: bool

class ChecklistTaskResponse(ChecklistTaskBase):
    id: int

    class Config:
        from_attributes = True