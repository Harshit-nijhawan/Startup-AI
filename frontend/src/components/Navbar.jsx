import { Sun, Moon, Sparkles, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <header
      className="glass sticky top-0 z-50 w-full border-b theme-transition"
      style={{
        backgroundColor: isDark ? 'rgba(2, 6, 23, 0.8)' : 'rgba(248, 250, 252, 0.8)',
        borderBottomColor: 'var(--border)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500
                          flex items-center justify-center shadow-glow-purple">
            <Sparkles size={15} className="text-white" />
          </div>
          <span className="font-bold text-base tracking-tight">
            <span className="gradient-text">Startup AI</span>
            <span style={{ color: 'var(--text-primary)' }}> Simulator</span>
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <span
            className="hidden sm:inline-block text-xs font-medium px-2.5 py-1 rounded-full border"
            style={{
              color: 'var(--accent)',
              borderColor: 'var(--accent-soft)',
              background: 'var(--accent-soft)',
            }}
          >
            ✦ From idea to insight in seconds
          </span>

          {/* User Email Display */}
          {userEmail && (
            <span
              className="hidden md:inline-block text-xs font-medium px-2.5 py-1 rounded-full border"
              style={{
                color: 'var(--text-muted)',
                borderColor: 'var(--border)',
                background: 'var(--bg-card)',
              }}
            >
              {userEmail}
            </span>
          )}

          {/* Theme toggle */}
          <button
            id="theme-toggle"
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-xl flex items-center justify-center
                       transition-all duration-200 hover:scale-105 active:scale-95 border"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            {isDark
              ? <Sun size={16} strokeWidth={2} />
              : <Moon size={16} strokeWidth={2} />}
          </button>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            aria-label="Logout"
            className="w-9 h-9 rounded-xl flex items-center justify-center
                       transition-all duration-200 hover:scale-105 active:scale-95 border
                       hover:bg-red-500/20"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            <LogOut size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
}
