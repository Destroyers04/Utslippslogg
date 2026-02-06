from pydantic import BaseModel

class UserDataBase(BaseModel):
    name: str
    email: str

class CreateUser(UserDataBase):
    password: str

class UserDataResponse(UserDataBase):
    id: int

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
