import React from 'react';
import { Network } from 'lucide-react';
import { TraceRoute } from '../types/network';
import { format } from 'date-fns';

interface TraceRouteViewProps {
  data: TraceRoute | null;
}

export const TraceRouteView: React.FC<TraceRouteViewProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Network className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Traceroute to {data.target}</h2>
        </div>
        <span className="text-sm text-gray-500">
          Last updated: {format(data.timestamp, 'HH:mm:ss')}
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hop</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostname</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Packet Loss</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jitter</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.hops.map((hop) => (
              <tr key={hop.hopNumber}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {hop.hopNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {hop.ipAddress}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {hop.hostname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {hop.latency.toFixed(2)} ms
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {hop.packetLoss.toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {hop.jitter.toFixed(2)} ms
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};