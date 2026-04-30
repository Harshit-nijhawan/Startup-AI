import { useState } from 'react';
import { getAnalysisById } from '../api/analyze';

export function useLoadAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAnalysis = async (analysisId) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getAnalysisById(analysisId);

      if (result.success) {
        return {
          id: result.id,
          idea: result.idea,
          budget: result.budget,
          research: result.research,
          plan: result.plan,
          critique: result.critique,
          confidence: result.confidence,
          improved_plan: result.improved_plan,
          created_at: result.created_at,
        };
      } else {
        throw new Error(result.error || 'Failed to load analysis');
      }
    } catch (err) {
      const errorMsg = err.message || 'Error loading analysis';
      setError(errorMsg);
      console.error('Load analysis error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loadAnalysis, loading, error };
}
