import os

from app.models.repos import Repos
from app.routers.models import RepoResponse


def test_read_repos():
    _BASE_REPO_PATH = os.getenv("REPO_PATH", "/src/gitui2/services/tests/repos")
    repos = Repos(repos_base_path=_BASE_REPO_PATH)
    repos = repos.read_repos()
    assert len(repos) == 2
    assert repos[0].name.lower() == "test1"


def test_get_repo():
    _BASE_REPO_PATH = os.getenv("REPO_PATH", "/src/gitui2/services/tests/repos")
    repos = Repos(repos_base_path=_BASE_REPO_PATH)

    repo_name = "test1"
    repo = repos.get_repo(name=repo_name)
    assert isinstance(repo, RepoResponse)
