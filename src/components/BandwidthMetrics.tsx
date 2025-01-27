import React from 'react';
import { Wifi } from 'lucide-react';
import { BandwidthMetrics as BandwidthMetricsType } from '../types/network';
import { format } from 'date-fns';

interface BandwidthMetricsProps {
  data: BandwidthMetricsType[];
}

export const BandwidthMetrics: React.FC<BandwidthMetricsProps> = ({ data }) => {
  const latest = data[data.length - 1];

  if (!latest) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Wifi className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Bandwidth Metrics</h2>
        </div>
        <span className="text-sm text-gray-500">
          Last updated: {format(latest.timestamp, 'HH:mm:ss')}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-500">Download Speed</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">
            {latest.download.toFixed(2)} Mbps
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-500">Upload Speed</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">
            {latest.upload.toFixed(2)} Mbps
          </div>
        </div>
      </div>
    </div>
  );
};