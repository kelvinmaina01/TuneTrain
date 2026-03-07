import pytest
from fastapi.testclient import TestClient
from api.main import app

@pytest.fixture
def client():
    """Create a TestClient instance for API calls."""
    return TestClient(app)

@pytest.fixture
def sample_jsonl_content():
    """Return sample JSONL content for testing."""
    return '{"messages": [{"role": "user", "content": "Hi"}, {"role": "assistant", "content": "Hello"}]}\n' + \
           '{"messages": [{"role": "user", "content": "Bye"}, {"role": "assistant", "content": "Goodbye"}]}'
