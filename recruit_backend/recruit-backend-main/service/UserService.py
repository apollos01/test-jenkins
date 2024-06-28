from passlib.context import CryptContext
from sqlalchemy import null
from sqlalchemy.orm import Session

from model.user import User
from schema.userSchema import UserCreate
from model.user import UserRole
import service.companyService
import model.models


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_username(db: Session, user_name: str):
    return db.query(User).filter(User.userName == user_name).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserCreate):
    db_company = null
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    if user.role == str(UserRole.applicant.name):
        db_user = model.models.Applicant(email=user.email, userName=user.userName,
                                         password=get_password_hash(user.password, pwd_context), role=user.role)
    elif user.role == str(UserRole.companyAdmin.name):
        db_company = service.companyService.create_company(db, companyname=user.companyName, companycode=user.companyCode)
        if db_company != null:
            db_user = model.models.AdminCompany(email=user.email, userName=user.userName,
                                                password=get_password_hash(user.password, pwd_context),
                                                role=user.role, idCompany=db_company.id)
        else:
            raise Exception('error creating company')

    else:
        raise Exception('the specified role not found')
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_password_hash(password, pwd_context):
    return pwd_context.hash(password)
