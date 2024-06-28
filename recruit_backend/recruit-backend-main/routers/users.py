from fastapi import APIRouter, Depends, HTTPException

from database.databaseConfig import SessionLocal
from service.UserService import get_users, get_user_by_email, get_user_by_username, create_user
from schema.userSchema import User, UserCreate
from sqlalchemy.orm import Session
from dependencies import get_db
from routers.authentification import login_for_access_token
from typing import Annotated, Union
from service.authentificationService import get_current_user

userRouter = APIRouter()


@userRouter.get("/users/", response_model=list[User])
async def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db),
                     pa: User = Depends(get_current_user)):
    users = get_users(db, skip=skip, limit=limit)
    return users


@userRouter.post("/users/", response_model=User)
def post_user(user: UserCreate, db: Session = Depends(get_db) ):
    db_user_email = get_user_by_email(db, email=user.email)
    db_user_username = get_user_by_username(db, user_name=user.userName)
    if db_user_email or db_user_username:
        raise HTTPException(status_code=400, detail="Email or username already registered")
    return create_user(db=db, user=user)
