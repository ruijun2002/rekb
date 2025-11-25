
import React from 'react';
import { Server, Globe, Users, Database, Activity, Box, Layers, Archive, FileJson } from 'lucide-react';

const Overview: React.FC = () => {
  // Mock Data
  const stats = [
    {
      label: 'Clusters',
      value: 20,
      icon: Server,
      color: 'text-orange-500',
      stroke: '#F97316', // orange-500
      data: [10, 12, 11, 14, 12, 16, 15, 20, 18, 22, 20, 24, 20],
    },
    {
      label: 'Environments',
      value: 3,
      icon: Globe,
      color: 'text-green-500',
      stroke: '#22C55E', // green-500
      data: [1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3],
    },
    {
      label: 'Organizations',
      value: 54,
      icon: Users,
      color: 'text-blue-500',
      stroke: '#3B82F6', // blue-500
      data: [20, 25, 22, 30, 28, 45, 30, 50, 20, 25, 22, 54, 30],
    },
  ];

  const engines = [
    { name: 'Elasticsearch', count: 6, normal: 5, abnormal: 1, icon: SearchIcon },
    { name: 'PostgreSQL', count: 4, normal: 4, abnormal: 0, icon: Database },
    { name: 'DamengDB', count: 3, normal: 3, abnormal: 0, icon: Database },
    { name: 'MySQL', count: 2, normal: 2, abnormal: 0, icon: Database },
    { name: 'ClickHouse', count: 1, normal: 1, abnormal: 0, icon: Activity },
    { name: 'Kafka', count: 1, normal: 1, abnormal: 0, icon: Box },
    { name: 'MongoDB', count: 1, normal: 1, abnormal: 0, icon: FileJson },
    { name: 'OceanBase', count: 1, normal: 1, abnormal: 0, icon: Layers },
    { name: 'StarRocks', count: 1, normal: 1, abnormal: 0, icon: Archive },
  ];

  return (
    <div className="space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm flex flex-col justify-between h-40 relative overflow-hidden group hover:border-blue-500/50 transition-colors duration-300">
            <div className="flex items-start justify-between z-10">
              <div>
                <div className={`flex items-center gap-2 mb-2 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{stat.label}</span>
                </div>
                <div className="text-4xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</div>
              </div>
            </div>
            
            {/* Simple SVG Sparkline */}
            <div className="absolute bottom-0 right-0 left-0 h-16 opacity-20 group-hover:opacity-30 transition-opacity">
               <svg viewBox="0 0 100 20" className="w-full h-full" preserveAspectRatio="none">
                 <path
                   d={`M0 20 ${stat.data.map((v, i) => `L${(i / (stat.data.length - 1)) * 100} ${20 - (v / Math.max(...stat.data)) * 15}`).join(' ')} L100 20 Z`}
                   fill={stat.stroke}
                   stroke="none"
                 />
                 <path
                   d={`M0 ${20 - (stat.data[0] / Math.max(...stat.data)) * 15} ${stat.data.map((v, i) => `L${(i / (stat.data.length - 1)) * 100} ${20 - (v / Math.max(...stat.data)) * 15}`).join(' ')}`}
                   fill="none"
                   stroke={stat.stroke}
                   strokeWidth="2"
                   vectorEffect="non-scaling-stroke"
                 />
               </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Engine Status Grid */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Clusters by Engine</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {engines.map((engine, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-all hover:bg-slate-50 dark:hover:bg-slate-750 duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600">
                  <engine.icon className="w-5 h-5" />
                </div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{engine.name}</span>
              </div>
              
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{engine.count}</div>
                <div className="flex flex-col items-end gap-1 mb-1">
                   {engine.abnormal > 0 && (
                     <div className="flex items-center gap-1.5 text-xs font-medium text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-full border border-red-100 dark:border-red-500/20">
                       <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                       Abnormal {engine.abnormal}
                     </div>
                   )}
                   <div className="flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-full border border-green-100 dark:border-green-500/20">
                     <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                     Normal {engine.normal}
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper component for Search Icon since it's used in mock data
const SearchIcon = (props: any) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export default Overview;