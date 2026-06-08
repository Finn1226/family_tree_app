from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import SessionLocal
from app.models.parent_child import ParentChild
from app.schemas.parent_child import ParentChildCreate, ParentChildResponse

router = APIRouter(prefix="/parent-child", tags=["parent-child"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=ParentChildResponse)
def create_parent_child(link: ParentChildCreate, db: Session = Depends(get_db)):
    new_link = ParentChild(
        parent_id=link.parent_id,
        child_id=link.child_id,
    )

    db.add(new_link)
    db.commit()
    db.refresh(new_link)

    return new_link

@router.get("/", response_model=list[ParentChildResponse])
def get_parent_child_links(db: Session = Depends(get_db)):
    return db.query(ParentChild).all()