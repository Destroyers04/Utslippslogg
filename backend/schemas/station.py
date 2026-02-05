from pydantic import BaseModel
from typing import Optional
# Every site has a name and location
class StationBase(BaseModel):
    name: str
    location_description: str # Where the station is located on the premises

class CreateStation(StationBase):
    site_id: int

class StationResponse(StationBase):
    id: int
    site_id:int

    class Config:
        from_attributes = True