from pydantic import BaseModel

class UnitBase(BaseModel):
    unit: str #Kg or ppm f.ex
    emission: str #CO2, NOx, etc.
class CreateUnit(UnitBase):
    pass
class UnitResponse(UnitBase):
    unit_id: int
    class Config:
        from_attributes = True
