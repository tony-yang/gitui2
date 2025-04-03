import logging

from fastapi import FastAPI

from app.routers import repos
import app.logging_config  # Import for logging config side effect


logger = logging.getLogger("uvicorn.error")
logger.info("GitUI2 Starting...")

app = FastAPI()
app.include_router(repos.router)


@app.get("/")
async def root():
    return {"hello": "world"}
