
import React from 'react';
import { Cluster } from '../types';
import { CheckCircle2, AlertTriangle, XCircle, Loader2 } from 'lucide-react';

interface StatusBadgeProps {
  status: Cluster['status'];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles = {
    Running: 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20',
    Degraded: 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/20',
    Stopped: 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20',
    Creating: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20',
  };

  const icons = {
    Running: CheckCircle2,
    Degraded: AlertTriangle,
    Stopped: XCircle,
    Creating: Loader2,
  };

  const Icon = icons[status];

  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      <Icon className={`w-3.5 h-3.5 mr-1.5 ${status === 'Creating' ? 'animate-spin' : ''}`} />
      {status === 'Running' ? 'Running' : status === 'Stopped' ? 'Down' : status}
    </div>
  );
};

export default StatusBadge;
