import { useState, useEffect } from 'react';
import { Settings, AlertThreshold } from '../types/network';

const DEFAULT_THRESHOLDS: AlertThreshold = {
  latency: 100,
  packetLoss: 2,
  jitter: 30,
  download: 10,
  upload: 5,
  dnsResolution: 100,
};

const DEFAULT_SETTINGS: Settings = {
  refreshInterval: 1000,
  thresholds: DEFAULT_THRESHOLDS,
  enabledMetrics: {
    bandwidth: true,
    dns: true,
    traceroute: true,
    heatmap: false, // Disabled by default now
  },
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(() => {
    const stored = localStorage.getItem('network-sidekick-settings');
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('network-sidekick-settings', JSON.stringify(settings));
  }, [settings]);

  return {
    settings,
    setSettings,
    resetSettings: () => setSettings(DEFAULT_SETTINGS),
  };
};