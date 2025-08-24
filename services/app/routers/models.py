from datetime import datetime

from pydantic import BaseModel, Field


class DirectoryContent(BaseModel):
    """Class representing all the sub-dir and files of a directory."""

    directories: list | None = Field(
        None, description="All the sub-dirs in this directory."
    )
    files: list | None = Field(None, description="All the files in this directory.")


class RepoResponse(BaseModel):
    """Class for a single Git Repo."""

    name: str | None = Field(None, description="The repo name.")
    url: str | None = Field(None, description="The repo URL.")
    description: str | None = Field(None, description="Optional repo description.")
    last_commit_message: str | None = Field(None)
    last_commit_time: datetime | None = Field(None)
    last_commit_author: str | None = Field(None)
    content: DirectoryContent | None = Field(
        None,
        description="Holds repo directory content, if it is a valid directory in the git repo.",
    )


class DirectoryResponse(BaseModel):
    """Class for a single Directory within a Git Repo."""

    repo_name: str | None = Field(None, description="The repo name.")
    repo_url: str | None = Field(None, description="The repo URL.")
    repo_description: str | None = Field(None, description="Optional repo description.")
    last_commit_message: str | None = Field(None)
    last_commit_time: datetime | None = Field(None)
    last_commit_author: str | None = Field(None)
    content: DirectoryContent | None = Field(
        None,
        description="Holds current directory content, if it is a valid directory in the git repo.",
    )


class FileResponse(BaseModel):
    """Class for a single file within a Git Repo."""

    repo_name: str | None = Field(None, description="The repo name.")
    repo_url: str | None = Field(None, description="The repo URL.")
    repo_description: str | None = Field(None, description="Optional repo description.")
    last_commit_message: str | None = Field(None)
    last_commit_time: datetime | None = Field(None)
    last_commit_author: str | None = Field(None)
    content: str | None = Field(
        None, description="Holds file content, if it is a valid file in the git repo."
    )
