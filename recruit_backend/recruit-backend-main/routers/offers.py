from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder

from database.databaseConfig import SessionLocal
from model.models import Offre
from service.UserService import get_users, get_user_by_email, get_user_by_username, create_user
from schema.offerSchema import CreateOffer, GetOffer
from sqlalchemy.orm import Session
from dependencies import get_db
from routers.authentification import login_for_access_token
from typing import Annotated, Union
from service.offersService import create_offer, get_offer

offreRouter = APIRouter()


@offreRouter.post("/offers/", response_model=CreateOffer)
def post_user(offre: CreateOffer, db: Session = Depends(get_db)):
    return create_offer(db=db, offre=offre)


@offreRouter.get("/get_offers/", response_model=list[GetOffer])
async def read_offer(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    offer = get_offer(db, skip=skip, limit=limit)
    return offer

