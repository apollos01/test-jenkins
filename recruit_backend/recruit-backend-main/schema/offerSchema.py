from datetime import date

from pydantic import BaseModel


class CreateOffer(BaseModel):
    offreName: str
    Description: str
    dateOffre: date
    userId: int


class GetOffer(BaseModel):
    id: int
    offreName: str
    Description: str
