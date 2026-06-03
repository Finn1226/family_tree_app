from fastapi import FastAPI

from app.database.db import engine
from app.models.person import Person
from app.database.db import Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Family Tree API"}