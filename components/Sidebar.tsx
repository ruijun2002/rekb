
import React from 'react';
import { MENU_ITEMS } from '../constants';
import { FileText, Download } from 'lucide-react';

interface SidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeId, onNavigate }) => {
  return (
    <div className="w-64 bg-white dark:bg-slate-900 h-screen fixed left-0 top-0 border-r border-slate-200 dark:border-slate-800 flex flex-col z-20 transition-colors duration-300">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
           {/* Replaced Icon with a generic Cube to match KubeBlocks theme but keeping layout of SLA Guardian */}
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <span className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">KubeBlocks</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
        {MENU_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
              }}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors relative group
                ${
                  isActive
                    ? 'text-blue-600 dark:text-white bg-blue-50 dark:bg-slate-800'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
              )}
              <item.icon
                className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600 dark:text-blue-500' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`}
              />
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Bottom CTA Widget */}
      <div className="p-4 m-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-white shadow-lg dark:shadow-black/20 border border-blue-500/20">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 bg-blue-500/30 rounded-lg">
               <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium bg-blue-500/30 px-2 py-0.5 rounded text-blue-100">New</span>
          </div>
          <h3 className="text-sm font-bold mb-1">Monthly Operations</h3>
          <p className="text-xs text-blue-100 mb-4 leading-relaxed">
            Your monthly cluster usage report is ready for download.
          </p>
          <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center transition-colors">
            <Download className="w-3 h-3 mr-2" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;