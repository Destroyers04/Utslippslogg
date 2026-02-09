from fastapi import FastAPI, HTTPException, status
from database import engine
from models import site, measurement, userData
from routers import user, get
from dependencies import db_dependency, user_dependency

app = FastAPI()

app.include_router(user.router)
app.include_router(get.router)
site.Base.metadata.create_all(bind=engine)
measurement.Base.metadata.create_all(bind=engine)
userData.Base.metadata.create_all(bind=engine)

@app.get("/", status_code=status.HTTP_200_OK)
async def user(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    return user
