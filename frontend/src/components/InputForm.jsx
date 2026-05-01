import { useState } from 'react';
import { motion } from 'framer-motion';
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
      className="glass rounded-[2rem] p-8 sm:p-10 theme-transition border-2 border-white/10 relative overflow-hidden"
      style={{
        boxShadow: 'var(--shadow-premium)',
      }}
    >
      {/* Subtle background glow */}
      <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
      
      {/* Header */}
      <div className="mb-8 relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
            <Zap size={18} className="text-indigo-500" />
          </div>
          <h1 className="text-2xl font-bold font-outfit" style={{ color: 'var(--text-primary)' }}>
            Analyze Your Startup Idea
          </h1>
        </div>
        <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
          Our AI agents will research the market, build a plan, and critique it for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
        {/* Idea input */}
        <div className="space-y-2">
          <GlowInput
            id="startup-idea"
            label="Startup Idea"
            placeholder="e.g. An AI-powered personal finance app for Gen Z"
            value={idea}
            onChange={e => setIdea(e.target.value)}
            disabled={loading}
            autoComplete="off"
          />
        </div>

        {/* Budget input */}
        <div className="space-y-2">
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
        </div>

        {/* Error */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="error-alert flex items-start gap-2.5 text-sm font-medium"
          >
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Submit */}
        <div className="pt-2">
          <ShimmerButton type="submit" loading={loading} className="w-full py-4 text-base font-bold">
            <div className="flex items-center justify-center gap-2">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Lightbulb size={20} className="fill-white/20" />
              )}
              {loading ? 'Synthesizing Data...' : 'Launch AI Analysis'}
            </div>
          </ShimmerButton>
        </div>
      </form>

      {/* Feature pills */}
      <div className="mt-8 flex flex-wrap gap-2 relative z-10">
        {[
          { icon: '🔍', label: 'Market Research' },
          { icon: '📈', label: 'Startup Plan'    },
          { icon: '⚠️', label: 'Risk Critique'   },
        ].map(f => (
          <span
            key={f.label}
            className="text-[10px] uppercase tracking-wider px-4 py-1.5 rounded-full border-2 font-black transition-all hover:scale-105"
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
