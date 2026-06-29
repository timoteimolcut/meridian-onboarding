from pydantic import BaseModel


class ResourceBase(BaseModel):
    title: str
    description: str | None = None
    url: str | None = None
    category: str

class ResourceCreate(ResourceBase):
    pass

class ResourceResponse(ResourceBase):
    id: int

    class Config:
        from_attributes = True