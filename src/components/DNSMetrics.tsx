import React from 'react';
import { Database } from 'lucide-react';
import { DNSMetrics as DNSMetricsType } from '../types/network';
import { format } from 'date-fns';

interface DNSMetricsProps {
  data: DNSMetricsType[];
}

export const DNSMetrics: React.FC<DNSMetricsProps> = ({ data }) => {
  const latest = data[data.length - 1];

  if (!latest) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Database className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">DNS Metrics</h2>
        </div>
        <span className="text-sm text-gray-500">
          Last updated: {format(latest.timestamp, 'HH:mm:ss')}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-sm font-medium text-gray-500">Hostname</div>
          <div className="mt-1 text-lg text-gray-900">{latest.hostname}</div>
        </div>

        <div>
          <div className="text-sm font-medium text-gray-500">Resolved IP</div>
          <div className="mt-1 text-lg text-gray-900">{latest.resolvedIP}</div>
        </div>

        <div>
          <div className="text-sm font-medium text-gray-500">Resolution Time</div>
          <div className="mt-1 text-lg text-gray-900">{latest.resolutionTime.toFixed(2)} ms</div>
        </div>
      </div>
    </div>
  );
};