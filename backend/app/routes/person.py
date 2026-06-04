from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import SessionLocal
from app.models.person import Person
from app.schemas.person import PersonCreate, PersonResponse

router = APIRouter(prefix="/people", tags=["people"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=PersonResponse)
def create_person(person: PersonCreate, db: Session = Depends(get_db)):
    new_person = Person(
        full_name = person.full_name,
        chinese_name = person.chinese_name,
    )

    db.add(new_person)
    db.commit()
    db.refresh(new_person)
    return new_person

@router.get("/", response_model=list[PersonResponse])
def get_people(db: Session = Depends(get_db)):
    return db.query(Person).all()
