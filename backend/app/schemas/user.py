from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str
    role: str

class UserResponse(BaseModel):
    id: int
    username: str
    role: str

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str

class SignUpRequest(BaseModel):
    username: str
    password: str
    name: str
    department: str
    role: str
    slack_handle: str | None = None
    email: str | None = None