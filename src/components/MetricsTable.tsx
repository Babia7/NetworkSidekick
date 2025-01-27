import React from 'react';
import { NetworkMetrics } from '../types/network';
import { format } from 'date-fns';

interface MetricsTableProps {
  data: NetworkMetrics[];
}

export const MetricsTable: React.FC<MetricsTableProps> = ({ data }) => {
  const latestMetric = data[data.length - 1];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Latency</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {latestMetric?.latency.toFixed(2)} ms
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                latestMetric?.latency > 100 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                {latestMetric?.latency > 100 ? 'High' : 'Normal'}
              </span>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Packet Loss</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {latestMetric?.packetLoss.toFixed(2)}%
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                latestMetric?.packetLoss > 2 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                {latestMetric?.packetLoss > 2 ? 'High' : 'Normal'}
              </span>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jitter</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {latestMetric?.jitter.toFixed(2)} ms
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                latestMetric?.jitter > 30 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                {latestMetric?.jitter > 30 ? 'High' : 'Normal'}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};