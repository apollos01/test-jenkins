from http.client import HTTPException

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

import schema.userSchema
import service.applicantHelpService
from schema.userSchema import User
import model
from dependencies import get_db
from model.models import Applicant, ApplicantHelp
from schema.userSchema import ApplicantOffers
from schema.applicantHelpSchema import CreateApplicantHelp, Offer_for_list, offer_by_id
from service.applicantHelpService import apply_offer, get_offers

applicantHelpRouter = APIRouter()


@applicantHelpRouter.post("/applicantHelp/", response_model=CreateApplicantHelp)
def post_apply_offer(applicanthelp: CreateApplicantHelp, db: Session = Depends(get_db)):
    return apply_offer(db=db, applicanthelp=applicanthelp)


@applicantHelpRouter.get("/applicantHelp_offers/", response_model=list[Offer_for_list])
async def read_offers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    offers = get_offers(db=db, skip=skip, limit=limit)
    return offers


@applicantHelpRouter.get("/offers/id", response_model=list[ApplicantOffers])
def get_applicants_by_offer(id_offer: int, db: Session = Depends(get_db)):
    return service.applicantHelpService.get_applicants_by_offer_id(db, id_offer)
