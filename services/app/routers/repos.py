import logging

from fastapi import APIRouter

from app.models.repos import Repo
from app.models.repos import Repos

logger = logging.getLogger("uvicorn.error")

router = APIRouter(
    prefix="/repos",
    tags=["repos"],
)


_BASE_REPO_PATH = "/src/gitui2/tests/repos"


@router.get("/")
async def read_repos() -> list[Repo]:
    repos = Repos(repos_base_path=_BASE_REPO_PATH)
    return repos.read_repos()
