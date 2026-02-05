from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from schemas.station import StationResponse

class SiteResponse(BaseModel):
    id:int
    name: str
    location: str
    station_count: int 
    # Stations is a list of all stations in a given site
    stations: List[StationResponse] = []

    class Config:
        from_attributes = True

