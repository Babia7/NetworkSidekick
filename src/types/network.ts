export interface NetworkMetrics {
  latency: number;
  packetLoss: number;
  jitter: number;
  timestamp: number;
}

export interface BandwidthMetrics {
  download: number;
  upload: number;
  timestamp: number;
}

export interface DNSMetrics {
  hostname: string;
  resolvedIP: string;
  resolutionTime: number;
  timestamp: number;
}

export interface HopMetrics extends NetworkMetrics {
  hopNumber: number;
  ipAddress: string;
  hostname: string;
}

export interface TraceRoute {
  target: string;
  hops: HopMetrics[];
  timestamp: number;
}

export interface EndpointData {
  id: string;
  host: string;
  metrics: NetworkMetrics[];
  isActive: boolean;
}

export interface AlertThreshold {
  latency: number;
  packetLoss: number;
  jitter: number;
  download: number;
  upload: number;
  dnsResolution: number;
}

export interface Settings {
  refreshInterval: number;
  thresholds: AlertThreshold;
  enabledMetrics: {
    bandwidth: boolean;
    dns: boolean;
    traceroute: boolean;
    heatmap: boolean;
  };
}

export type ExportFormat = 'csv' | 'image';