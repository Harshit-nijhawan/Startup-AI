import json
import re

def safe_parse(text, key_name):
    """Extract valid JSON from LLM output."""
    if not text:
        return {key_name: "No response from model."}

    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    stripped = re.sub(r"^```(?:json)?\s*", "", text.strip(), flags=re.IGNORECASE)
    stripped = re.sub(r"```\s*$", "", stripped.strip())
    try:
        return json.loads(stripped)
    except json.JSONDecodeError:
        pass

    matches = list(re.finditer(r"\{[\s\S]*\}", text))
    if matches:
        for match in reversed(matches):
            try:
                return json.loads(match.group())
            except json.JSONDecodeError:
                continue

    return {key_name: text}


def extract_readable(obj):
    """Extract human-readable text from responses, flattening all nested JSON."""
    if isinstance(obj, str):
        # If it's a string that looks like JSON, try to parse and flatten it
        if obj.strip().startswith('{') or obj.strip().startswith('['):
            try:
                parsed = json.loads(obj)
                return extract_readable(parsed)
            except:
                pass
        
        # AGGRESSIVE CLEANUP: Remove all JSON patterns from the string
        obj = obj.strip()
        
        # Remove quoted key:value patterns: "key": "value" or 'key': 'value'
        obj = re.sub(r'["\']?(\w+)["\']?\s*:\s*["\']', '', obj)
        
        # Remove leading/trailing quotes
        if (obj.startswith('"') and obj.endswith('"')) or (obj.startswith("'") and obj.endswith("'")):
            obj = obj[1:-1]
        
        # Unescape quotes
        obj = obj.replace('\\"', '"').replace("\\'", "'")
        
        # Remove leading/trailing braces, brackets, commas
        obj = re.sub(r'^[\{\[\s,]+', '', obj)
        obj = re.sub(r'[\}\]\s,]+$', '', obj)
        
        # Remove any remaining trailing quotes
        while obj and obj[-1] in ('"', "'", ',', ' '):
            if obj[-1] in ('"', "'", ','):
                obj = obj[:-1].rstrip()
            else:
                break
        
        return obj.strip()
    
    if isinstance(obj, list):
        readable = []
        for item in obj:
            if isinstance(item, dict):
                if "description" in item:
                    readable.append(extract_readable(item["description"]))
                elif "name" in item:
                    readable.append(extract_readable(item["name"]))
                else:
                    extracted = extract_readable(item)
                    if isinstance(extracted, str):
                        readable.append(extracted)
            elif isinstance(item, str):
                readable.append(extract_readable(item))
            else:
                readable.append(str(item))
        return "\n".join(filter(None, readable))
    
    if isinstance(obj, dict):
        string_values = [v for v in obj.values() if isinstance(v, str) and v.strip()]
        if string_values and len(obj) <= 5:
            return "\n".join(extract_readable(v) for v in string_values if v)
        
        known_keys = ['market_demand', 'competitors', 'trends', 'opportunities', 
                     'summary', 'target_market', 'features', 'cost_estimate',
                     'risks', 'weaknesses', 'improvements', 'description']
        
        found_values = []
        for key in known_keys:
            if key in obj and obj[key]:
                found_values.append(extract_readable(obj[key]))
        
        if found_values:
            return "\n".join(filter(None, found_values))
        
        if len(obj) == 1 and "json" in obj:
            return extract_readable(obj["json"])
        
        if any(k in obj for k in ['$', 'cost', 'price', 'development', 'marketing', 'infrastructure']):
            lines = []
            for key, val in obj.items():
                if val is None or val == "":
                    continue
                display_key = key.replace('_', ' ').title()
                if isinstance(val, dict):
                    if '$' in val or 'cost' in val:
                        amount = val.get('$') or val.get('cost') or val.get('price', 0)
                        desc = val.get('description', '')
                        if desc:
                            lines.append(f"{display_key}: ${amount} ({desc})")
                        else:
                            lines.append(f"{display_key}: ${amount}")
                    else:
                        items = []
                        for subkey, subval in val.items():
                            if isinstance(subval, (int, float)):
                                items.append(f"{subkey}: {subval}%")
                            else:
                                items.append(f"{subkey}: {subval}")
                        lines.append(f"{display_key}: {', '.join(items)}")
                elif isinstance(val, (int, float)):
                    lines.append(f"{display_key}: ${val}")
                else:
                    lines.append(f"{display_key}: {val}")
            return "\n".join(filter(None, lines))
        
        if "description" in obj and isinstance(obj["description"], str):
            return extract_readable(obj["description"])
        
        return str(obj)
    
    return str(obj)
