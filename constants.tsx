
import { MenuItem, ClusterInstance, ClusterConnection } from './types';
import { 
  LayoutDashboard, 
  Server, 
  Settings, 
  Database, 
  Bell, 
  ClipboardCheck, 
  Trash2, 
  Globe, 
  FileText, 
  Users, 
  Sliders
} from 'lucide-react';

export const MENU_ITEMS: MenuItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'cluster-mgmt', label: 'Clusters', icon: Server },
  { id: 'params', label: 'Parameters', icon: Sliders },
  { id: 'backups', label: 'Backups', icon: Database },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'inspections', label: 'Inspections', icon: ClipboardCheck },
  { id: 'recycle', label: 'Recycle Bin', icon: Trash2 },
  { id: 'env', label: 'Environments', icon: Globe },
  { id: 'logs', label: 'Audit Logs', icon: FileText },
  { id: 'ops', label: 'Operations', icon: Settings },
  { id: 'users', label: 'Users', icon: Users },
];

export const MOCK_CLUSTERS = [
  {
    id: 'kb-001',
    name: 'mango31', 
    engine: 'MongoDB',
    version: '8.0.8',
    architecture: 'Sharding Cluster',
    status: 'Running',
    environment: 'KB0.9',
    specs: '1C1G',
    storage: '20Gi',
    organization: 'wangyelei',
    createdTime: '2025-11-24 13:12:40',
  },
  {
    id: 'kb-002',
    name: 'laurel36',
    engine: 'PostgreSQL',
    version: '17.5.0',
    architecture: 'Replication',
    status: 'Running',
    environment: 'KB1.0',
    specs: '1C1G',
    storage: '20Gi',
    organization: 'wangyelei',
    createdTime: '2025-11-24 15:49:00',
  },
  {
    id: 'kb-003',
    name: 'analytics-warehouse',
    engine: 'ClickHouse',
    version: '23.3.1',
    architecture: 'Sharded',
    status: 'Running', // Changed from Stopped
    environment: 'Dev',
    specs: '8C32G',
    storage: '2Ti',
    organization: 'data-science',
    createdTime: '1 day ago',
  },
  {
    id: 'kb-004',
    name: 'payment-core',
    engine: 'MySQL',
    version: '8.0.32',
    architecture: 'MGR',
    status: 'Running',
    environment: 'Production',
    specs: '4C8G',
    storage: '100Gi',
    organization: 'fintech',
    createdTime: '2 days ago',
  },
];

export const MOCK_PG_DETAIL = {
  id: 'kb-002',
  name: 'laurel36',
  engine: 'postgresql',
  mode: 'Replication',
  project: 'kubeblocks-cloud-ns',
  storageClass: 'apelocal-rawdisk-xfs',
  version: '17.5.0',
  classStorage: 'General 1C1G / 20Gi',
  deleteProtection: true,
  environment: 'KB1.0',
  createdTime: '2025-11-24 15:49:00',
  topology: {
    clusterName: 'laurel36',
    nodes: [
      { name: 'laure-5f8f56c576-postgresql-0', role: 'primary', status: 'Running', time: 'an hour ago' },
      { name: 'laure-5f8f56c576-postgresql-1', role: 'secondary', status: 'Running', time: 'an hour ago' },
    ]
  },
  instances: [
    {
      id: 'laure-5f8f56c576-postgresql-0',
      role: 'secondary',
      cpuRequest: '1.0C',
      memoryRequest: '1.0Gi',
      storageRequest: '20Gi',
      cpuUsage: 0.6,
      memoryUsage: 10.4,
      storageUsage: 1.1,
      node: 'cn-zhangjiakou.10.13.25.18',
      zone: 'cn-zhangjiakou-c'
    },
    {
      id: 'laure-5f8f56c576-postgresql-1',
      role: 'primary',
      cpuRequest: '1.0C',
      memoryRequest: '1.0Gi',
      storageRequest: '20Gi',
      cpuUsage: 0.8,
      memoryUsage: 13.1,
      storageUsage: 1.3,
      node: 'cn-zhangjiakou.10.13.25.20',
      zone: 'cn-zhangjiakou-c'
    }
  ] as ClusterInstance[],
  connections: [
    {
      addressType: 'Private Endpoint',
      networkType: 'ClusterIP',
      title: 'Server',
      instance: 'laure-5f8f56c576-postgresql-1',
      address: 'laure-5f8f56c576-postgresql-postgresql.kubeblocks-cloud...'
    },
    {
        addressType: 'Public Endpoint',
        networkType: '-',
        title: '-',
        instance: '-',
        address: '-'
      }
  ] as ClusterConnection[]
};

export const MOCK_MONGO_DETAIL = {
  id: 'kb-001',
  name: 'mango31',
  engine: 'mongodb',
  mode: 'Sharding Cluster',
  project: 'kubeblocks-cloud-ns',
  storageClass: 'ape-local-hostpath-sc',
  version: '8.0.8',
  classStorage: 'General 1C1G / 20Gi',
  deleteProtection: false,
  environment: 'KB0.9',
  createdTime: '2025-11-24 13:12:40',
  // Topology logic: Root -> [Groups] -> [Primary -> Secondaries]
  topologyGroups: [
    {
      name: 'mongo-config',
      primary: { name: 'mango-86f59b949c-mongo-config-0', role: 'primary', status: 'Running', time: '4 hours ago' },
      secondaries: [
        { name: 'mango-86f59b949c-mongo-config-1', role: 'secondary', status: 'Running', time: '4 hours ago' },
        { name: 'mango-86f59b949c-mongo-config-2', role: 'secondary', status: 'Running', time: '4 hours ago' },
      ]
    },
    {
      name: 'mongo-shard-h77',
      primary: { name: 'mango-86f59b949c-mongo-shard-h77-0', role: 'primary', status: 'Running', time: '4 hours ago' },
      secondaries: [
         { name: 'mango-86f59b949c-mongo-shard-h77-1', role: 'secondary', status: 'Running', time: '4 hours ago' },
         { name: 'mango-86f59b949c-mongo-shard-h77-2', role: 'secondary', status: 'Running', time: '4 hours ago' },
      ]
    },
    {
      name: 'mongo-shard-t5j',
      primary: { name: 'mango-86f59b949c-mongo-shard-t5j-0', role: 'primary', status: 'Running', time: '4 hours ago' },
      secondaries: [
         { name: 'mango-86f59b949c-mongo-shard-t5j-1', role: 'secondary', status: 'Running', time: '4 hours ago' },
         { name: 'mango-86f59b949c-mongo-shard-t5j-2', role: 'secondary', status: 'Running', time: '4 hours ago' },
      ]
    },
    {
      name: 'mongo-shard-xg4',
      primary: { name: 'mango-86f59b949c-mongo-shard-xg4-0', role: 'primary', status: 'Running', time: '4 hours ago' },
      secondaries: [
         { name: 'mango-86f59b949c-mongo-shard-xg4-1', role: 'secondary', status: 'Running', time: '4 hours ago' },
         { name: 'mango-86f59b949c-mongo-shard-xg4-2', role: 'secondary', status: 'Running', time: '4 hours ago' },
      ]
    }
  ],
  instances: [
    // Config Servers
    { id: 'mango-86f59b949c-mongo-config-server-0', role: 'primary', cpuRequest: '1.0C', memoryRequest: '1.0Gi', storageRequest: '20Gi', cpuUsage: 6.9, memoryUsage: 41.1, storageUsage: 3.1, node: 'cn-zhangjiakou.192.168.0.152', zone: 'cn-zhangjiakou-a' },
    { id: 'mango-86f59b949c-mongo-config-server-1', role: 'secondary', cpuRequest: '1.0C', memoryRequest: '1.0Gi', storageRequest: '20Gi', cpuUsage: 5.1, memoryUsage: 44.9, storageUsage: 2.2, node: 'cn-zhangjiakou.192.168.1.27', zone: 'cn-zhangjiakou-a' },
    { id: 'mango-86f59b949c-mongo-config-server-2', role: 'secondary', cpuRequest: '1.0C', memoryRequest: '1.0Gi', storageRequest: '20Gi', cpuUsage: 5.1, memoryUsage: 34.0, storageUsage: 2.2, node: 'cn-zhangjiakou.192.168.1.28', zone: 'cn-zhangjiakou-a' },
    // Shard h77
    { id: 'mango-86f59b949c-mongo-shard-h77-0', role: 'primary', cpuRequest: '1.0C', memoryRequest: '1.0Gi', storageRequest: '20Gi', cpuUsage: 4.9, memoryUsage: 35.4, storageUsage: 2.9, node: 'cn-zhangjiakou.192.168.1.28', zone: 'cn-zhangjiakou-a' },
    { id: 'mango-86f59b949c-mongo-shard-h77-1', role: 'secondary', cpuRequest: '1.0C', memoryRequest: '1.0Gi', storageRequest: '20Gi', cpuUsage: 4.0, memoryUsage: 33.5, storageUsage: 2.1, node: 'cn-zhangjiakou.192.168.0.202', zone: 'cn-zhangjiakou-a' },
    { id: 'mango-86f59b949c-mongo-shard-h77-2', role: 'secondary', cpuRequest: '1.0C', memoryRequest: '1.0Gi', storageRequest: '20Gi', cpuUsage: 4.1, memoryUsage: 33.6, storageUsage: 2.1, node: 'cn-zhangjiakou.192.168.0.152', zone: 'cn-zhangjiakou-a' },
    // Shard t5j
    { id: 'mango-86f59b949c-mongo-shard-t5j-0', role: 'primary', cpuRequest: '1.0C', memoryRequest: '1.0Gi', storageRequest: '20Gi', cpuUsage: 4.0, memoryUsage: 32.9, storageUsage: 2.9, node: 'cn-zhangjiakou.192.168.0.202', zone: 'cn-zhangjiakou-a' },
    { id: 'mango-86f59b949c-mongo-shard-t5j-1', role: 'secondary', cpuRequest: '1.0C', memoryRequest: '1.0Gi', storageRequest: '20Gi', cpuUsage: 4.1, memoryUsage: 29.9, storageUsage: 2.1, node: 'cn-zhangjiakou.192.168.1.28', zone: 'cn-zhangjiakou-a' },
    { id: 'mango-86f59b949c-mongo-shard-t5j-2', role: 'secondary', cpuRequest: '1.0C', memoryRequest: '1.0Gi', storageRequest: '20Gi', cpuUsage: 4.6, memoryUsage: 36.5, storageUsage: 2.1, node: 'cn-zhangjiakou.192.168.0.153', zone: 'cn-zhangjiakou-a' },
    // Shard xg4
    { id: 'mango-86f59b949c-mongo-shard-xg4-0', role: 'primary', cpuRequest: '1.0C', memoryRequest: '1.0Gi', storageRequest: '20Gi', cpuUsage: 5.6, memoryUsage: 33.8, storageUsage: 2.9, node: 'cn-zhangjiakou.192.168.1.28', zone: 'cn-zhangjiakou-a' },
    { id: 'mango-86f59b949c-mongo-shard-xg4-1', role: 'secondary', cpuRequest: '1.0C', memoryRequest: '1.0Gi', storageRequest: '20Gi', cpuUsage: 4.6, memoryUsage: 28.2, storageUsage: 2.1, node: 'cn-zhangjiakou.192.168.0.153', zone: 'cn-zhangjiakou-a' },
    { id: 'mango-86f59b949c-mongo-shard-xg4-2', role: 'secondary', cpuRequest: '1.0C', memoryRequest: '1.0Gi', storageRequest: '20Gi', cpuUsage: 3.8, memoryUsage: 28.9, storageUsage: 2.1, node: 'cn-zhangjiakou.192.168.0.202', zone: 'cn-zhangjiakou-a' },
  ] as ClusterInstance[],
  connections: [
    {
      addressType: 'Private Endpoint',
      networkType: 'ClusterIP',
      title: 'Mongos',
      instance: 'mango-86f59b949c-mongo-mongos...',
      address: 'mango-86f59b949c-mongo-mongos.kubeblocks-cloud-ns.svc.cluster.local'
    },
    {
        addressType: 'Public Endpoint',
        networkType: '-',
        title: '-',
        instance: '-',
        address: '-'
      }
  ] as ClusterConnection[]
};

export const MOCK_INSPECTIONS = [
  {
    id: 'ins-001',
    cluster: 'willow91',
    engine: 'damengdb',
    status: 'Completed',
    healthScore: 100,
    organization: 'zhouxinyi',
    startTime: '2025-11-24 13:58:00',
  },
  {
    id: 'ins-002',
    cluster: 'ivy97',
    engine: 'damengdb',
    status: 'Completed',
    healthScore: 86,
    organization: 'zhouxinyi',
    startTime: '2025-11-24 13:58:00',
  },
  {
    id: 'ins-003',
    cluster: 'alder45',
    engine: 'mysql',
    status: 'Completed',
    healthScore: 100,
    organization: 'ligen',
    startTime: '2025-11-24 11:00:00',
  },
  {
    id: 'ins-004',
    cluster: 'mango21',
    engine: 'mysql',
    status: 'Completed',
    healthScore: 100,
    organization: 'zhouxinyi',
    startTime: '2025-11-20 13:58:00',
  },
  {
    id: 'ins-005',
    cluster: 'brier83',
    engine: 'mysql',
    status: 'Completed',
    healthScore: 100,
    organization: 'zhouxinyi',
    startTime: '2025-11-20 13:58:00',
  },
  {
    id: 'ins-006',
    cluster: 'rose39',
    engine: 'mysql',
    status: 'Completed',
    healthScore: 100,
    organization: 'zhouxinyi',
    startTime: '2025-11-19 13:58:00',
  },
  {
    id: 'ins-007',
    cluster: 'peanut97',
    engine: 'mysql',
    status: 'Completed',
    healthScore: 100,
    organization: 'zhouxinyi',
    startTime: '2025-11-19 13:58:00',
  },
  {
    id: 'ins-008',
    cluster: 'ivy100',
    engine: 'mysql',
    status: 'Completed',
    healthScore: 100,
    organization: 'zhouxinyi',
    startTime: '2025-11-19 13:58:00',
  },
  {
    id: 'ins-009',
    cluster: 'brier98',
    engine: 'mysql',
    status: 'Completed',
    healthScore: 100,
    organization: 'zhouxinyi',
    startTime: '2025-11-19 13:58:00',
  },
  {
    id: 'ins-010',
    cluster: 'oak13',
    engine: 'mysql',
    status: 'Completed',
    healthScore: 100,
    organization: 'zhouxinyi',
    startTime: '2025-11-18 13:58:00',
  },
];
