from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import SessionLocal
from app.models.person import Person
from app.models.parent_child import ParentChild
from app.schemas.parent_child import (
    ParentChildCreate,
    ParentChildResponse,
)


router = APIRouter(
    prefix="/parent-child",
    tags=["parent-child"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=ParentChildResponse)
def create_parent_child(
    link: ParentChildCreate,
    db: Session = Depends(get_db),
):
    if link.parent_id == link.child_id:
        raise HTTPException(
            status_code=400,
            detail="A person cannot be their own parent",
        )

    parent = db.get(Person, link.parent_id)
    child = db.get(Person, link.child_id)

    if parent is None:
        raise HTTPException(
            status_code=404,
            detail="Parent not found",
        )

    if child is None:
        raise HTTPException(
            status_code=404,
            detail="Child not found",
        )

    existing_link = (
        db.query(ParentChild)
        .filter(
            ParentChild.parent_id == link.parent_id,
            ParentChild.child_id == link.child_id,
        )
        .first()
    )

    if existing_link:
        raise HTTPException(
            status_code=409,
            detail="Relationship already exists",
        )

    new_link = ParentChild(
        parent_id=link.parent_id,
        child_id=link.child_id,
    )

    db.add(new_link)
    db.commit()
    db.refresh(new_link)

    return new_link


@router.get("/", response_model=list[ParentChildResponse])
def get_parent_child_links(
    db: Session = Depends(get_db),
):
    return db.query(ParentChild).all()


@router.delete("/{relationship_id}")
def delete_parent_child_link(
    relationship_id: int,
    db: Session = Depends(get_db),
):
    relationship = db.get(
        ParentChild,
        relationship_id,
    )

    if relationship is None:
        raise HTTPException(
            status_code=404,
            detail="Relationship not found",
        )

    db.delete(relationship)
    db.commit()

    return {
        "message": "Relationship deleted"
    }