.PHONY: format lint test precommit

format:
	uv run ruff format

lint:
	uv run ruff check

test:
	REPO_PATH="/src/gitui2/services/tests/repos" uv run pytest -vv . --ignore=tests/

precommit: lint format test