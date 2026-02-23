from pydantic import BaseModel
from typing import List
from schemas.station import StationResponse

class SiteResponse(BaseModel):
    site_id: int
    name: str
    location: str
    station_count: int 
    stations: List[StationResponse] = [] # Stations is a list of all stations in a given site

    class Config:
        from_attributes = True

