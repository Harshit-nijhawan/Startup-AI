import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Trash2, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { getHistory, deleteAnalysis } from '../api/analyze';

export default function HistorySidebar({ onAnalysisSelect, currentAnalysisId }) {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Load history on mount
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getHistory();
      if (result.success) {
        setHistoryList(result.data || []);
      } else {
        setError('Failed to load history');
      }
    } catch (err) {
      setError(err.message || 'Error loading history');
      console.error('History load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAnalysis = (analysisId) => {
    onAnalysisSelect(analysisId);
  };

  const handleDeleteAnalysis = async (e, analysisId) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this analysis?')) return;

    setDeletingId(analysisId);
    try {
      const result = await deleteAnalysis(analysisId);
      if (result.success) {
        setHistoryList(historyList.filter(item => item.id !== analysisId));
      } else {
        alert('Failed to delete analysis');
      }
    } catch (err) {
      alert('Error deleting analysis: ' + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <motion.div
      className="h-screen flex flex-col border-r overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border)',
        width: isOpen ? '320px' : '60px',
      }}
      initial={false}
      animate={{ width: isOpen ? 320 : 60 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <History size={20} style={{ color: 'var(--accent)' }} />
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                History
              </h3>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-md hover:opacity-75 transition"
          style={{ color: 'var(--text-muted)' }}
          title={isOpen ? 'Collapse' : 'Expand'}
        >
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {loading && isOpen && (
          <div className="p-4 flex items-center justify-center">
            <Loader2 className="animate-spin" size={20} style={{ color: 'var(--accent)' }} />
          </div>
        )}

        {error && isOpen && (
          <div className="p-4 text-xs" style={{ color: 'var(--text-muted)' }}>
            ❌ {error}
          </div>
        )}

        {!loading && historyList.length === 0 && isOpen && (
          <div className="p-4 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
            No analyses yet.
            <br />
            Start by analyzing an idea!
          </div>
        )}

        {/* History Items */}
        <AnimatePresence>
          {historyList.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => handleSelectAnalysis(item.id)}
              className="w-full text-left p-3 border-b transition-all hover:opacity-80"
              style={{
                backgroundColor:
                  currentAnalysisId === item.id
                    ? 'var(--accent-soft)'
                    : 'transparent',
                borderColor: 'var(--border)',
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              {isOpen ? (
                <>
                  <div
                    className="text-xs font-medium truncate mb-1"
                    style={{ color: 'var(--accent)' }}
                  >
                    {item.idea.substring(0, 40)}
                    {item.idea.length > 40 ? '...' : ''}
                  </div>
                  <div
                    className="text-xs flex items-center justify-between"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <span>₹{item.budget.toLocaleString('en-IN')}</span>
                    <span>{formatDate(item.created_at)}</span>
                  </div>

                  {/* Delete Button */}
                  <motion.button
                    onClick={(e) => handleDeleteAnalysis(e, item.id)}
                    disabled={deletingId === item.id}
                    className="mt-2 w-full py-1 text-xs rounded opacity-70 hover:opacity-100 transition"
                    style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      color: '#ef4444',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {deletingId === item.id ? (
                      <Loader2 size={12} className="inline animate-spin mr-1" />
                    ) : (
                      <Trash2 size={12} className="inline mr-1" />
                    )}
                    Delete
                  </motion.button>
                </>
              ) : (
                <div className="text-xs text-center" style={{ color: 'var(--accent)' }}>
                  {item.id}
                </div>
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Reload Button */}
      {isOpen && (
        <motion.button
          onClick={loadHistory}
          disabled={loading}
          className="m-3 p-2 rounded-lg text-sm font-medium text-white transition-all"
          style={{
            backgroundColor: 'var(--accent)',
            opacity: loading ? 0.6 : 1,
          }}
          whileHover={{ scale: !loading ? 1.02 : 1 }}
          whileTap={{ scale: !loading ? 0.98 : 1 }}
        >
          {loading ? (
            <Loader2 size={16} className="inline animate-spin mr-2" />
          ) : (
            <History size={16} className="inline mr-2" />
          )}
          Refresh
        </motion.button>
      )}
    </motion.div>
  );
}
