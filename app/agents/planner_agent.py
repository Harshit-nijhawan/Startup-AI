from app.core.ai import client
from app.utils.json_parser import safe_parse, extract_readable

def run_planner_agent(idea: str, budget: int, research_text: str):
    prompt = f"Create startup plan for: {idea} (Budget: ₹{budget})\n\n"
    prompt += f"Market research: {research_text}\n\n"
    prompt += "Return ONLY a JSON object with these EXACT keys:\n"
    prompt += "- summary: Plain text summary (2-3 sentences)\n"
    prompt += "- target_market: Plain text description of target customers\n"
    prompt += "- features: Plain text list like 'Feature 1, Feature 2, Feature 3'\n"
    prompt += "- cost_estimate: Plain text budget breakdown like 'Development: ₹X, Marketing: ₹Y, Infrastructure: ₹Z'\n\n"
    prompt += "CRITICAL: All values MUST be plain text strings. NEVER use JSON objects or arrays as values. Mention costs in Rupees (₹)."
    
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "Return ONLY valid JSON. All values must be plain text strings. NO nested structures."},
            {"role": "user", "content": prompt}
        ]
    )

    text = response.choices[0].message.content
    result = safe_parse(text, "raw_plan")
    
    return {
        "summary": extract_readable(result.get("summary", result.get("raw_plan", ""))),
        "target_market": extract_readable(result.get("target_market", "")),
        "features": extract_readable(result.get("features", "")),
        "cost_estimate": extract_readable(result.get("cost_estimate", "")),
    }
