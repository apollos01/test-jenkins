import string

from sqlalchemy.orm import Session

import model.models


def create_company(db: Session, companyname: string, companycode: string):
    db_company = model.models.Company(companyName=companyname, companyCode=companycode)
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company
