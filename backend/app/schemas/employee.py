from pydantic import BaseModel


class EmployeeBase(BaseModel):
    name: str
    department: str
    role: str
    slack_handle: str | None = None
    email: str | None = None

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeResponse(EmployeeBase):
    id: int
    user_id: int | None = None

    class Config:
        from_attributes = True        