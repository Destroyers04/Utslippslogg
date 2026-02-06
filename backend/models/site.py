from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Site(Base):
      __tablename__ = "site"

      id = Column(Integer, primary_key=True, index=True)
      name = Column(String, index=True)
      location = Column(String)
      stations = relationship("Station", back_populates="site")

      @property
      def station_count(self):
          return len(self.stations)
      
class Station(Base):
      __tablename__ = "station"

      id = Column(Integer, primary_key=True, index=True)
      name = Column(String, index=True)
      location_description = Column(String)
      site_id = Column(Integer, ForeignKey("site.id"))
      site = relationship("Site", back_populates="stations")
      measurements = relationship("Measurement", back_populates="station")

