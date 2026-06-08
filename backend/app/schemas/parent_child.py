from pydantic import BaseModel

class ParentChildCreate(BaseModel):
    parent_id: int
    child_id: int

class ParentChildResponse(BaseModel):
    id: int
    parent_id: int
    child_id: int

    class Config:
        from_attributes = True