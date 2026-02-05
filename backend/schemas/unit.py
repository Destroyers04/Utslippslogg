from pydantic import BaseModel

class UnitResponse(BaseModel):
    id: int
    name: str #Kilogram or Parts per million
    unit: str #Kg/ ppm or 

    class Config:
        from_attributes = True