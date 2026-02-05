from typing import Optional, Union, List, Annotated
from datetime import datetime
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, Depends

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}