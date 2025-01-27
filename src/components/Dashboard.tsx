import React, { useState } from 'react';
import { Activity, Settings as SettingsIcon, AlertTriangle, Download } from 'lucide-react';
import { useTargetMetrics } from '../hooks/useNetworkMetrics';
import { useSettings } from '../hooks/useSettings';
import { MetricsChart } from './MetricsChart';
import { MetricsTable } from './MetricsTable';
import { TraceRouteView } from './TraceRouteView';
import { BandwidthMetrics } from './BandwidthMetrics';
import { DNSMetrics } from './DNSMetrics';
import { SettingsModal } from './SettingsModal';
import { ExportFormat, Settings } from '../types/network';

export const Dashboard: React.FC = () => {
  const [target, setTarget] = useState('google.com');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { settings, setSettings } = useSettings();
  const { metrics, traceRoute, bandwidthMetrics, dnsMetrics } = useTargetMetrics(target, settings);

  const handleExport = (format: ExportFormat) => {
    console.log(`Exporting in ${format} format`);
  };

  const handleSettingsSave = (newSettings: Settings) => {
    setSettings(newSettings);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Network Sidekick</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => handleExport('csv')}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </button>
              <button 
                onClick={() => handleExport('image')}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Image
              </button>
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <SettingsIcon className="h-6 w-6 text-gray-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <AlertTriangle className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Target Host Input */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label htmlFor="target" className="block text-sm font-medium text-gray-700">
                Target Host
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="target"
                  id="target"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter hostname or IP address"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Real-time Metrics */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Real-time Metrics</h2>
            </div>
            <MetricsTable data={metrics} />
          </div>

          {/* Network Performance Metrics Graph */}
          <div className="bg-white rounded-lg shadow p-6">
            <MetricsChart data={metrics} title="Network Performance Metrics" />
          </div>

          {/* Bandwidth Metrics */}
          {settings.enabledMetrics.bandwidth && (
            <BandwidthMetrics data={bandwidthMetrics} />
          )}

          {/* Traceroute */}
          {settings.enabledMetrics.traceroute && (
            <TraceRouteView data={traceRoute} />
          )}

          {/* DNS Metrics */}
          {settings.enabledMetrics.dns && (
            <DNSMetrics data={dnsMetrics} />
          )}
        </div>
      </main>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={handleSettingsSave}
      />
    </div>
  );
};