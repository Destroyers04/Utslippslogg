from typing import Union
from fastapi import FastAPI, HTTPException, Depends
from database import SessionLocal, engine, get_db
import models
import schemas 
from sqlalchemy.orm import Session

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}