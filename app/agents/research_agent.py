from app.core.ai import client
from app.utils.json_parser import safe_parse, extract_readable

def run_research_agent(idea: str):
    prompt = f"Analyze market for: {idea}\n\n"
    prompt += "Return ONLY a JSON object with these EXACT keys:\n"
    prompt += "- market_demand: Plain text description (1-2 sentences)\n"
    prompt += "- competitors: Plain text list like 'Company A, Company B, Company C'\n"
    prompt += "- trends: Plain text description of 3-4 trends\n"
    prompt += "- opportunities: Plain text description of opportunities\n\n"
    prompt += "Example output:\n"
    prompt += '{"market_demand": "High demand for AI finance apps", "competitors": "Wealthfront, Betterment", "trends": "Mobile adoption, AI growth", "opportunities": "Underserved Gen Z market"}'
    
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "Return ONLY valid JSON. All values must be plain text strings, NEVER use nested objects or arrays."},
            {"role": "user", "content": prompt}
        ]
    )

    text = response.choices[0].message.content
    result = safe_parse(text, "raw_research")
    
    return {
        "market_demand": extract_readable(result.get("market_demand", result.get("raw_research", ""))),
        "competitors": extract_readable(result.get("competitors", "")),
        "trends": extract_readable(result.get("trends", "")),
        "opportunities": extract_readable(result.get("opportunities", "")),
    }
