
import React, { useState } from 'react';
import { 
  ChevronRight, 
  Database, 
  Edit2, 
  ExternalLink, 
  ChevronDown, 
  Copy, 
  MoreHorizontal,
  Server,
  Activity,
  HardDrive,
  Leaf
} from 'lucide-react';
import { MOCK_PG_DETAIL, MOCK_MONGO_DETAIL } from '../constants';
import StatusBadge from './StatusBadge';

interface ClusterDetailProps {
  clusterId: string;
  onBack: () => void;
}

const ClusterDetail: React.FC<ClusterDetailProps> = ({ clusterId, onBack }) => {
  // Select data based on ID (mock logic)
  const isMongo = clusterId === 'kb-001';
  const data = isMongo ? MOCK_MONGO_DETAIL : MOCK_PG_DETAIL;
  
  // State for instance filtering
  const [instanceFilter, setInstanceFilter] = useState('All');

  // Filter instances logic
  const getFilteredInstances = () => {
    if (!isMongo || instanceFilter === 'All') return data.instances;
    
    return data.instances.filter(inst => {
      if (instanceFilter === 'Config Server') return inst.id.includes('config');
      if (instanceFilter === 'Mongos') return inst.id.includes('mongos');
      if (instanceFilter === 'MongoDB') return inst.id.includes('shard');
      return true;
    });
  };

  const filteredInstances = getFilteredInstances();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-10">
      {/* Breadcrumb */}
      <div className="flex items-center text-xs text-slate-500">
        <button onClick={onBack} className="hover:text-blue-500 transition-colors">Cluster</button>
        <ChevronRight className="w-3 h-3 mx-2 text-slate-400" />
        <span className="text-slate-700 dark:text-slate-300 font-medium">{data.name}</span>
        <ChevronRight className="w-3 h-3 mx-2 text-slate-400" />
        <span>Overview</span>
      </div>

      {/* Header Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm transition-colors duration-300">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${isMongo ? 'bg-green-50 dark:bg-green-500/10 border-green-100 dark:border-green-500/20 text-green-600 dark:text-green-500' : 'bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-500'}`}>
              {isMongo ? <Leaf className="w-7 h-7" /> : <Database className="w-7 h-7" />}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">{data.name}</h1>
                <button className="text-slate-400 hover:text-blue-500 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="text-slate-400 hover:text-blue-500 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-1">
                 <span className="w-2 h-2 rounded-full bg-green-500"></span>
                 <span className="text-sm text-green-600 dark:text-green-400 font-medium">Running</span>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            Actions
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Basic Info Grid */}
        <div className="mt-8">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
            <InfoItem label="Name" value={data.name} icon={<Copy className="w-3 h-3 text-slate-400" />} />
            <InfoItem label="Engine" value={data.engine} valueClassName="uppercase font-semibold" />
            <InfoItem label="Version" value={data.version} />
            
            <InfoItem label="Mode" value={data.mode} />
            <InfoItem label="Class/Storage" value={data.classStorage} />
            <InfoItem label="Environment" value={data.environment} />
            
            <InfoItem label="Project" value={data.project} />
            <div className="flex flex-col gap-1">
              <span className="text-xs text-slate-500 font-medium">Delete Protection</span>
              <div className={`relative inline-flex h-5 w-9 items-center rounded-full cursor-pointer ${data.deleteProtection ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'}`}>
                <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition ${data.deleteProtection ? 'translate-x-4.5' : 'translate-x-1'}`} style={{ transform: data.deleteProtection ? 'translateX(20px)' : 'translateX(2px)' }}/>
              </div>
            </div>
            <InfoItem label="Created Time" value={data.createdTime} />
            
            <InfoItem label="Storage Class" value={data.storageClass} />
          </div>
        </div>
      </div>

      {/* Topology */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm overflow-x-auto transition-colors duration-300">
        <div className="flex items-center justify-between mb-6">
           <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Topology</h3>
           <span className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded border border-blue-100 dark:border-blue-500/20 font-mono">
             cn-zhangjiakou-a
           </span>
        </div>
        
        {isMongo ? (
          <MongoTopology groups={(data as any).topologyGroups} />
        ) : (
          <PgTopology topology={(data as any).topology} />
        )}
      </div>

      {/* Instances Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-colors duration-300">
         <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Instances</h3>
            
            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-2">
               {isMongo ? (
                 <>
                   <ActionButton label="Switchover" />
                   <ActionButton label="Volume Expansion" />
                   <ActionButton label="Vertical Scaling" />
                   <ActionButton label="Replica Scaling" />
                   <ActionButton label="Restart" />
                 </>
               ) : (
                 <>
                   <ActionButton label="Switchover" />
                   <ActionButton label="Volume Expansion" />
                   <ActionButton label="Vertical Scaling" />
                   <ActionButton label="Replica Scaling" />
                   <ActionButton label="Restart" />
                   <div className="ml-2 px-3 py-1.5 border border-slate-200 dark:border-slate-600 rounded-md text-sm font-medium text-slate-500 dark:text-slate-400">
                     Server
                   </div>
                 </>
               )}
            </div>
            
            {/* Filter Toggles (Mongo Specific) */}
            {isMongo && (
              <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                <FilterToggle label="MongoDB" active={instanceFilter === 'MongoDB'} onClick={() => setInstanceFilter('MongoDB')} />
                <FilterToggle label="Config Server" active={instanceFilter === 'Config Server'} onClick={() => setInstanceFilter('Config Server')} />
                <FilterToggle label="Mongos" active={instanceFilter === 'Mongos'} onClick={() => setInstanceFilter('Mongos')} />
              </div>
            )}
         </div>

         <div className="overflow-x-auto">
           <table className="w-full">
             <thead className="bg-slate-50 dark:bg-slate-900/50">
               <tr>
                 <Th>Instance</Th>
                 <Th>Role</Th>
                 <Th>CPU/Memory</Th>
                 <Th>Storage</Th>
                 <Th>CPU Usage</Th>
                 <Th>Memory Usage</Th>
                 <Th>Storage Usage</Th>
                 <Th>Node</Th>
                 <Th>Zone</Th>
                 <Th>Action</Th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
               {filteredInstances.map((inst) => (
                 <tr key={inst.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                   <td className="py-4 px-6">
                     <div className="flex items-center gap-2">
                       <span className="text-sm text-slate-700 dark:text-slate-300 font-medium truncate max-w-[200px]" title={inst.id}>{inst.id}</span>
                       <Copy className="w-3 h-3 text-slate-400 dark:text-slate-500 cursor-pointer hover:text-blue-500" />
                       <ExternalLink className="w-3 h-3 text-slate-400 dark:text-slate-500 cursor-pointer hover:text-blue-500" />
                     </div>
                   </td>
                   <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{inst.role}</td>
                   <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400 font-mono">{inst.cpuRequest}/{inst.memoryRequest}</td>
                   <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400 font-mono">{inst.storageRequest}</td>
                   
                   <td className="py-4 px-6"><ProgressBar value={inst.cpuUsage} /></td>
                   <td className="py-4 px-6"><ProgressBar value={inst.memoryUsage} /></td>
                   <td className="py-4 px-6"><ProgressBar value={inst.storageUsage} /></td>

                   <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                         {inst.node}
                         <Copy className="w-3 h-3 text-slate-400 cursor-pointer hover:text-blue-500" />
                      </div>
                   </td>
                   <td className="py-4 px-6 text-sm text-slate-500">{inst.zone}</td>
                   <td className="py-4 px-6 text-center">
                     <button className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">
                       <MoreHorizontal className="w-4 h-4" />
                     </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
      </div>

      {/* Connection Info */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-colors duration-300">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Connection Information</h3>
             {isMongo ? (
               <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-600 rounded-md text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800">
                 Mongos
               </button>
             ) : (
                <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-600 rounded-md text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800">
                 Server
               </button>
             )}
        </div>
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-900/50">
                    <tr>
                        <Th>Address Type</Th>
                        <Th>Network Type</Th>
                        <Th>Title</Th>
                        <Th>Instance</Th>
                        <Th>Connection Address</Th>
                        <Th>Action</Th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {data.connections.map((conn, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                            <td className="py-4 px-6 text-sm text-slate-700 dark:text-slate-300">{conn.addressType}</td>
                            <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400">{conn.networkType}</td>
                            <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400">{conn.title}</td>
                            <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400 truncate max-w-[200px]">{conn.instance}</td>
                            <td className="py-4 px-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-[300px]" title={conn.address}>{conn.address}</span>
                                    {conn.address !== '-' && <Copy className="w-3 h-3 text-slate-400 cursor-pointer hover:text-blue-500" />}
                                </div>
                            </td>
                            <td className="py-4 px-6 text-center">
                                {conn.address !== '-' ? (
                                    <button className="w-8 h-4 bg-slate-200 dark:bg-slate-600 rounded-full relative transition-colors hover:bg-slate-300 dark:hover:bg-slate-500">
                                        <span className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm"></span>
                                    </button>
                                ) : (
                                    <button className="w-8 h-4 bg-slate-100 dark:bg-slate-700 rounded-full relative opacity-50 cursor-not-allowed">
                                         <span className="absolute left-0.5 top-0.5 w-3 h-3 bg-slate-300 dark:bg-slate-500 rounded-full shadow-sm"></span>
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const InfoItem = ({ label, value, icon, valueClassName = '' }: { label: string, value: string, icon?: React.ReactNode, valueClassName?: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-slate-500 font-medium">{label}</span>
    <div className="flex items-center gap-1.5">
      <span className={`text-sm text-slate-800 dark:text-slate-200 ${valueClassName}`}>{value}</span>
      {icon}
    </div>
  </div>
);

const ProgressBar = ({ value }: { value: number }) => (
  <div className="flex items-center gap-2 w-32">
    <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
      <div 
        className={`h-full rounded-full ${value > 80 ? 'bg-red-500' : value > 60 ? 'bg-yellow-500' : 'bg-green-500'}`} 
        style={{ width: `${value}%` }}
      />
    </div>
    <span className="text-xs text-slate-500 font-mono w-8 text-right">{value}%</span>
  </div>
);

const Th = ({ children }: { children?: React.ReactNode }) => (
  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{children}</th>
);

const ActionButton = ({ label }: { label: string }) => (
  <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 transition-colors shadow-sm">
    {label}
  </button>
);

const FilterToggle = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${active ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-600' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
  >
    {label}
  </button>
);

// --- Visualizations ---

const MongoTopology = ({ groups }: { groups: any[] }) => {
  return (
    <div className="flex items-start py-8 px-4 overflow-x-auto min-w-[800px]">
       {/* Root Node */}
       <div className="flex flex-col justify-center mr-16 relative top-24">
         <div className="w-24 h-24 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg flex flex-col items-center justify-center relative z-10 shadow-sm">
             <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-500 mb-2 border border-green-100 dark:border-green-500/20">
                <Leaf className="w-6 h-6" />
             </div>
             <span className="text-xs font-semibold text-green-600 dark:text-green-400">Running</span>
             {/* Main outgoing connector */}
             <div className="absolute top-1/2 left-full w-8 h-0.5 bg-slate-300 dark:bg-slate-600"></div>
             <div className="absolute w-2 h-2 rounded-full bg-green-500 -right-1 top-2"></div>
         </div>
       </div>

       {/* Branching Lines Container (Visual Only) */}
       <div className="relative w-8 mr-8">
          {/* Vertical spine */}
           <div className="absolute left-0 top-12 bottom-12 w-0.5 bg-slate-300 dark:bg-slate-600"></div>
       </div>

       {/* Groups Column */}
       <div className="flex flex-col gap-8 flex-1">
          {groups.map((group, idx) => (
            <div key={idx} className="flex items-center relative">
               {/* Connector from spine to group */}
               <div className="absolute -left-16 w-16 h-0.5 bg-slate-300 dark:bg-slate-600 top-1/2 -translate-y-1/2"></div>
               {/* Curve fix for spine connection */}
               <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>

               {/* Group Box */}
               <div className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-blue-500/10 rounded-xl p-4 flex items-center gap-8 shadow-sm">
                   {/* Primary Node */}
                   <div className="w-64 bg-white dark:bg-blue-500/5 rounded-lg p-3 border border-slate-200 dark:border-blue-500/10 relative shadow-sm dark:shadow-none">
                       <div className="text-xs font-bold text-slate-800 dark:text-slate-300 mb-2 truncate" title={group.primary.name}>{group.primary.name}</div>
                       <div className="flex items-center justify-between">
                           <span className="text-[10px] text-slate-500">{group.primary.time}</span>
                           <span className="text-[10px] bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded-full flex items-center gap-1 border border-green-100 dark:border-green-500/10">
                               <span className="w-1 h-1 rounded-full bg-green-500"></span>
                               primary
                           </span>
                       </div>
                       <div className="mt-2 flex items-center gap-1 text-[10px] text-green-600 dark:text-green-500 font-medium">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                           Running
                       </div>

                       {/* Connector to Secondaries */}
                       <div className="absolute top-1/2 -right-4 w-4 h-0.5 bg-blue-200 dark:bg-blue-500/20"></div>
                   </div>

                   {/* Secondaries Stack */}
                   <div className="flex flex-col gap-3 relative">
                       {/* Bracket for secondaries */}
                       <div className="absolute -left-4 top-4 bottom-4 w-4 border-l-2 border-blue-200 dark:border-blue-500/20 rounded-l-sm"></div>

                       {group.secondaries.map((sec: any, sIdx: number) => (
                           <div key={sIdx} className="w-64 bg-white dark:bg-slate-900/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700 relative shadow-sm dark:shadow-none">
                                <div className="text-xs font-bold text-slate-700 dark:text-slate-400 mb-2 truncate" title={sec.name}>{sec.name}</div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-slate-500 dark:text-slate-600">{sec.time}</span>
                                    <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded-full">secondary</span>
                                </div>
                                <div className="mt-2 flex items-center gap-1 text-[10px] text-green-600 dark:text-green-500 font-medium">
                                   <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                   Running
                                </div>
                                {/* Connector line */}
                                <div className="absolute top-1/2 -left-4 w-4 h-0.5 bg-blue-200 dark:bg-blue-500/20"></div>
                           </div>
                       ))}
                   </div>
               </div>
            </div>
          ))}
       </div>
    </div>
  );
};

const PgTopology = ({ topology }: { topology: any }) => {
  return (
    <div className="flex items-center py-8 px-4 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-[150px]">
            <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-lg flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 relative shadow-sm">
                 <div className="w-2 h-2 rounded-full bg-green-500 absolute top-1 right-1"></div>
                 <Server className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                 <span className="text-[10px] text-green-600 dark:text-green-500 font-medium mt-1">Running</span>
            </div>
        </div>

        <div className="w-16 h-0.5 bg-slate-300 dark:bg-slate-600"></div>

        <div className="flex gap-4">
             {topology.nodes.map((node: any, idx: number) => (
                 <React.Fragment key={idx}>
                     <div className="bg-white dark:bg-blue-500/5 border border-slate-200 dark:border-blue-500/10 rounded-lg p-3 w-64 shadow-sm relative">
                         <div className="flex items-center justify-between mb-2">
                             <div className="font-bold text-xs text-slate-800 dark:text-slate-300 truncate flex-1 mr-2" title={node.name}>{node.name}</div>
                             <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${node.role === 'primary' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                                 {node.role}
                             </span>
                         </div>
                         <div className="flex items-center justify-between mt-3 text-[10px] text-slate-500">
                             <span>{node.time}</span>
                             <div className="flex items-center gap-1 text-green-600 dark:text-green-500 font-medium">
                                 <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                 Running
                             </div>
                         </div>
                     </div>
                     {idx < topology.nodes.length - 1 && (
                         <div className="flex items-center">
                            <div className="w-8 h-0.5 bg-slate-300 dark:bg-slate-600"></div>
                         </div>
                     )}
                 </React.Fragment>
             ))}
        </div>
    </div>
  )
}

export default ClusterDetail;