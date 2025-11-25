import React from 'react';

export interface Cluster {
  id: string;
  name: string;
  engine: string;
  version: string;
  architecture: string; // e.g., "Real-time Primary" (实时主备)
  status: 'Running' | 'Degraded' | 'Stopped' | 'Creating';
  environment: string; // e.g., "KB1.0"
  specs: string; // e.g., "1C2G"
  storage: string; // e.g., "200Gi"
  organization: string; // e.g., "wangyelei"
  createdTime: string; // e.g., "3 hours ago"
}

export interface ClusterInstance {
  id: string;
  role: 'primary' | 'secondary' | 'leader' | 'follower';
  cpuRequest: string;
  memoryRequest: string;
  storageRequest: string;
  cpuUsage: number; // percentage
  memoryUsage: number; // percentage
  storageUsage: number; // percentage
  node: string;
  zone: string;
}

export interface ClusterConnection {
  addressType: string;
  networkType: string;
  title: string;
  instance: string;
  address: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  active?: boolean;
}