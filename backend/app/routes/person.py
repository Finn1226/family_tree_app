from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import SessionLocal
from app.models.person import Person
from app.schemas.person import (
    PersonCreate,
    PersonUpdate,
    PersonResponse,
)


router = APIRouter(
    prefix="/people",
    tags=["people"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=PersonResponse)
def create_person(
    person: PersonCreate,
    db: Session = Depends(get_db),
):
    new_person = Person(
        full_name=person.full_name,
        chinese_name=person.chinese_name,
    )

    db.add(new_person)
    db.commit()
    db.refresh(new_person)

    return new_person


@router.get("/", response_model=list[PersonResponse])
def get_people(
    db: Session = Depends(get_db),
):
    return db.query(Person).all()


@router.get("/{person_id}", response_model=PersonResponse)
def get_person(
    person_id: int,
    db: Session = Depends(get_db),
):
    person = db.get(Person, person_id)

    if person is None:
        raise HTTPException(
            status_code=404,
            detail="Person not found",
        )

    return person


@router.patch("/{person_id}", response_model=PersonResponse)
def update_person(
    person_id: int,
    updates: PersonUpdate,
    db: Session = Depends(get_db),
):
    person = db.get(Person, person_id)

    if person is None:
        raise HTTPException(
            status_code=404,
            detail="Person not found",
        )

    update_data = updates.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(person, field, value)

    db.commit()
    db.refresh(person)

    return person


@router.delete("/{person_id}")
def delete_person(
    person_id: int,
    db: Session = Depends(get_db),
):
    person = db.get(Person, person_id)

    if person is None:
        raise HTTPException(
            status_code=404,
            detail="Person not found",
        )

    db.delete(person)
    db.commit()

    return {
        "message": "Person deleted"
    }