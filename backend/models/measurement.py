from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Float, DateTime
from sqlalchemy.orm import relationship
from database import Base

class Measurement(Base):
      __tablename__ = "measurement"

      measurement_id = Column(Integer, primary_key=True, index=True)
      value = Column(Float)
      time = Column(DateTime)
      station_id = Column(Integer, ForeignKey("station.station_id"))
      unit_id = Column(Integer, ForeignKey("unit.unit_id"))
      type = Column(String, default = "Automatic")
      stations = relationship("Station", back_populates="measurements")
      unit = relationship("Unit", back_populates="measurements")
      sensor_measurements = relationship("SensorMeasurement", back_populates="measurements")
      manual_measurement = relationship("ManualMeasurement", back_populates="measurements")

class Sensor(Base):
      __tablename__ = "sensor"

      sensor_id = Column(Integer, primary_key=True, index=True)
      model = Column(String)
      serial_number = Column(String)
      station_id = Column(Integer, ForeignKey("station.station_id"))
      stations = relationship("Station", back_populates="sensors")
      sensor_measurements = relationship("SensorMeasurement", back_populates="sensor")

class SensorMeasurement(Base):
      __tablename__ = "sensor_measurement"

      measurement_id = Column(Integer, ForeignKey("measurement.measurement_id"), primary_key=True)
      sensor_id = Column(Integer, ForeignKey("sensor.sensor_id"))
      measurements = relationship("Measurement", back_populates="sensor_measurements")
      sensor = relationship("Sensor", back_populates="sensor_measurements")

class ManualMeasurement(Base):
      __tablename__ = "manual_measurement"

      measurement_id = Column(Integer, ForeignKey("measurement.measurement_id"), primary_key=True)
      user_id = Column(Integer, ForeignKey("user_data.user_id"))
      measurements = relationship("Measurement", back_populates="manual_measurement")

class Unit(Base):
      __tablename__ = "unit"

      unit_id = Column(Integer, primary_key=True, index=True)
      unit = Column(String) #Kg/ ppm or other unit of measurement
      emission = Column(String) #CO2, NOx, etc.
      measurements = relationship("Measurement", back_populates="unit")

