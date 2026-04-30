import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Loader2 } from 'lucide-react';
import { improvePlan } from '../api/analyze';

export default function ImprovePlanButton({
  idea,
  budget,
  currentPlan,
  currentCritique,
  onPlanImproved,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImprove = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await improvePlan(
        idea,
        budget,
        currentPlan,
        currentCritique
      );

      if (result.success && result.improved_plan) {
        onPlanImproved(result.improved_plan);
      } else {
        throw new Error(result.message || 'Failed to improve plan');
      }
    } catch (err) {
      setError(err.message || 'Error improving plan');
      console.error('Improve error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 space-y-3">
      <motion.button
        onClick={handleImprove}
        disabled={isLoading}
        className="w-full px-6 py-3 rounded-lg font-semibold text-white transition-all"
        style={{
          backgroundColor: isLoading ? 'var(--text-muted)' : 'var(--accent)',
          opacity: isLoading ? 0.6 : 1,
          cursor: isLoading ? 'not-allowed' : 'pointer',
        }}
        whileHover={!isLoading ? { scale: 1.02 } : {}}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
      >
        <div className="flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Improving plan with AI...</span>
            </>
          ) : (
            <>
              <Zap size={18} />
              <span>Improve Plan</span>
            </>
          )}
        </div>
      </motion.button>

      {error && (
        <motion.p
          className="text-sm font-medium p-3 rounded-lg"
          style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            borderLeft: '3px solid #dc2626',
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ❌ {error}
        </motion.p>
      )}
    </div>
  );
}
