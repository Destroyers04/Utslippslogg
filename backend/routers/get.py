from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from models.userData import UserSiteAccess
from models.site import Site, Station
from models.measurement import Unit, Measurement
from dependencies import db_dependency, get_current_user

router = APIRouter(
    prefix="/get",
    tags=["Get"],
)

# Get all sites the user has access to
@router.get("/site", status_code = status.HTTP_200_OK)
async def fetch_sites(db: db_dependency, user_info: Annotated[dict, Depends(get_current_user)]):
    # Get the user's id from the token
    user_id = user_info["id"]

    # Query the database for all sites the user has access to
    query = db.query(Site)    
    query = query.join(UserSiteAccess)
    sites = query.filter(UserSiteAccess.user_id == user_id).all()
    return sites

# Get all stations for a specific site, the user must have access to the site to access the stations
@router.get("/site/{site_id}/station", status_code = status.HTTP_200_OK)
async def fetch_stations(site_id: int, db: db_dependency, user_info: Annotated[dict, Depends(get_current_user)]):
    # Get the user's id from the token
    user_id = user_info["id"]

    # Check if the user has access to the site
    access = db.query(UserSiteAccess).filter(UserSiteAccess.user_id == user_id, UserSiteAccess.site_id == site_id).first()
    if not access:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You do not have access to this site")

    # If the user has access, return the stations for the site
    site = db.query(Site).filter(Site.site_id == site_id).first()
    if not site:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Site not found")
    
    return site.stations

#Get all measurements from a given station 
@router.get("/site/{site_id}/station/{station_id}/measurements", status_code = status.HTTP_200_OK)
async def fetch_station_measurements(site_id: int, station_id: int, db: db_dependency, user_info: Annotated[dict, Depends(get_current_user)]):
    # Get the user's id from the token
    user_id = user_info["id"]

    # Check if the user has access to the site
    access = db.query(UserSiteAccess).filter(UserSiteAccess.user_id == user_id, UserSiteAccess.site_id == site_id).first()
    if not access:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You do not have access to this site")

    # Find the station
    station = db.query(Station).filter(Station.station_id == station_id, Station.site_id == site_id).first()
    if not station:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="station not found")
    
    # Return the measurements for the station
    return station.measurements

@router.get("/site/{site_id}/measurements", status_code = status.HTTP_200_OK)
async def fetch_all_measurements(site_id: int, db: db_dependency, user_info: Annotated[dict, Depends(get_current_user)]):
    # Get the user's id from the token
    user_id = user_info["id"]

    # Find the site
    site = db.query(Site).filter(Site.site_id == site_id).first()
    if not site:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Site not found")
    
    # Check if the user has access to the site
    access = db.query(UserSiteAccess).filter(UserSiteAccess.user_id == user_id, UserSiteAccess.site_id == site_id).first()
    if not access:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You do not have access to this site")
    
    # Return all measurements for the site
    query = db.query(Measurement)
    query = query.join(Station)
    measurements = query.filter(Station.site_id == site_id).all()
    return measurements
    
#Get all units
@router.get("/units", status_code = status.HTTP_200_OK)
async def fetch_units(db: db_dependency):
    query = db.query(Unit).all()
    return query
