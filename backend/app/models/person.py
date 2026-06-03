from sqlalchemy import Column, Integer, String
from app.database.db import Base

class Person(Base):
    __tablename__ = "people"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    chinese_name = Column(String)