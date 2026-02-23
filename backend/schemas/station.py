from pydantic import BaseModel
# Every site has a name and location
class StationBase(BaseModel):
    name: str
    location_description: str 

class CreateStation(StationBase):
    site_id: int #foreign key to site table

class StationResponse(StationBase):
    station_id: int #foreign key to station table
    site_id:int #foreign key to site table

    class Config:
        from_attributes = True