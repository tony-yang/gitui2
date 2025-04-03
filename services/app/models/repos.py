from dataclasses import dataclass
from datetime import datetime
import logging
import os

from pydantic import BaseModel
import pygit2
from pygit2 import Repository


logger = logging.getLogger("uvicorn.error")


class Repo(BaseModel):
    """Class for a single Git Repo."""

    name: str
    url: str
    description: str | None = None
    last_commit_message: str | None = None
    last_commit_time: datetime | None = None
    last_commit_author: str | None = None


@dataclass
class Repos:
    """Class for keeping track of all Git Repos."""

    repos_base_path: str

    def read_repos(self) -> list[Repo]:
        repo_dirs = [
            os.path.join(self.repos_base_path, d)
            for d in os.listdir(self.repos_base_path)
            if os.path.isdir(os.path.join(self.repos_base_path, d))
        ]
        git_repos = []
        for d in repo_dirs:
            repo_path = pygit2.discover_repository(d)
            git_repos.append(Repository(repo_path))

        repos = []
        if git_repos:
            for r in git_repos:
                head = r[r.head.target]
                repo_name = r.path.rstrip("/").split("/")[-1]
                repo = Repo(
                    name=repo_name,
                    url=r.path.strip(),
                    last_commit_message=head.message.strip(),
                    last_commit_time=datetime.fromtimestamp(head.commit_time),
                    last_commit_author=head.author.name.strip(),
                )
                logger.info(f"{repo=}")
                repos.append(repo)
        return repos
