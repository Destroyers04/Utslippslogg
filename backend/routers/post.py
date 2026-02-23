from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from datetime import datetime
from models.userData import UserSiteAccess
from models.measurement import Measurement, ManualMeasurement
from schemas.measurement import CreateMeasurement
from dependencies import db_dependency, get_current_user

router = APIRouter(
    prefix="/post",
    tags=["Post"],
)


@router.post("/site/{site_id}/station/{station_id}/measurement", status_code = status.HTTP_201_CREATED)
async def add_station_measurement(site_id: int, station_id: int, db:db_dependency, create_measurement_request: CreateMeasurement, user_info: Annotated[dict, Depends(get_current_user)]):
    #Check if the user has the necessary privileges to add a measurement
    current_user_id = user_info["id"]

    if not check_admin_privileges(db, current_user_id, site_id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You do not have the necessary privileges to perform this action")
    
    #If the user has the correct privileges add a measurement
    create_measurement_model = Measurement(
        value=create_measurement_request.value,
        time = datetime.now(),
        station_id = station_id,
        unit_id = create_measurement_request.unit_id,
        type = "Manual"
    )
    
    db.add(create_measurement_model)
    db.commit()
    db.refresh(create_measurement_model)
    #Add an entry to the ManualMeasurement table to link the measurement to the user who added it
    create_manual_measurement_model = ManualMeasurement(
        measurement_id = create_measurement_model.measurement_id,
        user_id = current_user_id
    )

    db.add(create_manual_measurement_model)
    db.commit()

def check_admin_privileges(db, user_id: int, site_id: int):
    user = db.query(UserSiteAccess).filter(UserSiteAccess.user_id == user_id, UserSiteAccess.site_id == site_id).first()
    return user and user.role == "Admin"
