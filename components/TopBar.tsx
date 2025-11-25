
import React from 'react';
import { Bell, User, Sun, Moon } from 'lucide-react';

interface TopBarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-8 sticky top-0 z-10 transition-colors duration-300">
      <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Cluster List</h1>
      
      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Last updated: 16:10:00</span>
        
        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>

        <button 
          onClick={toggleTheme}
          className="p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden md:block">
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">admin</div>
                <div className="text-xs text-slate-500">Orgadmin</div>
            </div>
            <div className="w-9 h-9 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                <User className="w-5 h-5" />
            </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;