import os

from app.models.repos import Repos
from app.routers.models import (
    DirectoryResponse,
    FileResponse,
    RepoResponse,
)


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
    assert repo.content is not None


def test_get_dir_content():
    _BASE_REPO_PATH = os.getenv("REPO_PATH", "/src/gitui2/services/tests/repos")
    repos = Repos(repos_base_path=_BASE_REPO_PATH)

    """
    The test2.git repo has the following structure:

    +-- testdir
    |   +-- subdir
    |   |   +-- sub_testfile
    |   +-- testfile
    |   +-- testfile2
    +-- README.md
    """
    repo_name = "test2.git"
    branch = "main"
    dir_names = "testdir/subdir"
    resp = repos.get_dir_content(
        repo_name=repo_name, branch=branch, dir_names=dir_names
    )
    assert isinstance(resp, DirectoryResponse)
    assert resp.repo_name == repo_name
    assert resp.content is not None
    assert resp.content.directories == []
    assert resp.content.files == ["sub_testfile"]


def test_get_dir_content_not_found():
    _BASE_REPO_PATH = os.getenv("REPO_PATH", "/src/gitui2/services/tests/repos")
    repos = Repos(repos_base_path=_BASE_REPO_PATH)

    """
    The test2.git repo has the following structure. If it doesn't exist, make a commit
    to make it look like this.

    +-- testdir
    |   +-- subdir
    |   |   +-- sub_testfile
    |   +-- testfile
    |   +-- testfile2
    +-- README.md
    """
    repo_name = "test2.git"
    branch = "main"
    dir_names = "not_exist"
    resp = repos.get_dir_content(
        repo_name=repo_name, branch=branch, dir_names=dir_names
    )
    assert isinstance(resp, DirectoryResponse)
    assert resp.repo_name == repo_name
    assert resp.content is None


def test_get_file_content():
    _BASE_REPO_PATH = os.getenv("REPO_PATH", "/src/gitui2/services/tests/repos")
    repos = Repos(repos_base_path=_BASE_REPO_PATH)

    """
    The test2.git repo has the following structure. If it doesn't exist, make a commit
    to make it look like this.

    +-- testdir
    |   +-- subdir
    |   |   +-- sub_testfile
    |   +-- testfile
    |   +-- testfile2
    +-- README.md
    """
    repo_name = "test2.git"
    branch = "main"
    file_name = "testdir/testfile2"
    resp = repos.get_file_content(
        repo_name=repo_name, branch=branch, file_name=file_name
    )
    assert isinstance(resp, FileResponse)
    assert resp.repo_name == repo_name
    assert resp.content is not None


def test_get_file_content_not_found():
    _BASE_REPO_PATH = os.getenv("REPO_PATH", "/src/gitui2/services/tests/repos")
    repos = Repos(repos_base_path=_BASE_REPO_PATH)

    """
    The test2.git repo has the following structure. If it doesn't exist, make a commit
    to make it look like this.

    +-- testdir
    |   +-- subdir
    |   |   +-- sub_testfile
    |   +-- testfile
    |   +-- testfile2
    +-- README.md
    """
    repo_name = "test2.git"
    branch = "main"
    file_name = "testdir/subdir/no_such_file"
    resp = repos.get_file_content(
        repo_name=repo_name, branch=branch, file_name=file_name
    )
    assert isinstance(resp, FileResponse)
    assert resp.repo_name == repo_name
    assert resp.content is None
