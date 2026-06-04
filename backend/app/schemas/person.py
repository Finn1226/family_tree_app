from pydantic import BaseModel

class PersonCreate(BaseModel):
    full_name: str
    chinese_name: str | None = None

class PersonResponse(BaseModel):
    id: int
    full_name: str
    chinese_name: str | None = None

    class Config:
        from_attributes = True