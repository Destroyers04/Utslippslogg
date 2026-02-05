from pydantic import BaseModel

class UserDataBase(BaseModel):
    username: str
    email: str

class UserDataCreate(UserDataBase):
    password: str

class UserDataResponse(UserDataBase):
    id: int

    class Config:
        from_attributes = True

