from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from datetime import datetime, timedelta
from models.userData import UserData
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from string import capwords
from schemas.userData import CreateUser, Token
from dependencies import db_dependency, secret_key, algorithm

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)

#Create a new user
@router.post("/", status_code = status.HTTP_201_CREATED)
async def create_user(db: db_dependency, create_user_request: CreateUser):
    # Name and email are converted to lowercase to ensure case-insensitive matching
    create_user_model = UserData(
        name=capwords(create_user_request.name),
        email=create_user_request.email.lower(),
        hashed_password=bcrypt_context.hash(create_user_request.password),
        role="Viewer", # Default role, can be changed later by an admin
    )
    db.add(create_user_model)
    db.commit()

#Login and access token generation for the user, the token contains the users name, id and role and is valid for 30 minutes
@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail
            ="Incorrect email or password"
        )
    token = create_access_token(user.name, user.id, user.role, timedelta(minutes=30))
    return {"access_token": token, "token_type": "bearer"}

def authenticate_user(db, email: str, password: str):
    # Find the users email in the database and verify the password
    # The email is converted to lowercase to ensure case-insensitive matching
    email = email.lower()
    user = db.query(UserData).filter(UserData.email == email).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.hashed_password):
        return False
    return user

def create_access_token(name: str, user_id: int, role: str, expires_delta: timedelta):
     encode = {"sub": name, "id": user_id, "role": role}
     # Log out the user after 30 minutes, can be changed by changing the expires_delta parameter
     expires = datetime.now() + expires_delta
     encode.update({"exp": expires})
     return jwt.encode(encode, secret_key, algorithm=algorithm)
