import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export default function ConfidenceScore({ score, reasoning }) {
  if (!score && score !== 0) return null;

  // Determine color based on score
  let scoreColor, bgColor, progressColor;
  
  if (score >= 70) {
    scoreColor = '#10b981'; // Green
    bgColor = '#d1fae5';
    progressColor = '#059669';
  } else if (score >= 40) {
    scoreColor = '#f59e0b'; // Amber
    bgColor = '#fef3c7';
    progressColor = '#d97706';
  } else {
    scoreColor = '#ef4444'; // Red
    bgColor = '#fee2e2';
    progressColor = '#dc2626';
  }

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Score Card */}
      <div
        className="rounded-lg border p-6 backdrop-blur-sm"
        style={{
          backgroundColor: `${bgColor}33`,
          borderColor: scoreColor,
          borderWidth: '2px',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <TrendingUp size={24} style={{ color: scoreColor }} />
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: 'var(--text-muted)' }}
              >
                Success Probability
              </p>
              <p
                className="text-3xl font-bold"
                style={{ color: scoreColor }}
              >
                {score}%
              </p>
            </div>
          </div>

          {/* Score Badge */}
          <div
            className="px-4 py-2 rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: scoreColor }}
          >
            {score >= 70 ? '🔥 Strong' : score >= 40 ? '⚡ Moderate' : '⚠️ Risky'}
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className="w-full h-2 rounded-full overflow-hidden mb-4"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: `1px solid ${scoreColor}33`,
          }}
        >
          <motion.div
            className="h-full"
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ backgroundColor: progressColor }}
          />
        </div>

        {/* Reasoning */}
        {reasoning && (
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            <span className="font-semibold" style={{ color: scoreColor }}>
              💡 Analysis:
            </span>
            {' '}
            {reasoning}
          </p>
        )}
      </div>
    </motion.div>
  );
}
