from sqlalchemy import null
from sqlalchemy.orm import Session

import model
from model import user
from model.models import Offre, OffreStatus
from model.user import UserRole, User
from model.models import AdminCompany
from schema.offerSchema import CreateOffer
from schema.userSchema import UserCreate
import service.UserService


def get_offer_id(db: Session, offre_id: int):
    return db.query(Offre).filter(Offre.id == offre_id).first()


def get_offers_by_company(db: Session, company_id: int):
    return db.query(Offre).filter(Offre.Company_id == company_id).first()


def create_offer(db: Session, offre: CreateOffer):
    db_user = null
    if offre.userId == null:
        raise Exception('user id must not be null')

    db_user = service.UserService.get_user(db, offre.userId)

    if db_user.role == UserRole.applicant:
        raise Exception("role doesn't have authorization")

    admin_company: AdminCompany = db_user
    db_offre = model.models.Offre(offreName=offre.offreName, Description=offre.Description,
                                  dateOffre=offre.dateOffre,
                                  offreStatus=OffreStatus.open, idCompany=admin_company.idCompany)
    db.add(db_offre)
    db.commit()
    db.refresh(db_offre)
    offer = CreateOffer(offreName=db_offre.offreName, Description=db_offre.Description,
                        dateOffre=db_offre.dateOffre, userId=admin_company.id)
    return offer


def get_offer(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Offre).offset(skip).limit(limit).all()



#def get_offer_by_userid(db: Session, user_id: int):
# return db.query(offer).filter(User.id == user_id).first()


#def get_offer_by_user(db: Session, iduser: int):
    #if iduser in users_offers:
    #   return {"iduser": iduser, "idoffer": users_offers[iduser]["idoffer"]}
    # else:
#  raise HTTPException(status_code=404, detail="User not found")
