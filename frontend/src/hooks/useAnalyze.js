import { useState } from 'react';
import { analyzeStartup } from '../api/analyze';

export function useAnalyze() {
  const [loading, setLoading] = useState(false);
  const [data, setData]       = useState(null);
  const [error, setError]     = useState(null);
  const [stage, setStage]     = useState(null); // 'research' | 'planning' | 'critique' | 'done'

  const analyze = async (idea, budget) => {
    // Client-side validation
    if (!idea || !idea.trim()) {
      setError('Please enter your startup idea.');
      return;
    }
    if (!budget || isNaN(Number(budget)) || Number(budget) <= 0) {
      setError('Please enter a valid budget (positive number).');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);
    setStage('research');

    try {
      // Simulate stage timing for better UX
      // In a real app, the backend would stream these updates
      
      // Research phase
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStage('planning');
      
      // Planning phase
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStage('critique');
      
      // Critique phase
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Actual API call
      const result = await analyzeStartup(idea, budget);
      
      // Check if response indicates success
      if (result.success === false || result.error) {
        throw new Error(result.message || result.error || 'Analysis failed');
      }
      
      setData(result);
      setStage('done');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error  ||
        err.message                ||
        'Something went wrong. Is the backend running?';
      setError(msg);
      setStage(null);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setStage(null);
  };

  return { loading, data, error, analyze, reset, stage };
}
