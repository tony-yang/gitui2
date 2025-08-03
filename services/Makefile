.PHONY: format lint test precommit

format:
	uv run ruff format

lint:
	uv run ruff check

test:
	uv run pytest -vv . --ignore=tests/

precommit: lint format test