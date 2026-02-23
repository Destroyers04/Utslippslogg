from pydantic import BaseModel
from datetime import datetime

# Schemas for measurements
class MeasurementBase(BaseModel):
    value: float
    unit_id: int  #foreign key to unit table

class CreateMeasurement(MeasurementBase):
    pass

class MeasurementResponse(MeasurementBase):
    measurement_id: int 
    type: str 
    time: datetime
    station_id: int #foreign key to station table
    class Config:
        from_attributes = True

# Schemas for measurement types
class MeasurementTypeBase(BaseModel):
    measurement_id: int

class SensorMeasurementResponse(MeasurementTypeBase):
    sensor_id: int #foreign key to sensor table
    class Config:
        from_attributes = True

class CreateManualMeasurement(MeasurementTypeBase):
    user_id: int #foreign key to user table
class ManualMeasurementResponse(MeasurementTypeBase):
    user_id: int #foreign key to user table
    class Config:
        from_attributes = True

# Schemas for sensors
class SensorBase(BaseModel):
    model: str
    serial_number: str
    station_id: int #foreign key to station table

class CreateSensor(SensorBase):
    pass

class SensorResponse(SensorBase):
    sensor_id: int
    class Config:
        from_attributes = True


