from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from datetime import datetime, timedelta
from models.userData import UserData
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from string import capwords
from schemas.site import SiteResponse
from dependencies import db_dependency, get_current_user, secret_key, algorithm

router = APIRouter(
    prefix="/post",
    tags=["Post"],
)

@router.post("/", status_code = status.HTTP_201_CREATED)
async def fetch_sites():
    pass
