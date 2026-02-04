from typing import Optional, Union, List, Annotated
from datetime import datetime
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, Depends

app = FastAPI()

class Site(BaseModel):
    id: int
    name: str
    location: str
    measurement_stations: List[MeasurementStation] = []

class MeasurementStation(BaseModel):
    id: int
    site_id: int #Foreign Key to Site
    station_name: str
    last_calibrated: datetime
    active: bool
    sensor: str
    measurements: List[Measurement] = []

class Measurement(BaseModel):
    id: int
    station_id: int #Foreign Key to MeasurementStation
    timestamp: datetime
    is_manual: bool
    user_id: Optional[int] = None # Optional only needed if its a manual logging
    measurement_values: List[MeasurementValue] = []

class MeasurementValue(BaseModel):
    id: int
    measurement_id: int
    metric_type_id: int
    value: float
    metric_type: MetricType 

class MetricType(BaseModel):
    id: int
    name: str # e.g., Temperature, Humidity
    unit: str # e.g., Celsius, Percentage
    valid_range_max: float # e.g., "50", "100"
    valid_range_min: float # e.g., "-50", "100"

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}