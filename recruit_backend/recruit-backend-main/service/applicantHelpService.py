from typing import List, Dict

from sqlalchemy.orm import Session

import model.models
import schema.applicantHelpSchema
import schema.userSchema
from schema.applicantHelpSchema import CreateApplicantHelp
import service.UserService


def apply_offer(db: Session, applicanthelp: CreateApplicantHelp):
    db_apllicanthelp = model.models.ApplicantHelp(idApplicant=applicanthelp.idApplicant, idOffre=applicanthelp.idOffre,
                                                  Status=model.models.EnumStatus.encours)
    db.add(db_apllicanthelp)
    db.commit()
    db.refresh(db_apllicanthelp)
    return db_apllicanthelp


def get_offer(db: Session, offer_id: int):
    return db.query(model.models.Offre).filter(model.models.Offre.id == offer_id).first()


def get_offers(db: Session, skip: int = 0, limit: int = 100):
    list_offers = db.query(model.models.Offre).offset(skip).limit(limit).all()
    offers: list[schema.applicantHelpSchema.Offer_for_list] = []
    for offer in list_offers:
        offers.append(schema.applicantHelpSchema.Offer_for_list(idOffre=offer.id))
    return offers


def get_id_users_by_offer_id(db: Session, offer_id: int):
    return db.query(model.models.Offre).filter(model.models.Offre.id == offer_id).first()


def get_applicant_id_by_offer_id(db: Session, offre_id: int):
    applicantHelp: model.models.ApplicantHelp = (db.query(model.models.ApplicantHelp)
                                                 .filter(model.models.ApplicantHelp.idOffre == offre_id))
    return applicantHelp


def get_applicants_by_offer_id(db: Session, offre_id: int):
    applicantsHelp: list[model.models.ApplicantHelp] = get_applicant_id_by_offer_id(db, offre_id)
    applicants: list[schema.userSchema.ApplicantOffers] = []
    for applicant in applicantsHelp:
        user = service.UserService.get_user(db, applicant.idApplicant)
        applicants.append(schema.userSchema.ApplicantOffers(id=user.id, userName=user.userName, email=user.email,
                                                            status=applicant.Status.name))
    return applicants
