import { Sun, Moon, Sparkles, LogOut, User } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full glass theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500
                          flex items-center justify-center shadow-lg shadow-indigo-500/20
                          group-hover:scale-105 transition-transform duration-300">
            <Sparkles size={20} className="text-white fill-white/20" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight leading-tight font-outfit">
              <span className="gradient-text">Startup AI</span>
              <span className="text-slate-900 dark:text-white"> Simulator</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-500">
              Enterprise Intelligence
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">System Online</span>
          </div>

          <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10 hidden md:block mx-1" />

          {/* User Profile */}
          {userEmail && (
            <div className="hidden md:flex items-center gap-3 pl-2">
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[150px]">
                  {userEmail.split('@')[0]}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Standard Plan</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                <User size={16} className="text-slate-600 dark:text-slate-400" />
              </div>
            </div>
          )}

          {/* Controls Container */}
          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={toggle}
              className="w-10 h-10 rounded-2xl flex items-center justify-center
                         bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10
                         hover:border-indigo-500 dark:hover:border-indigo-500/50
                         transition-all duration-300 text-slate-600 dark:text-slate-400"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={handleLogout}
              className="w-10 h-10 rounded-2xl flex items-center justify-center
                         bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10
                         hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500
                         transition-all duration-300 text-slate-600 dark:text-slate-400"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
