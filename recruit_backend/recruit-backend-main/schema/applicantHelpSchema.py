from pydantic import BaseModel


class CreateApplicantHelp(BaseModel):
    idApplicant: int
    idOffre: int
    status: str


class Offer_for_list(BaseModel):
    idOffre: int


class offer_by_id(BaseModel):
    idApplicant: int
