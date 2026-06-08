from pydantic import BaseModel

class RelationshipCreate(BaseModel):
    from_person_id: int
    to_person_id: int
    relationship_type: str

class RelationshipResponse(BaseModel):
    id: int
    from_person_id: int
    to_person_id: int
    relationship_type: str

    class Config:
        from_attributes = True