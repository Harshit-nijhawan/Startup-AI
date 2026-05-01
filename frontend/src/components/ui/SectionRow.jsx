/**
 * A single label + value section row inside a result card
 */
export default function SectionRow({ label, value, accentColor }) {
  const colors = {
    purple: { badge: 'bg-purple-500/10 text-purple-400 border-purple-500/25' },
    green:  { badge: 'bg-green-500/10  text-green-400  border-green-500/25'  },
    red:    { badge: 'bg-red-500/10    text-red-400    border-red-500/25'    },
  };

  const badgeClass = colors[accentColor]?.badge ?? colors.purple.badge;

  // Strip JSON syntax from strings
  const cleanJsonString = (str) => {
    if (!str || typeof str !== 'string') return str;
    
    str = str.trim();
    
    // Remove leading/trailing quotes if entire string is quoted
    if ((str.startsWith('"') && str.endsWith('"')) || 
        (str.startsWith("'") && str.endsWith("'"))) {
      str = str.slice(1, -1);
    }
    
    // Unescape quotes and special characters
    str = str.replace(/\\"/g, '"');
    str = str.replace(/\\'/g, "'");
    str = str.replace(/\\n/g, '\n');
    str = str.replace(/\\t/g, '\t');
    
    // Remove "json" prefix and markers
    str = str.replace(/^["']?json["']?\s*[:\-]?\s*/i, '');
    
    // CRITICAL: Remove all "key": "value" patterns, keeping only values
    // This matches: "key": "value", 'key': 'value', key: value, etc.
    str = str.replace(/^["']?[a-zA-Z_]\w*["']?\s*:\s*["']?/g, '');
    
    // Remove leading/trailing braces, brackets, commas
    str = str.replace(/^[\{\[\s,]*/g, '');
    str = str.replace(/[\}\]\s,]*$/g, '');
    
    // Remove closing quotes that might be leftover
    if (str.endsWith('"') || str.endsWith("'")) {
      str = str.slice(0, -1);
    }
    
    return str.trim();
  };

  // Convert value to display text
  const formatValue = (val) => {
    if (!val) return null;

    // Handle strings
    if (typeof val === 'string') {
      // Clean up JSON-like content
      let cleaned = cleanJsonString(val);
      return cleaned;
    }

    // Handle arrays
    if (Array.isArray(val)) {
      return val
        .map((item) => {
          if (typeof item === 'string') {
            return `• ${cleanJsonString(item)}`;
          }
          if (typeof item === 'object' && item !== null) {
            if (item.description) return `• ${cleanJsonString(item.description)}`;
            if (item.name) return `• ${cleanJsonString(item.name)}`;
            return `• ${cleanJsonString(JSON.stringify(item))}`;
          }
          return `• ${item}`;
        })
        .join('\n');
    }

    // Handle objects
    if (typeof val === 'object' && val !== null) {
      // Extract description if available
      if (val.description && typeof val.description === 'string') {
        return cleanJsonString(val.description);
      }

      // If object has numeric values (market data), format as key: value
      const entries = Object.entries(val);
      if (entries.length > 0) {
        // Check if all values are primitives
        const allPrimitive = entries.every(([, v]) => 
          typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean'
        );

        if (allPrimitive) {
          return entries
            .filter(([, v]) => v !== null && v !== undefined && v !== '')
            .map(([k, v]) => {
              const displayKey = k.replace(/_/g, ' ').toLowerCase();
              if (typeof v === 'number' && (k.includes('rate') || k.includes('percent'))) {
                return `${displayKey}: ${v}%`;
              }
              return `${displayKey}: ${v}`;
            })
            .join('\n');
        }

        // For mixed types, extract readable content
        const lines = [];
        for (const [k, v] of entries) {
          if (v === null || v === undefined || v === '') continue;
          
          if (typeof v === 'string') {
            lines.push(cleanJsonString(v));
          } else if (typeof v === 'number') {
            lines.push(`${k}: ${v}`);
          } else if (typeof v === 'object') {
            const nested = formatValue(v);
            if (nested) lines.push(nested);
          }
        }
        return lines.join('\n');
      }

      // Fallback: convert to JSON and clean
      return cleanJsonString(JSON.stringify(val));
    }

    return String(val);
  };

  const rendered = formatValue(value);

  return (
    <div
      className="flex flex-col gap-2 py-4 border-b last:border-b-0 group/row"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="flex items-center justify-between">
        <span className={`section-badge w-fit ${badgeClass} shadow-sm`}>
          {label}
        </span>
      </div>
      
      {rendered ? (
        <div
          className="text-[0.9375rem] leading-relaxed whitespace-pre-wrap break-words font-medium"
          style={{ color: 'var(--text-secondary)' }}
        >
          {rendered}
        </div>
      ) : (
        <p className="text-sm italic opacity-50" style={{ color: 'var(--text-muted)' }}>
          No data available
        </p>
      )}
    </div>
  );
}
