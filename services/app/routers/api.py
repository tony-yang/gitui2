from fastapi import APIRouter

from app.routers import repos

router = APIRouter(prefix="/api/v1")
router.include_router(repos.router)
