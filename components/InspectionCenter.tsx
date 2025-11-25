
import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  RotateCw, 
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Search
} from 'lucide-react';
import { MOCK_INSPECTIONS } from '../constants';

const InspectionCenter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Breadcrumb */}
      <div className="flex items-center text-xs text-slate-500">
        <span className="hover:text-blue-500 transition-colors cursor-pointer">Inspection Center</span>
        <ChevronRight className="w-3 h-3 mx-2 text-slate-400" />
        <span className="text-slate-700 dark:text-slate-300 font-medium">Instance Inspection</span>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
          {/* Organization Select */}
          <div className="relative">
            <select className="appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 min-w-[140px] transition-colors">
              <option>Organizations</option>
              <option>zhouxinyi</option>
              <option>ligen</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Engine Select */}
          <div className="relative">
            <select className="appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 min-w-[140px] transition-colors">
              <option>All Engine</option>
              <option>MySQL</option>
              <option>PostgreSQL</option>
              <option>DamengDB</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Date Range */}
          <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 transition-colors">
             <span className="mr-2">2025-08-26 17:49:17</span>
             <span className="mx-2 text-slate-400 dark:text-slate-500">→</span>
             <span className="mr-2">2025-11-24 17:49:17</span>
             <Calendar className="w-4 h-4 text-slate-400 ml-2" />
          </div>
        </div>

        <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-blue-900/50">
                Inspection Policy
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-blue-900/50">
                Initiate Inspection
            </button>
            <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
                <RotateCw className="w-4 h-4" />
            </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300">
             <div className="absolute top-4 left-4 flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-green-500" />
                 <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Normal</span>
             </div>
             <div className="text-5xl font-medium text-green-500 mt-6">55</div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300">
             <div className="absolute top-4 left-4 flex items-center gap-2">
                 <AlertTriangle className="w-4 h-4 text-orange-500" />
                 <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Warning</span>
             </div>
             <div className="text-5xl font-medium text-orange-500 mt-6">5</div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300">
             <div className="absolute top-4 left-4 flex items-center gap-2">
                 <Flame className="w-4 h-4 text-red-500" />
                 <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Critical</span>
             </div>
             <div className="text-5xl font-medium text-red-500 mt-6">5</div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6 transition-colors duration-300">
        <div className="mb-6">
             <div className="relative max-w-xs">
                <select className="w-full appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-400 text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <option>Select Cluster</option>
                    <option>willow91</option>
                    <option>ivy97</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
             </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <Th>Cluster</Th>
                <Th>Engine</Th>
                <Th>Status</Th>
                <Th>Health Score</Th>
                <Th>Organization</Th>
                <Th>Start Time</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {MOCK_INSPECTIONS.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="py-4 px-6 text-sm text-slate-700 dark:text-slate-300">{item.cluster}</td>
                  <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400">{item.engine}</td>
                  <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400">{item.status}</td>
                  <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400">{item.healthScore}</td>
                  <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400">{item.organization}</td>
                  <td className="py-4 px-6 text-sm text-slate-500">{item.startTime}</td>
                  <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                          <button className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 hover:underline">Task</button>
                          <button className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 hover:underline">Report</button>
                          <button className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 hover:underline">Start Inspection</button>
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-end">
             <div className="flex gap-1.5">
                <PaginationButton disabled>&lt;</PaginationButton>
                <PaginationButton active>1</PaginationButton>
                <PaginationButton>2</PaginationButton>
                <PaginationButton>3</PaginationButton>
                <PaginationButton>4</PaginationButton>
                <PaginationButton>5</PaginationButton>
                <PaginationButton>6</PaginationButton>
                <PaginationButton>7</PaginationButton>
                <PaginationButton>&gt;</PaginationButton>
             </div>
        </div>
      </div>
    </div>
  );
};

const Th = ({ children }: { children?: React.ReactNode }) => (
  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-slate-900/20">
    {children}
  </th>
);

const PaginationButton = ({ children, active, disabled }: { children?: React.ReactNode, active?: boolean, disabled?: boolean }) => (
  <button 
    disabled={disabled}
    className={`w-8 h-8 flex items-center justify-center rounded border text-xs font-medium transition-colors
      ${active 
        ? 'border-blue-600 bg-blue-600 text-white' 
        : disabled
          ? 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-700 cursor-not-allowed'
          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
      }
    `}
  >
    {children}
  </button>
);

export default InspectionCenter;