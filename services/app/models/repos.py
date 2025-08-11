from dataclasses import dataclass
from datetime import datetime
import logging
import os

import pygit2
from pygit2 import Repository

from app.routers.models import RepoResponse

logger = logging.getLogger("uvicorn.error")


@dataclass
class Repos:
    """Class for keeping track of all Git Repos."""

    repos_base_path: str

    def read_repos(self) -> list[RepoResponse]:
        repo_dirs = [
            os.path.join(self.repos_base_path, d)
            for d in os.listdir(self.repos_base_path)
            if os.path.isdir(os.path.join(self.repos_base_path, d))
        ]
        git_repos = []
        for d in repo_dirs:
            logger.info("## Repo path: %s", d)
            repo_path = pygit2.discover_repository(d)
            logger.info("## Repo path: %s", repo_path)
            git_repos.append(Repository(repo_path))

        repos = []
        if git_repos:
            for r in git_repos:
                head = r[r.head.target]
                repo_name = r.path.rstrip("/").split("/")[-1]
                repo = RepoResponse(
                    name=repo_name,
                    url=r.path.strip(),
                    last_commit_message=head.message.strip(),
                    last_commit_time=datetime.fromtimestamp(head.commit_time),
                    last_commit_author=head.author.name.strip(),
                )
                logger.info(f"{repo=}")
                repos.append(repo)
        return repos

    def get_repo(self, name: str) -> RepoResponse:
        git_path = os.path.join(self.repos_base_path, name)
        logger.info("## Get repo at path: %s", git_path)
        repo_path = pygit2.discover_repository(git_path)
        logger.info("## Get repo at path: %s", repo_path)
        r = Repository(repo_path)
        if r:
            head = r[r.head.target]
            repo_name = r.path.rstrip("/").split("/")[-1]
            repo = RepoResponse(
                name=repo_name,
                url=r.path.strip(),
                last_commit_message=head.message.strip(),
                last_commit_time=datetime.fromtimestamp(head.commit_time),
                last_commit_author=head.author.name.strip(),
            )
            logger.info(f"{repo=}")
        return repo
