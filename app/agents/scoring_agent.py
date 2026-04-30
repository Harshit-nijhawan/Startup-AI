from app.core.ai import client
from app.utils.json_parser import safe_parse, extract_readable

def run_scoring_agent(idea: str, plan_text: str, critique_text: str):
    """Score the likelihood of startup success."""
    prompt = f"Evaluate the success probability of this startup idea.\n\n"
    prompt += f"Idea: {idea}\n\n"
    prompt += f"Plan: {plan_text}\n\n"
    prompt += f"Risks & Critique: {critique_text}\n\n"
    prompt += "Return ONLY a JSON object with these EXACT keys:\n"
    prompt += "- score: An integer from 0-100 representing success probability\n"
    prompt += "- reasoning: Plain text explanation in 1-2 sentences\n\n"
    prompt += "CRITICAL: Score must be an integer (e.g., 72), reasoning must be a plain text string."
    
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You are a startup success evaluator. Be realistic and balanced. Return ONLY valid JSON with an integer score and plain text reasoning."},
            {"role": "user", "content": prompt}
        ]
    )

    text = response.choices[0].message.content
    result = safe_parse(text, "raw_confidence")
    
    score = result.get("score", 0)
    reasoning = result.get("reasoning", "")
    
    # Ensure score is an integer
    try:
        score = int(score)
        if score < 0: score = 0
        if score > 100: score = 100
    except (ValueError, TypeError):
        score = 50
    
    return {
        "score": score,
        "reasoning": extract_readable(reasoning)
    }
