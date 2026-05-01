import { motion } from 'framer-motion';
import { TrendingUp, Info } from 'lucide-react';

export default function ConfidenceScore({ score, reasoning }) {
  if (!score && score !== 0) return null;

  // Determine color based on score
  let scoreColor, progressGradient, glowColor;
  
  if (score >= 70) {
    scoreColor = '#10b981'; // Green
    progressGradient = 'linear-gradient(90deg, #10b981, #34d399)';
    glowColor = 'rgba(16, 185, 129, 0.4)';
  } else if (score >= 40) {
    scoreColor = '#f59e0b'; // Amber
    progressGradient = 'linear-gradient(90deg, #f59e0b, #fbbf24)';
    glowColor = 'rgba(245, 158, 11, 0.4)';
  } else {
    scoreColor = '#ef4444'; // Red
    progressGradient = 'linear-gradient(90deg, #ef4444, #f87171)';
    glowColor = 'rgba(239, 68, 68, 0.4)';
  }

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="glass rounded-2xl p-6 relative overflow-hidden group border-2"
        style={{ borderColor: `${scoreColor}22` }}
      >
        {/* Decorative subtle background glow */}
        <div 
          className="absolute -right-20 -top-20 w-40 h-40 rounded-full blur-[100px] opacity-20 transition-all duration-700 group-hover:opacity-30"
          style={{ background: scoreColor }}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ 
                background: `${scoreColor}15`,
                border: `1px solid ${scoreColor}33`
              }}
            >
              <TrendingUp size={28} style={{ color: scoreColor }} />
            </div>
            
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
                Success Probability
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold tracking-tight font-outfit" style={{ color: 'var(--text-primary)' }}>
                  {score}%
                </span>
                <span className="text-sm font-semibold px-2.5 py-0.5 rounded-full" 
                      style={{ backgroundColor: `${scoreColor}15`, color: scoreColor }}>
                  {score >= 70 ? 'High' : score >= 40 ? 'Moderate' : 'Critical'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-md">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Progress to Market Fit</span>
              <span className="text-xs font-bold" style={{ color: scoreColor }}>{score}/100</span>
            </div>
            
            {/* Premium Progress Bar */}
            <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-[2px] border border-white/5 shadow-inner">
              <motion.div
                className="h-full rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ background: progressGradient }}
              >
                {/* Gloss effect on bar */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-50" />
                {/* End cap glow */}
                <div 
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full blur-md"
                  style={{ background: scoreColor, boxShadow: `0 0 15px ${glowColor}` }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Reasoning Section */}
        {reasoning && (
          <div className="mt-6 pt-6 border-t border-white/10 dark:border-white/5 flex gap-3 items-start relative z-10">
            <Info size={18} className="mt-0.5 shrink-0" style={{ color: scoreColor }} />
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <span className="font-bold mr-1" style={{ color: 'var(--text-primary)' }}>AI Insight:</span>
              {reasoning}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
