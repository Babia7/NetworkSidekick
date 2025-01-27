import React from 'react';
import { X } from 'lucide-react';
import { Settings } from '../types/network';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSave: (settings: Settings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const newSettings: Settings = {
      refreshInterval: Number(formData.get('refreshInterval')),
      thresholds: {
        latency: Number(formData.get('latencyThreshold')),
        packetLoss: Number(formData.get('packetLossThreshold')),
        jitter: Number(formData.get('jitterThreshold')),
        download: Number(formData.get('downloadThreshold')),
        upload: Number(formData.get('uploadThreshold')),
        dnsResolution: Number(formData.get('dnsThreshold')),
      },
      enabledMetrics: {
        bandwidth: formData.get('enableBandwidth') === 'on',
        dns: formData.get('enableDNS') === 'on',
        traceroute: formData.get('enableTraceroute') === 'on',
        heatmap: formData.get('enableHeatmap') === 'on',
      },
    };

    onSave(newSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Refresh Rate</h3>
              <select
                name="refreshInterval"
                defaultValue={settings.refreshInterval}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value={1000}>1 second</option>
                <option value={5000}>5 seconds</option>
                <option value={10000}>10 seconds</option>
              </select>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Alert Thresholds</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Latency (ms)
                  </label>
                  <input
                    type="number"
                    name="latencyThreshold"
                    defaultValue={settings.thresholds.latency}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Packet Loss (%)
                  </label>
                  <input
                    type="number"
                    name="packetLossThreshold"
                    defaultValue={settings.thresholds.packetLoss}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Jitter (ms)
                  </label>
                  <input
                    type="number"
                    name="jitterThreshold"
                    defaultValue={settings.thresholds.jitter}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Download Speed (Mbps)
                  </label>
                  <input
                    type="number"
                    name="downloadThreshold"
                    defaultValue={settings.thresholds.download}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Speed (Mbps)
                  </label>
                  <input
                    type="number"
                    name="uploadThreshold"
                    defaultValue={settings.thresholds.upload}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    DNS Resolution (ms)
                  </label>
                  <input
                    type="number"
                    name="dnsThreshold"
                    defaultValue={settings.thresholds.dnsResolution}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Enabled Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="enableBandwidth"
                    defaultChecked={settings.enabledMetrics.bandwidth}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Bandwidth Monitoring
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="enableDNS"
                    defaultChecked={settings.enabledMetrics.dns}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    DNS Resolution
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="enableTraceroute"
                    defaultChecked={settings.enabledMetrics.traceroute}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Traceroute
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="enableHeatmap"
                    defaultChecked={settings.enabledMetrics.heatmap}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Latency Heatmap
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};