from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class UserData(Base):
    __tablename__ = "user_data"

    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class UserSiteAccess(Base):
    __tablename__ = "user_site_access"
    user_id = Column(Integer, ForeignKey("user_data.user_id"), primary_key=True)
    site_id = Column(Integer, ForeignKey("site.site_id"), primary_key=True)
    role = Column(String) 
