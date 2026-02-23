from pydantic import BaseModel

class UserDataBase(BaseModel):
    name: str
    email: str

class CreateUser(UserDataBase):
    password: str # Hashed password will be stored in the database, but we need the plain password to create the hash

class UserDataResponse(UserDataBase):
    user_id: int

    class Config:
        from_attributes = True
        
class Token(BaseModel):
    access_token: str
    token_type: str
