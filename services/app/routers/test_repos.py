from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_read_repos():
    response = client.get("/api/v1/repos")
    assert response.status_code == 200
    assert len(response.json()) == 2
    assert response.json()[0]["name"] == "test1"


def test_get_repo():
    response = client.get("/api/v1/repos/test1")
    assert response.status_code == 200
    assert response.json()["repo_name"] == "test1"
