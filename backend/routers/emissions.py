from ..models import site, measurement 
from ..schemas import measurement, site, station, unit 
from ..database import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

router = APIRouter()

# Fetch all site the user has access to
@router.get("/measurements/", response_model=measurement.Measurement)