from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from datetime import datetime
from models.userData import UserData
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from string import capwords
from models.measurement import Measurement
from schemas.measurement import CreateMeasurement
from dependencies import db_dependency, get_current_user

router = APIRouter(
    prefix="/post",
    tags=["Post"],
)


@router.post("/", status_code = status.HTTP_201_CREATED)
async def add_measurement(db:db_dependency, create_measurement_request: CreateMeasurement, user_info: Annotated[dict, Depends(get_current_user)]):
    #Check if the user has the necessary privileges to add a measurement
    current_user_id = user_info["id"]
    if not check_admin_privileges(db, current_user_id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You do not have the necessary privileges to perform this action")
    
    #If the user has the correct privileges add a measurement
    create_measurement_model = Measurement(
        value=create_measurement_request.value,
        time = datetime.now(),
        station_id = create_measurement_request.station_id,
        unit_id = create_measurement_request.unit_id,
        sensor = None,
        user_id = current_user_id
    )

    db.add(create_measurement_model)
    db.commit()

def check_admin_privileges(db, user_id: int):
    user = db.query(UserData).filter(UserData.id == user_id).first()
    return user and user.role == "Admin"
