import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InputForm from './InputForm';
import ResultsSection from './ResultsSection';
import AgentFlow from './AgentFlow';
import HistorySidebar from './HistorySidebar';
import SkeletonLoader from './ui/SkeletonLoader';
import { useAnalyze } from '../hooks/useAnalyze';
import { useLoadAnalysis } from '../hooks/useLoadAnalysis';

/* ── Decorative background grid overlay ── */
function GridOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="grid-bg absolute inset-0" />
      {/* Radial gradient blobs */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-30 dark:opacity-20 animate-pulse"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }}
      />
      <div
        className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full blur-[100px] opacity-20 dark:opacity-10"
        style={{ background: 'radial-gradient(circle, #ec4899, transparent)' }}
      />
      <div
        className="absolute -bottom-[10%] left-[20%] w-[35%] h-[35%] rounded-full blur-[110px] opacity-20 dark:opacity-15"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }}
      />
    </div>
  );
}

export default function Dashboard() {
  const { loading, data, error, analyze, stage } = useAnalyze();
  const { loadAnalysis, loading: loadingAnalysis } = useLoadAnalysis();

  const [currentAnalysisId, setCurrentAnalysisId] = useState(null);
  const [displayData, setDisplayData] = useState(null);

  const handleAnalyzeSubmit = async (idea, budget) => {
    const result = await analyze(idea, budget);
    if (result?.success && result?.id) {
      setCurrentAnalysisId(result.id);
      setDisplayData(result);
    }
  };

  const handleLoadAnalysis = async (analysisId) => {
    try {
      const loadedData = await loadAnalysis(analysisId);
      setCurrentAnalysisId(analysisId);
      setDisplayData(loadedData);
    } catch (err) {
      console.error('Failed to load analysis:', err);
    }
  };

  return (
    <div
      className="relative min-h-screen theme-transition flex flex-col noise-bg"
      style={{ background: 'var(--bg-primary)' }}
    >
      <GridOverlay />

      {/* ── Main Layout: Sidebar + Content ── */}
      <div className="relative z-10 flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <HistorySidebar
          onAnalysisSelect={handleLoadAnalysis}
          currentAnalysisId={currentAnalysisId}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-10 py-12 pb-32">
            {/* Hero headline - only show when no data */}
            {!displayData && !data && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-center mb-16"
              >
                <div
                  className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2
                            rounded-full border mb-8 glass shadow-sm"
                  style={{
                    color: 'var(--accent)',
                    borderColor: 'var(--accent-soft)',
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-indigo-500" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
                  </span>
                  AI-Powered Venture Analysis
                </div>

                <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-6 leading-[1.1] font-outfit text-balance">
                  <span className="gradient-text">Validate your startup</span>
                  <br />
                  <span className="text-slate-900 dark:text-white">before you build it.</span>
                </h1>

                <p className="text-lg sm:text-xl max-w-2xl mx-auto font-medium leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Deploy three specialized AI agents to stress-test your idea, 
                  map the market, and build a launch-ready product roadmap in seconds.
                </p>
              </motion.div>
            )}

            {/* ── Input Card ── */}
            <div className="max-w-3xl mx-auto mb-12">
              <InputForm onSubmit={handleAnalyzeSubmit} loading={loading} error={error} />
            </div>

            {/* ── Agent Flow Visualization ── */}
            {(loading || data) && (
              <div className="max-w-5xl mx-auto mb-10">
                <AgentFlow stage={stage} isLoading={loading} />
              </div>
            )}

            {/* ── Loading skeleton ── */}
            {loading && (
              <div className="mt-10 max-w-5xl mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-block px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/5 mb-4">
                    <p className="text-xs font-bold animate-pulse uppercase tracking-widest text-indigo-500">
                      Processing Neural Intelligence...
                    </p>
                  </div>
                  <p className="text-sm font-medium text-slate-400">
                    Our agents are synthesizing market data and competitive landscapes.
                  </p>
                </div>
                <SkeletonLoader />
              </div>
            )}

            {/* ── Results ── */}
            {!loading && (displayData || data) && (
              <div className="max-w-6xl mx-auto">
                <ResultsSection data={displayData || data} />
              </div>
            )}

            {/* ── Empty state placeholder ── */}
            {!loading && !displayData && !data && !error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-24 text-center"
              >
                <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center text-3xl mb-6 grayscale opacity-50">
                  🚀
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>
                  Awaiting Input Configuration
                </p>
              </motion.div>
            )}
          </div>
        </main>
      </div>

      {/* ── Footer ── */}
      <footer
        className="relative z-10 border-t py-8 text-center theme-transition glass"
        style={{
          borderColor: 'var(--border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            © 2025 Startup AI Simulator — Build with Certainty
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors">Privacy</a>
            <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors">Terms</a>
            <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors">Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
