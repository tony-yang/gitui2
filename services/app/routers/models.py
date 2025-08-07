from datetime import datetime

from pydantic import BaseModel, Field


class RepoResponse(BaseModel):
    """Class for a single Git Repo."""

    name: str = Field(..., description="The repo name.")
    url: str = Field(..., description="The repo URL.")
    description: str | None = Field(None, description="Optional repo description.")
    last_commit_message: str | None = Field(None)
    last_commit_time: datetime | None = Field(None)
    last_commit_author: str | None = Field(None)
