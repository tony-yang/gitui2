from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_read_repos():
    response = client.get("/repos")
    assert response.status_code == 200
    assert len(response.json()) == 2
    assert response.json()[0]["name"] == "test1"
