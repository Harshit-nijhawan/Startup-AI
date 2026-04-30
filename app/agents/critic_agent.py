from app.core.ai import client
from app.utils.json_parser import safe_parse, extract_readable

def run_critic_agent(plan_text: str):
    prompt = f"Analyze and critique this startup plan: {plan_text}\n\n"
    prompt += "Return ONLY a JSON object with these EXACT keys:\n"
    prompt += "- risks: Plain text description of risks (2-3 sentences)\n"
    prompt += "- weaknesses: Plain text description of weaknesses (2-3 sentences)\n"
    prompt += "- improvements: Plain text description of improvements (2-3 sentences)\n\n"
    prompt += "CRITICAL: All values MUST be plain text strings. NEVER use JSON objects or arrays as values."
    
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "Return ONLY valid JSON. All values must be plain text strings. NO nested structures."},
            {"role": "user", "content": prompt}
        ]
    )

    text = response.choices[0].message.content
    result = safe_parse(text, "raw_critique")
    
    return {
        "risks": extract_readable(result.get("risks", result.get("raw_critique", ""))),
        "weaknesses": extract_readable(result.get("weaknesses", "")),
        "improvements": extract_readable(result.get("improvements", "")),
    }
