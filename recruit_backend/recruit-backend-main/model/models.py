from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date
from typing import List
from database.databaseConfig import Base
import enum
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy import Enum
from model.user import User


class EnumStatus(enum.Enum):
    encours = "en cours"
    accepter = "applicant est accepter"
    rejete = "applicant est rejete"


class OffreStatus(enum.Enum):
    open = "offre open"
    closed = "offre closed"


class Company(Base):
    __tablename__ = "Company"

    id = Column(Integer, primary_key=True, autoincrement=True)
    companyName = Column(String, nullable=False)
    companyCode = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    offre: Mapped[List["Offre"]] = relationship(back_populates="company")
    admin: Mapped[List["AdminCompany"]] = relationship(back_populates="company")


class Offre(Base):
    __tablename__ = "Offre"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    offreName = mapped_column(String, nullable=False)
    Description = mapped_column(String, unique=True, index=True)
    dateOffre = mapped_column(Date, unique=True, index=True)
    offreStatus: Mapped[Enum[OffreStatus]] = mapped_column(Enum(OffreStatus))
    applicant: Mapped[List["ApplicantHelp"]] = relationship(back_populates="offre")
    idCompany: Mapped[int] = mapped_column(ForeignKey(Company.id))
    company: Mapped["Company"] = relationship(back_populates="offre")


class Applicant(User):
    __tablename__ = "applicants"
    __mapper_args__ = {'polymorphic_identity': 'Applicant'}
    id = Column(Integer, ForeignKey(User.id), primary_key=True, autoincrement=True)
    offre: Mapped[List["ApplicantHelp"]] = relationship(back_populates="applicant")


class ApplicantHelp(Base):
    __tablename__ = "applicantHelp"

    idApplicant: Mapped[int] = mapped_column(ForeignKey(Applicant.id), primary_key=True)
    idOffre: Mapped[int] = mapped_column(ForeignKey(Offre.id), primary_key=True)
    Status: Mapped[Enum[EnumStatus]] = mapped_column(Enum(EnumStatus))
    applicant: Mapped[Applicant] = relationship(back_populates="offre")
    offre: Mapped[Offre] = relationship(back_populates="applicant")


class AdminCompany(User):
    __tablename__ = "admincompanys"
    id = Column(Integer, ForeignKey(User.id), primary_key=True, autoincrement=True)
    idCompany: Mapped[int] = mapped_column(ForeignKey(Company.id))
    company: Mapped[Company] = relationship(back_populates="admin")
    __mapper_args__ = {'polymorphic_identity': 'AdminCompany'}
