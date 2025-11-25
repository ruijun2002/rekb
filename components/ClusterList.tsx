
import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import { MOCK_CLUSTERS } from '../constants';
import { Search, Filter, Plus, RotateCw } from 'lucide-react';

interface ClusterListProps {
  onClusterClick: (id: string) => void;
}

const ClusterList: React.FC<ClusterListProps> = ({ onClusterClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClusters = MOCK_CLUSTERS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.engine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500">
      {/* Controls Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-6 shadow-sm transition-colors duration-300">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search */}
          <div className="relative flex-1 max-w-lg w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text"
              placeholder="Search clusters by name, engine, or ID..." 
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 w-full md:w-auto">
             {/* Filters */}
             <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span>All Types</span>
                    <Filter className="w-3.5 h-3.5" />
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span>All Envs</span>
                    <Filter className="w-3.5 h-3.5" />
                </button>
             </div>

             <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>

             <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
                <RotateCw className="w-4 h-4" />
             </button>

             <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-900/50">
                <Plus className="w-4 h-4" />
                <span>New Cluster</span>
             </button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cluster Name</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Engine / Ver</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Env</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Specs / Storage</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Organization / Created</th>
                <th className="text-right py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredClusters.map((cluster) => (
                <tr key={cluster.id} className="group hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <button 
                        onClick={() => onClusterClick(cluster.id)}
                        className="font-semibold text-slate-900 dark:text-slate-200 text-sm hover:text-blue-600 dark:hover:text-blue-400 text-left"
                      >
                        {cluster.name}
                      </button>
                      <span className="text-xs text-slate-500 mt-0.5 font-mono">{cluster.id}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={cluster.status as any} />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                       <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{cluster.engine}</span>
                       <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600">{cluster.version}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wide">{cluster.architecture}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-slate-500 dark:text-slate-400">{cluster.environment}</span>
                  </td>
                  <td className="py-4 px-6">
                     <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{cluster.specs}</span>
                        <span className="text-xs text-slate-500">{cluster.storage}</span>
                     </div>
                  </td>
                  <td className="py-4 px-6">
                     <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{cluster.organization}</span>
                        <span className="text-xs text-slate-500">{cluster.createdTime}</span>
                     </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button 
                      onClick={() => onClusterClick(cluster.id)}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-500 hover:underline"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredClusters.length === 0 && (
                  <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-500">
                          No clusters found matching your search.
                      </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-between transition-colors duration-300">
            <span className="text-xs text-slate-500">Showing {filteredClusters.length} of {filteredClusters.length} entries</span>
            
            <div className="flex gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs transition-colors">
                    &lt;
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-blue-600 bg-blue-600 text-white text-xs font-medium transition-colors">
                    1
                </button>
                 <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs transition-colors">
                    2
                </button>
                 <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs transition-colors">
                    &gt;
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ClusterList;
