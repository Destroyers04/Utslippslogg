from pydantic import BaseModel
from datetime import datetime
from schemas.unit import UnitResponse
from schemas.station import StationResponse

# Every site has a name and location
class MeasurementResponse(BaseModel):
    value: float
    time: datetime
    station_id: int
    unit: str
    is_automatic: bool = False
    sensor: str
    user_id: int
    
    class Config:
        from_attributes = True

