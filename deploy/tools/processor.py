"""
Universal Data Processor
========================
Handles conversion of various formats (TXT, PDF, CSV) into a unified JSONL chat format.
In Gen-2, this simulates an LLM-based synthetic data generator.
"""

import json
from typing import List, Dict, Any

def process_raw_text(text: str, filename: str) -> List[Dict[str, Any]]:
    """
    Simulate LLM-based self-instruct. 
    In a real production system, this would call GPT-4o or Llama-70B 
    to extract Q&A pairs from the text.
    """
    # Simple heuristic splitting for the mock
    chunks = text.split('\n\n')
    dataset = []
    
    for i, chunk in enumerate(chunks):
        if len(chunk) < 50: continue
        
        # Mocking an instruction-response pair
        dataset.append({
            "messages": [
                {"role": "system", "content": f"You are an expert assistant trained on data from {filename}."},
                {"role": "user", "content": f"What can you tell me about the following: {chunk[:50]}...?"},
                {"role": "assistant", "content": f"Based on the provided data, here is the information: {chunk}"}
            ]
        })
        
        if len(dataset) >= 60: break # Keep it manageable for the demo
        
    return dataset

def adapter_factory(file_path: str, content: str) -> List[Dict[str, Any]]:
    """Detect format and route to correct processor."""
    if file_path.endswith('.txt'):
        return process_raw_text(content, file_path.split('/')[-1])
    elif file_path.endswith('.jsonl'):
        return [json.loads(line) for line in content.strip().splitlines()]
    else:
        # For PDF/Docs we would use a library like PyMuPDF or docx2txt
        # Mocking PDF as raw text for now
        return process_raw_text(content, file_path.split('/')[-1])
