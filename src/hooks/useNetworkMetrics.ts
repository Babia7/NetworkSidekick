import { useState, useEffect } from 'react';
import { NetworkMetrics, HopMetrics, TraceRoute, BandwidthMetrics, DNSMetrics } from '../types/network';

const MOCK_LATENCY_RANGE = { min: 20, max: 150 };
const MOCK_PACKET_LOSS_RANGE = { min: 0, max: 5 };
const MOCK_JITTER_RANGE = { min: 5, max: 40 };
const MOCK_BANDWIDTH_RANGE = { min: 5, max: 100 };

const generateMockMetric = (): NetworkMetrics => ({
  latency: Math.random() * (MOCK_LATENCY_RANGE.max - MOCK_LATENCY_RANGE.min) + MOCK_LATENCY_RANGE.min,
  packetLoss: Math.random() * (MOCK_PACKET_LOSS_RANGE.max - MOCK_PACKET_LOSS_RANGE.min),
  jitter: Math.random() * (MOCK_JITTER_RANGE.max - MOCK_JITTER_RANGE.min) + MOCK_JITTER_RANGE.min,
  timestamp: Date.now(),
});

const generateMockBandwidth = (): BandwidthMetrics => ({
  download: Math.random() * (MOCK_BANDWIDTH_RANGE.max - MOCK_BANDWIDTH_RANGE.min) + MOCK_BANDWIDTH_RANGE.min,
  upload: Math.random() * (MOCK_BANDWIDTH_RANGE.max - MOCK_BANDWIDTH_RANGE.min) + MOCK_BANDWIDTH_RANGE.min,
  timestamp: Date.now(),
});

const generateMockDNS = (hostname: string): DNSMetrics => ({
  hostname,
  resolvedIP: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
  resolutionTime: Math.random() * 100,
  timestamp: Date.now(),
});

const generateMockHop = (hopNumber: number): HopMetrics => ({
  ...generateMockMetric(),
  hopNumber,
  ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
  hostname: `hop-${hopNumber}.example.com`,
});

export const useNetworkMetrics = (refreshInterval: number = 1000) => {
  const [metrics, setMetrics] = useState<NetworkMetrics[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(current => [...current, generateMockMetric()].slice(-100));
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  return metrics;
};

export const useBandwidthMetrics = (refreshInterval: number = 1000) => {
  const [metrics, setMetrics] = useState<BandwidthMetrics[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(current => [...current, generateMockBandwidth()].slice(-100));
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  return metrics;
};

export const useDNSMetrics = (hostname: string, refreshInterval: number = 1000) => {
  const [metrics, setMetrics] = useState<DNSMetrics[]>([]);

  useEffect(() => {
    if (!hostname) return;

    const interval = setInterval(() => {
      setMetrics(current => [...current, generateMockDNS(hostname)].slice(-100));
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [hostname, refreshInterval]);

  return metrics;
};

export const useTraceRoute = (target: string, refreshInterval: number = 5000) => {
  const [traceRoute, setTraceRoute] = useState<TraceRoute | null>(null);

  useEffect(() => {
    if (!target) return;

    const generateTrace = () => {
      const numHops = Math.floor(Math.random() * 5) + 3; // 3-7 hops
      const hops: HopMetrics[] = Array.from({ length: numHops }, (_, i) => generateMockHop(i + 1));
      
      setTraceRoute({
        target,
        hops,
        timestamp: Date.now(),
      });
    };

    generateTrace();
    const interval = setInterval(generateTrace, refreshInterval);

    return () => clearInterval(interval);
  }, [target, refreshInterval]);

  return traceRoute;
};

export const useTargetMetrics = (target: string, settings: Settings) => {
  const metrics = useNetworkMetrics(settings.refreshInterval);
  const traceRoute = useTraceRoute(target, settings.refreshInterval);
  const bandwidthMetrics = useBandwidthMetrics(settings.refreshInterval);
  const dnsMetrics = useDNSMetrics(target, settings.refreshInterval);

  return {
    metrics,
    traceRoute,
    bandwidthMetrics,
    dnsMetrics,
  };
};