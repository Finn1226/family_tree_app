from sqlalchemy import Column, Integer, ForeignKey
from app.database.db import Base

class ParentChild(Base):
    __tablename__ = "parent_child"

    id = Column(Integer, primary_key=True, index=True)
    parent_id = Column(Integer, ForeignKey("people.id"), nullable=False)
    child_id = Column(Integer, ForeignKey("people.id"), nullable=False)