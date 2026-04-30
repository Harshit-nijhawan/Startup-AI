import { motion } from 'framer-motion';

/**
 * Animated output card with colored top-border accent
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
      border:  'border-t-purple-500',
      shadow:  'hover:shadow-glow-purple',
      iconBg:  'bg-purple-500/10 text-purple-400',
    },
    green: {
      border:  'border-t-green-500',
      shadow:  'hover:shadow-glow-green',
      iconBg:  'bg-green-500/10 text-green-400',
    },
    red: {
      border:  'border-t-red-500',
      shadow:  'hover:shadow-glow-red',
      iconBg:  'bg-red-500/10 text-red-400',
    },
  };

  const accent = accents[accentColor] ?? accents.purple;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`
        result-card rounded-2xl border-t-2 ${accent.border} ${accent.shadow}
        p-6 flex flex-col gap-4
      `}
    >
      {/* Card Header */}
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${accent.iconBg}`}>
          {icon}
        </div>
        <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h2>
      </div>

      {/* Content */}
      <div className="flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}
