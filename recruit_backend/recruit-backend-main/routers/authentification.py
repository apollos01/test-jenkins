from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime, timedelta, timezone
from typing import Annotated, Union
from sqlalchemy.orm import Session
from dependencies import get_db
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from model.user import UserRole
from schema.Token import Token
from jose import JWTError, jwt
from passlib.context import CryptContext

from service.authentificationService import authenticate_user, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES

TokenRouter = APIRouter()


@TokenRouter.post("/token")
async def login_for_access_token(
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)
) -> Token:
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.userName, "email": user.email, "userId": user.id, "userRole": user.role.name},
        expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")
