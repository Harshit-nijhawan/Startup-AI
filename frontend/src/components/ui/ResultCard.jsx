import { motion } from 'framer-motion';

/**
 * Animated output card with glassmorphism and colored top-border accent
 * @param {string} accentColor - 'purple' | 'green' | 'red'
 */
export default function ResultCard({
  title,
  icon,
  accentColor = 'purple',
  children,
  delay = 0,
}) {
  const accents = {
    purple: {
      border:  'border-purple-500/30',
      glow:    'rgba(99, 102, 241, 0.1)',
      iconBg:  'bg-indigo-500/10 text-indigo-400',
    },
    green: {
      border:  'border-emerald-500/30',
      glow:    'rgba(16, 185, 129, 0.1)',
      iconBg:  'bg-emerald-500/10 text-emerald-400',
    },
    red: {
      border:  'border-rose-500/30',
      glow:    'rgba(244, 63, 94, 0.1)',
      iconBg:  'bg-rose-500/10 text-rose-400',
    },
  };

  const accent = accents[accentColor] ?? accents.purple;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`
        glass rounded-3xl border-t-4 ${accent.border} 
        p-7 flex flex-col gap-5 relative group overflow-hidden
      `}
      style={{ boxShadow: `0 10px 40px -10px ${accent.glow}` }}
    >
      {/* Subtle top light flare */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Card Header */}
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${accent.iconBg}`}>
          {icon}
        </div>
        <h2 className="text-xl font-bold tracking-tight font-outfit" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h2>
      </div>

      {/* Content */}
      <div className="flex flex-col relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
