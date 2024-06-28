import enum

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
import enum
from sqlalchemy.orm import relationship
from sqlalchemy import Enum
from database.databaseConfig import Base


class UserRole(enum.Enum):
    companyAdmin = "admin the company"
    applicant = "applicant"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    userName = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    user_type = Column(String(32))
    role = Column(Enum(UserRole))
    __mapper_args__ = {'polymorphic_on': user_type}
