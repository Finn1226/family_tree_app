from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.db import Base

"""
from_person_id = parent
to_person_id = child
relationship_type = "parent"
"""
class Relationship(Base):
    __tablename__ = "relationships"

    id = Column(Integer, primary_key=True, index=True)

    from_person_id = Column(Integer, ForeignKey("people.id"), nullable=False)
    to_person_id = Column(Integer, ForeignKey("people.id"), nullable=False)

    relationship_type = Column(String, nullable=False)