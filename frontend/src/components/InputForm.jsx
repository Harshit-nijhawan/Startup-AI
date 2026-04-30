import { useState } from 'react';
import { Lightbulb, IndianRupee, Zap, AlertCircle } from 'lucide-react';
import GlowInput from './ui/GlowInput';
import ShimmerButton from './ui/ShimmerButton';

export default function InputForm({ onSubmit, loading, error }) {
  const [idea, setIdea]     = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(idea, budget);
  };

  return (
    <div
      className="rounded-2xl border p-6 sm:p-8 theme-transition"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--card-shadow, 0 4px 24px rgba(0,0,0,0.06))',
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2.5 mb-1.5">
          <Zap size={18} style={{ color: 'var(--accent)' }} />
          <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            Analyze Your Startup Idea
          </h1>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Our AI agents will research the market, build a plan, and critique it for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Idea input */}
        <GlowInput
          id="startup-idea"
          label="Startup Idea"
          placeholder="e.g. An AI-powered personal finance app for Gen Z"
          value={idea}
          onChange={e => setIdea(e.target.value)}
          disabled={loading}
          autoComplete="off"
        />

        {/* Budget input */}
        <GlowInput
          id="startup-budget"
          label="Budget (INR)"
          placeholder="500000"
          prefix="₹"
          type="number"
          min="1"
          value={budget}
          onChange={e => setBudget(e.target.value)}
          disabled={loading}
        />

        {/* Error */}
        {error && (
          <div className="error-alert flex items-start gap-2.5 text-sm">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit */}
        <ShimmerButton type="submit" loading={loading}>
          <Lightbulb size={16} />
          Analyze Idea
        </ShimmerButton>
      </form>

      {/* Feature pills */}
      <div className="mt-5 flex flex-wrap gap-2">
        {[
          { icon: '🔍', label: 'Market Research' },
          { icon: '📈', label: 'Startup Plan'    },
          { icon: '⚠️', label: 'Risk Critique'   },
        ].map(f => (
          <span
            key={f.label}
            className="text-xs px-3 py-1 rounded-full border font-medium"
            style={{
              background: 'var(--accent-soft)',
              borderColor: 'var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            {f.icon} {f.label}
          </span>
        ))}
      </div>
    </div>
  );
}
