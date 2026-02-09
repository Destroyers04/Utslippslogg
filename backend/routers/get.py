from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from models.userData import UserSiteAccess
from models.site import Site
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
    query = query.join(UserSiteAccess, UserSiteAccess.site_id == Site.id)
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
    site = db.query(Site).filter(Site.id == site_id).first()
    if not site:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Site not found")
    
    return site.stations

@router.get("/site/{site_id}/station/{station_id}/measurement", status_code = status.HTTP_200_OK)
async def fetch_measurements(site_id: int, station_id: int, db: db_dependency, user_info: Annotated[dict, Depends(get_current_user)]):
    # Get the user's id from the token
    user_id = user_info["id"]

    # Check if the user has access to the site
    access = db.query(UserSiteAccess).filter(UserSiteAccess.user_id == user_id, UserSiteAccess.site_id == site_id).first()
    if not access:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You do not have access to this site")

    # If the user has access, return the measurements for the station
    site = db.query(Site).filter(Site.id == site_id).first()
    if not site:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Site not found")
    
    station = next((s for s in site.stations if s.id == station_id), None)
    if not station:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Station not found")
    
    return station.measurements