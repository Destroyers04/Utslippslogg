from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from schemas.station import StationResponse

class SiteResponse(BaseModel):
    site_id: int
    name: str
    location: str
    station_count: int 
    stations: List[StationResponse] = [] # Stations is a list of all stations in a given site

    class Config:
        from_attributes = True

