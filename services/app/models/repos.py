from dataclasses import dataclass
from datetime import datetime
import logging
import os

import pygit2
from pygit2 import Repository
from pygit2.enums import ObjectType

from app.routers.models import (
    DirectoryContent,
    DirectoryResponse,
    FileResponse,
    RepoResponse,
)

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
                repos.append(repo)
        return repos

    def _walk_repo_current_layer(
        self, repo: Repository, branch: str, tree: pygit2.Object
    ) -> DirectoryContent:
        """Iteratively walk the trees until it reaches the leaf node, return the directory content

        Each tree represents a directory stored in Git. The list of trees are the path
        from the root directory to the leaf directory. We look for the existence of a
        directory, and continue down the subtree if a directory is found in the current tree.
        """
        if tree.type != ObjectType.TREE:
            return DirectoryContent()

        resp = DirectoryContent()
        resp.directories = list()
        resp.files = list()
        for entry in tree:
            filename = entry.name
            if entry.filemode == pygit2.GIT_FILEMODE_TREE:
                resp.directories.append(filename)
            else:
                resp.files.append(filename)
        return resp

    def _get_repo(self, name: str) -> Repository:
        git_path = os.path.join(self.repos_base_path, name)
        logger.info("## Get repo at path: %s", git_path)
        repo_path = pygit2.discover_repository(git_path)
        return Repository(repo_path)

    def get_repo(self, name: str) -> DirectoryResponse:
        branch = "main"

        r = self._get_repo(name)
        if not r:
            return DirectoryResponse()

        head = r[r.head.target]
        repo_name = r.path.rstrip("/").split("/")[-1]
        root = r.revparse_single(branch).tree
        content = self._walk_repo_current_layer(repo=r, branch=branch, tree=root)
        repo = DirectoryResponse(
            repo_name=repo_name,
            repo_url=r.path.strip(),
            last_commit_message=head.message.strip(),
            last_commit_time=datetime.fromtimestamp(head.commit_time),
            last_commit_author=head.author.name.strip(),
            content=content,
        )
        return repo

    def _find_directory_oid(
        self, repo: Repository, branch: str, dir_names: str
    ) -> str | None:
        oid = None

        root = repo.revparse_single(branch).tree
        # We are not using os.path.split but text split because we are
        # trying to identify every directory, not just the head and tail.
        directories = [d for d in dir_names.rstrip("/").split("/")]
        if len(directories) < 1:
            return

        visited = [root]
        while len(visited) > 0 and len(directories) > 0:
            tree = visited.pop()
            for entry in tree:
                if entry.filemode == pygit2.GIT_FILEMODE_TREE:
                    # In Git repo, directory is case insensitive.
                    if entry.name.lower() == directories[0].lower():
                        visited.append(entry)
                        directories.pop(0)
                        if not directories:
                            oid = entry.id
                        break
        return oid

    def get_dir_content(
        self, repo_name: str, branch: str, dir_names: str
    ) -> DirectoryResponse:
        logger.info(
            "## Get dir content name %s branch %s dir %s", repo_name, branch, dir_names
        )
        r = self._get_repo(repo_name)
        if not r:
            return DirectoryResponse()

        resp = DirectoryResponse(
            repo_name=repo_name,
            repo_url=r.path.strip(),
        )

        oid = self._find_directory_oid(repo=r, branch=branch, dir_names=dir_names)
        if not oid:
            return resp

        logger.info("Directory oid = %s", oid)
        tree = r.get(oid)
        content = self._walk_repo_current_layer(repo=r, branch=branch, tree=tree)
        content.parent_directories = dir_names
        resp.content = content
        return resp

    def _find_file_oid(
        self, repo: Repository, branch: str, file_name: str
    ) -> str | None:
        oid = None

        root = repo.revparse_single(branch).tree
        # We are not using os.path.split but text split because we are
        # trying to identify every directory, not just the head and tail.
        paths = [path for path in file_name.rstrip("/").split("/")]
        logger.info("### File paths = %s", paths)
        if len(paths) < 1:
            return

        visited = [root]
        while len(visited) > 0 and len(paths) > 0:
            tree = visited.pop()
            for entry in tree:
                logger.info(
                    "#### entry name = %s and entry type = %s str = %s",
                    entry.name,
                    entry.type,
                    entry.type_str,
                )
                # Check for directories only if we are not at the leaf layer.
                # When we are at the leaf layer, only look for files.
                if len(paths) > 1 and entry.filemode == pygit2.GIT_FILEMODE_TREE:
                    # In Git repo, directory is case insensitive.
                    if entry.name.lower() == paths[0].lower():
                        visited.append(entry)
                        paths.pop(0)
                        break
                elif len(paths) == 1 and entry.type == ObjectType.BLOB:
                    # In Git repo, directory is case insensitive.
                    if entry.name.lower() == paths[0].lower():
                        visited.append(entry)
                        paths.pop(0)
                        if not paths:
                            oid = entry.id
                        break
        return oid

    def get_file_content(
        self, repo_name: str, branch: str, file_name: str
    ) -> FileResponse:
        logger.info(
            "## get file content name %s branch %s file %s",
            repo_name,
            branch,
            file_name,
        )
        r = self._get_repo(repo_name)
        if not r:
            return FileResponse()

        resp = FileResponse(
            repo_name=repo_name,
            repo_url=r.path.strip(),
        )
        oid = self._find_file_oid(repo=r, branch=branch, file_name=file_name)
        if not oid:
            return resp

        logger.info("File oid = %s", oid)
        content = r.get(oid).data
        resp.content = content
        return resp
