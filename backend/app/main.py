from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import engine, Base
from app.models.person import Person
from app.routes.person import router as person_router
from app.models.relationship import Relationship
from app.routes.relationship import router as relationship_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(person_router)
app.include_router(relationship_router)

@app.get("/")
def root():
    return {"message": "Family Tree API"}