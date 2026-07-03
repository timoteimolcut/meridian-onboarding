from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.resource import Resource
from app.schemas.resource import ResourceCreate, ResourceResponse

router = APIRouter(
    prefix="/resources",
    tags=["resources"]
)

@router.get("/", response_model=list[ResourceResponse])
def get_resources(db: Session = Depends(get_db)):
    resources = db.query(Resource).all()
    return resources

@router.get("/{resource_id}", response_model=ResourceResponse)
def get_resource(resource_id: int, db: Session = Depends(get_db)):
    resource = db.query(Resource).filter(Resource.id == resource_id).first()
    if resource is None:
        raise HTTPException(status_code=404, detail="Resource not found")
    return resource

@router.post("/", response_model=ResourceResponse)
def create_resource(resource: ResourceCreate, db: Session = Depends(get_db)):
    db_resource = Resource(**resource.model_dump())
    db.add(db_resource)
    db.commit()
    db.refresh(db_resource)
    return db_resource

@router.patch("/{resource_id}", response_model=ResourceResponse)
def update_resource(resource_id: int, resource: ResourceCreate, db: Session = Depends(get_db)):
    db_resource = db.query(Resource).filter(Resource.id == resource_id).first()
    if db_resource is None:
        raise HTTPException(status_code=404, detail="Resource not found")
    for key, value in resource.model_dump(exclude_unset=True).items():
        setattr(db_resource, key, value)
    db.commit()
    db.refresh(db_resource)
    return db_resource

@router.delete("/{resource_id}")
def delete_resource(resource_id: int, db: Session = Depends(get_db)):
    resource = db.query(Resource).filter(Resource.id == resource_id).first()
    if resource is None:
        raise HTTPException(status_code=404, detail="Resource not found")
    db.delete(resource)
    db.commit()
    return {"message": "Resource deleted successfully"}