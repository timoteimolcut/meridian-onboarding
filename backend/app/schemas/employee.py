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

    class Config:
        from_attributes = True


        