import logging
import os

from fastapi import APIRouter

from app.routers.models import (
    DirectoryResponse,
    FileResponse,
    RepoResponse,
)
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


@router.get("/{repo_name}")
async def get_repo(repo_name: str) -> DirectoryResponse:
    repos = Repos(repos_base_path=_BASE_REPO_PATH)
    return repos.get_repo(name=repo_name)


@router.get("/{repo_name}/tree/{branch}/{dir_names:path}")
async def get_dir_content(
    repo_name: str, branch: str, dir_names: str
) -> DirectoryResponse:
    repos = Repos(repos_base_path=_BASE_REPO_PATH)
    return repos.get_dir_content(
        repo_name=repo_name, branch=branch, dir_names=dir_names
    )


@router.get("/{repo_name}/blob/{branch}/{file_name:path}")
async def get_file_content(repo_name: str, branch: str, file_name: str) -> FileResponse:
    repos = Repos(repos_base_path=_BASE_REPO_PATH)
    return repos.get_file_content(
        repo_name=repo_name, branch=branch, file_name=file_name
    )
