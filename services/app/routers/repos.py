import logging
import os

from fastapi import APIRouter

from app.routers.models import RepoResponse
from app.models.repos import Repos

logger = logging.getLogger("uvicorn.error")

router = APIRouter(
    prefix="/repos",
    tags=["repos"],
)


_BASE_REPO_PATH = os.getenv("REPO_PATH", "/src/gitui2/tests/repos")


@router.get("/")
async def read_repos() -> list[RepoResponse]:
    repos = Repos(repos_base_path=_BASE_REPO_PATH)
    return repos.read_repos()
