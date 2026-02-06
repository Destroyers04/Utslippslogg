from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Float, DateTime
from sqlalchemy.orm import relationship
from database import Base

class Measurement(Base):
      __tablename__ = "measurement"

      id = Column(Integer, primary_key=True, index=True)
      value = Column(Float)
      time = Column(DateTime)
      sensor = Column(String)
      is_automatic = Column(Boolean, default=False)
      station_id = Column(Integer, ForeignKey("station.id"))
      unit_id = Column(Integer, ForeignKey("unit.id"))
      user_id = Column(Integer, ForeignKey("user_data.id"))
      station = relationship("Station", back_populates="measurements")

class Unit(Base):
      __tablename__ = "unit"

      id = Column(Integer, primary_key=True, index=True)
      name = Column(String, index=True) #Kilogram or Parts per million
      unit = Column(String) #Kg/ ppm or other unit of measurement