import pytest
from fastapi.testclient import TestClient
import os

def test_health_check(client):
    """Verify API is running."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "message": "Deploy API is running"}

def test_upload_flow(client, tmp_path):
    """Test full upload -> recommend -> plan flow."""
    
    # 1. Create a dummy JSONL file
    d = tmp_path / "test_data.jsonl"
    content = '{"messages": [{"role": "user", "content": "Hi"}, {"role": "assistant", "content": "Hello"}]}\n' * 50
    d.write_text(content, encoding="utf-8")
    
    # 2. Upload
    with open(d, "rb") as f:
        files = {"file": ("test_data.jsonl", f, "application/jsonl")}
        response = client.post("/api/upload", files=files)
    
    assert response.status_code == 200
    data = response.json()
    assert "session_id" in data
    assert data["rows"] == 50
    
    session_id = data["session_id"]
    
    # 3. Recommend
    rec_payload = {
        "session_id": session_id,
        "user_task": "conversation",
        "deployment_target": "cloud_api"
    }
    response = client.post("/api/recommend", json=rec_payload)
    assert response.status_code == 200
    rec_data = response.json()
    assert "recommendation" in rec_data
    assert "primary_recommendation" in rec_data["recommendation"]
    
    # 4. Plan
    plan_payload = {
        "session_id": session_id,
        "user_task": "conversation",
        "deployment_target": "cloud_api",
        "selected_model_id": rec_data["recommendation"]["primary_recommendation"]["model_id"]
    }
    response = client.post("/api/plan", json=plan_payload)
    assert response.status_code == 200
    plan_data = response.json()
    assert "training_config" in plan_data
    assert plan_data["training_config"]["task_type"] == "chat"

def test_upload_invalid_file(client, tmp_path):
    """Test uploading an unsupported file type."""
    d = tmp_path / "test.exe"
    d.write_text("binary content", encoding="utf-8")
    
    with open(d, "rb") as f:
        files = {"file": ("test.exe", f, "application/octet-stream")}
        response = client.post("/api/upload", files=files)
    
    # Expect 400 Bad Request
    assert response.status_code == 400
    assert "Unsupported format" in response.text
