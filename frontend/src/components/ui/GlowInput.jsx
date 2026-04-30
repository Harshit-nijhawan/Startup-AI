import { forwardRef } from 'react';

/**
 * Aceternity-inspired glow input
 * Glows with accent color on focus via CSS class `.glow-input`
 */
const GlowInput = forwardRef(function GlowInput(
  { label, id, prefix, className = '', ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium"
          style={{ color: 'var(--text-secondary)' }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <span
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold select-none pointer-events-none"
            style={{ color: 'var(--accent)' }}
          >
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          id={id}
          className={`
            glow-input w-full rounded-xl px-4 py-3.5 text-sm font-medium
            ${prefix ? 'pl-8' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
    </div>
  );
});

export default GlowInput;
