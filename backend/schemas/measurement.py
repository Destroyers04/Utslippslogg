from pydantic import BaseModel
from datetime import datetime
from schemas.unit import UnitResponse
from schemas.station import StationResponse

class MeasurementBase(BaseModel):
    value: float
    time: datetime
    station_id: int
    unit_id: int  #foreign key to unit table
    is_automatic: bool = False
    sensor: str
    user_id: int

class CreateMeasurement(MeasurementBase):
    pass

class MeasurementResponse(MeasurementBase):
    id: int
    class Config:
        from_attributes = True

