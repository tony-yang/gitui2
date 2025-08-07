import logging

from fastapi import FastAPI

from app.routers import api
import app.logging_config  # Import for logging config side effect


logger = logging.getLogger("uvicorn.error")
logger.info("GitUI2 Starting...")

app = FastAPI()
app.include_router(api.router)


@app.get("/")
async def root():
    return {"hello": "world"}
