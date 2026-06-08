from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import SessionLocal
from app.models.relationship import Relationship
from app.schemas.relationship import RelationshipCreate, RelationshipResponse

router = APIRouter(prefix="/relationships", tags=["relationships"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=RelationshipResponse)
def create_relationship(
    relationship: RelationshipCreate,
    db: Session = Depends(get_db)
):
    new_relationship = Relationship(
        from_person_id = relationship.from_person_id,
        to_person_id = relationship.to_person_id,
        relationship_type = relationship.relationship_type
    )

    db.add(new_relationship)
    db.commit()
    db.refresh(new_relationship)

    return new_relationship

@router.get("/", response_model=list[RelationshipResponse])
def get_relationships(db: Session = Depends(get_db)):
     return db.query(Relationship).all()