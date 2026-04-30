import { useState } from 'react';
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
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    >
      <div className="grid-bg absolute inset-0" />
      {/* Radial gradient blob – top left */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
      />
      {/* Radial gradient blob – bottom right */}
      <div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-15"
        style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }}
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
      className="relative min-h-screen theme-transition flex flex-col"
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-20">
            {/* Hero headline - only show when no data */}
            {!displayData && !data && (
              <div className="text-center mb-10">
                <div
                  className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5
                            rounded-full border mb-4"
                  style={{
                    background: 'var(--accent-soft)',
                    borderColor: 'var(--border)',
                    color: 'var(--accent)',
                  }}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
                  </span>
                  ⚡ 3 AI Agents · Real Insights · Zero Guesswork
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
                  <span className="gradient-text">Validate your startup</span>
                  <br />
                  <span style={{ color: 'var(--text-primary)' }}>before you build it.</span>
                </h1>

                <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
                  Three specialized AI agents analyze your idea—researching the market,
                  planning the product, and critiquing the risks in seconds.
                </p>
              </div>
            )}

            {/* ── Input Card ── */}
            <div className="max-w-2xl mx-auto mb-6">
              <InputForm onSubmit={handleAnalyzeSubmit} loading={loading} error={error} />
            </div>

            {/* ── Agent Flow Visualization ── */}
            {(loading || data) && (
              <div className="max-w-4xl mx-auto mb-6">
                <AgentFlow stage={stage} isLoading={loading} />
              </div>
            )}

            {/* ── Loading skeleton ── */}
            {loading && (
              <div className="mt-6">
                <div className="text-center mb-4">
                  <p
                    className="text-sm font-medium animate-pulse"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    🤖 AI agents are working — this may take 20–40 seconds...
                  </p>
                </div>
                <SkeletonLoader />
              </div>
            )}

            {/* ── Results ── */}
            {!loading && (displayData || data) && (
              <ResultsSection data={displayData || data} />
            )}

            {/* ── Empty state placeholder ── */}
            {!loading && !displayData && !data && !error && (
              <div className="mt-16 text-center opacity-40">
                <div className="text-5xl mb-3">🚀</div>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Your analysis results will appear here.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── Footer ── */}
      <footer
        className="relative z-10 border-t py-6 text-center text-xs theme-transition"
        style={{
          borderColor: 'var(--border)',
          color: 'var(--text-muted)',
        }}
      >
        Stop guessing. Start building. — Startup AI Simulator © 2025
      </footer>
    </div>
  );
}
