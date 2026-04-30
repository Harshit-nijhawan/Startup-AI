import json
from app.core.ai import client
from app.utils.json_parser import safe_parse, extract_readable

def run_improvement_agent(idea: str, budget: int, previous_plan: dict, previous_critique: dict):
    """Use critique feedback to generate an improved plan."""
    plan_summary = json.dumps(previous_plan)
    critique_summary = json.dumps(previous_critique)
    
    prompt = f"Improve this startup plan based on the critique.\n\n"
    prompt += f"Original Idea: {idea}\nBudget: ₹{budget}\n\n"
    prompt += f"Previous Plan: {plan_summary}\n\n"
    prompt += f"Critique: {critique_summary}\n\n"
    prompt += "Return ONLY a JSON object with these EXACT keys:\n"
    prompt += "- summary: Plain text summary of the improved plan (2-3 sentences)\n"
    prompt += "- target_market: Plain text description of refined target customers\n"
    prompt += "- features: Plain text list of improved/new features\n"
    prompt += "- cost_estimate: Plain text revised budget breakdown\n\n"
    prompt += "CRITICAL: All values MUST be plain text strings. NEVER use JSON objects or arrays as values."
    
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You are a startup improvement expert. Return ONLY valid JSON. All values must be plain text strings. NO nested structures."},
            {"role": "user", "content": prompt}
        ]
    )

    text = response.choices[0].message.content
    result = safe_parse(text, "raw_improvement")
    
    return {
        "summary": extract_readable(result.get("summary", result.get("raw_improvement", ""))),
        "target_market": extract_readable(result.get("target_market", "")),
        "features": extract_readable(result.get("features", "")),
        "cost_estimate": extract_readable(result.get("cost_estimate", "")),
    }
