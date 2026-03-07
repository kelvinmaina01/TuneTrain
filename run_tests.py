import unittest
import os
import shutil
import tempfile
from fastapi.testclient import TestClient
from api.main import app

class TestAPI(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)
        self.test_dir = tempfile.mkdtemp()

    def tearDown(self):
        if os.path.exists(self.test_dir):
            shutil.rmtree(self.test_dir)

    def test_health(self):
        print("\nTesting /health endpoint...")
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok", "message": "Deploy API is running"})
        print("[PASS] Health check passed")

    def test_upload_flow(self):
        print("\nTesting full upload flow...")
        # Create dummy jsonl
        file_path = os.path.join(self.test_dir, "test.jsonl")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write('{"messages": [{"role": "user", "content": "Hi"}, {"role": "assistant", "content": "Hello"}]}\n' * 50)
        
        with open(file_path, "rb") as f:
            files = {"file": ("test.jsonl", f, "application/jsonl")}
            response = self.client.post("/api/upload", files=files)
        
        if response.status_code != 200:
            print(f"Upload failed: {response.text}")
        
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("session_id", data)
        self.assertEqual(data["rows"], 50)
        session_id = data["session_id"]
        print(f"[PASS] Upload passed (Session: {session_id})")
        
        # Recommend
        rec_payload = {
            "session_id": session_id,
            "user_task": "conversation",
            "deployment_target": "cloud_api"
        }
        response = self.client.post("/api/recommend", json=rec_payload)
        self.assertEqual(response.status_code, 200)
        rec_data = response.json()
        self.assertIn("recommendation", rec_data)
        model_id = rec_data["recommendation"]["primary_recommendation"]["model_id"]
        print(f"[PASS] Recommendation passed (Model: {model_id})")
        
        # Plan
        plan_payload = {
            "session_id": session_id,
            "user_task": "conversation",
            "deployment_target": "cloud_api",
            "selected_model_id": model_id
        }
        response = self.client.post("/api/plan", json=plan_payload)
        self.assertEqual(response.status_code, 200)
        print("[PASS] Planning passed")

    def test_upload_invalid_file(self):
        print("\nTesting invalid file upload...")
        file_path = os.path.join(self.test_dir, "test.exe")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write("binary content")
        
        with open(file_path, "rb") as f:
            files = {"file": ("test.exe", f, "application/octet-stream")}
            response = self.client.post("/api/upload", files=files)
        
        self.assertEqual(response.status_code, 400)
        self.assertIn("Unsupported format", response.text)
        print("[PASS] Invalid file rejection passed")

if __name__ == "__main__":
    unittest.main(verbosity=2)
