from typing import Union

from pydantic import BaseModel


class User(BaseModel):
    id: int
    userName: str
    email: str


class UserCreate(BaseModel):
    userName: str
    email: str
    password: str
    companyName: str
    companyCode: str

    #TODO attribute for admin company => (attribute for company)
    #TODO FOR LATER attribute for applicant => cv
    role: str


class ApplicantOffers(BaseModel):
    id: int
    userName: str
    email: str
    status: str