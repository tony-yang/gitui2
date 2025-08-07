import os

from app.models.repos import Repos


def test_read_repos():
    _BASE_REPO_PATH = os.getenv("REPO_PATH", "/src/gitui2/services/tests/repos")
    repos = Repos(repos_base_path=_BASE_REPO_PATH)
    repos = repos.read_repos()
    assert len(repos) == 2
    assert repos[0].name.lower() == "test1"
