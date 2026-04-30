import { motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function AgentFlow({ stage, isLoading }) {
  const stages = [
    {
      id: 'research',
      icon: '🔍',
      title: 'Research Agent',
      description: 'Analyzing market demand, competitors, and trends',
      color: 'purple',
    },
    {
      id: 'planning',
      icon: '🧠',
      title: 'Planner Agent',
      description: 'Creating structured startup plan based on research',
      color: 'green',
    },
    {
      id: 'critique',
      icon: '⚠️',
      title: 'Critic Agent',
      description: 'Evaluating risks, weaknesses, and improvements',
      color: 'red',
    },
  ];

  const getStageIndex = (stageId) => stages.findIndex(s => s.id === stageId);
  const currentIndex = getStageIndex(stage);

  const isStageActive = (stageId) => {
    const stageIndex = getStageIndex(stageId);
    return stageIndex <= currentIndex;
  };

  const isStageComplete = (stageId) => {
    if (!isLoading && stage === 'done') return true;
    const stageIndex = getStageIndex(stageId);
    return stageIndex < currentIndex;
  };

  const isStageCurrent = (stageId) => stage === stageId && isLoading;

  const colorClasses = {
    purple: {
      badge: 'bg-purple-500/10 text-purple-400 border-purple-500/25',
      border: 'border-l-purple-500',
      glow: 'shadow-glow-purple',
      progress: 'from-purple-500/20 to-purple-500/5',
    },
    green: {
      badge: 'bg-green-500/10 text-green-400 border-green-500/25',
      border: 'border-l-green-500',
      glow: 'shadow-glow-green',
      progress: 'from-green-500/20 to-green-500/5',
    },
    red: {
      badge: 'bg-red-500/10 text-red-400 border-red-500/25',
      border: 'border-l-red-500',
      glow: 'shadow-glow-red',
      progress: 'from-red-500/20 to-red-500/5',
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mt-6 mb-8"
    >
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          🧠 AI Agent Reasoning
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          Watch how multiple AI agents analyze and process your startup idea
        </p>
      </div>

      {/* Stages Container */}
      <div className="space-y-3">
        {stages.map((stageData, index) => {
          const colors = colorClasses[stageData.color];
          const isActive = isStageActive(stageData.id);
          const isComplete = isStageComplete(stageData.id);
          const isCurrent = isStageCurrent(stageData.id);

          return (
            <motion.div
              key={stageData.id}
              variants={itemVariants}
              className={`
                relative rounded-xl border-l-4 p-4 transition-all duration-300
                ${isActive ? colors.border : 'border-l-transparent'}
                ${isCurrent && isLoading ? `${colors.glow}` : ''}
              `}
              style={{
                background: isActive ? `var(--bg-card)` : 'var(--bg-primary)',
                borderColor: isActive ? 'currentColor' : 'var(--border)',
              }}
            >
              {/* Animated Background */}
              {isCurrent && isLoading && (
                <motion.div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${colors.progress}`}
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              <div className="relative z-10 flex items-start gap-4">
                {/* Icon Container */}
                <motion.div
                  className="flex-shrink-0"
                  animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold
                      ${isComplete ? 'bg-green-500/10' : isActive ? `${colors.badge}` : 'bg-gray-500/10'}
                    `}
                  >
                    {isComplete ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, type: 'spring' }}
                      >
                        <CheckCircle2 size={28} className="text-green-400" />
                      </motion.div>
                    ) : isCurrent ? (
                      <Loader2 size={28} className="animate-spin" style={{ color: `var(--accent)` }} />
                    ) : (
                      stageData.icon
                    )}
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <h3
                    className="font-semibold text-sm mb-1"
                    style={{ color: isComplete ? '#22c55e' : 'var(--text-primary)' }}
                  >
                    {stageData.title}
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {stageData.description}
                  </p>

                  {/* Status Badge */}
                  {isCurrent && isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 inline-flex items-center gap-1"
                    >
                      <Loader2 size={14} className="animate-spin" style={{ color: `var(--accent)` }} />
                      <span className="text-xs font-medium" style={{ color: `var(--accent)` }}>
                        Processing...
                      </span>
                    </motion.div>
                  )}

                  {isComplete && !isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 inline-flex items-center gap-1"
                    >
                      <CheckCircle2 size={14} className="text-green-400" />
                      <span className="text-xs font-medium text-green-400">
                        Complete
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Progress Indicator */}
                {!isComplete && !isCurrent && (
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-gray-500/30" />
                  </div>
                )}
              </div>

              {/* Progress Bar (for current stage) */}
              {isCurrent && isLoading && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 rounded-b-xl"
                  style={{ background: `var(--accent)` }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Summary Stats (when done) */}
      {!isLoading && stage === 'done' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-5 p-3 rounded-lg border flex items-center gap-2"
          style={{
            background: 'rgba(34, 197, 94, 0.05)',
            borderColor: '#22c55e',
          }}
        >
          <CheckCircle2 size={18} className="text-green-400 flex-shrink-0" />
          <span className="text-sm" style={{ color: '#22c55e' }}>
            All agents completed their analysis. Results below.
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
