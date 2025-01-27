import React, { useEffect, useRef } from 'react';
import { NetworkMetrics } from '../types/network';
import h337 from 'heatmap.js';

interface LatencyHeatmapProps {
  data: NetworkMetrics[];
}

export const LatencyHeatmap: React.FC<LatencyHeatmapProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heatmapRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current && !heatmapRef.current) {
      heatmapRef.current = h337.create({
        container: containerRef.current,
        radius: 25,
        maxOpacity: 0.6,
        minOpacity: 0.1,
        blur: 0.85,
        gradient: {
          '.2': 'blue',
          '.4': 'cyan',
          '.6': 'lime',
          '.8': 'yellow',
          '.95': 'red'
        }
      });
    }

    return () => {
      if (heatmapRef.current) {
        // Clean up heatmap instance
        heatmapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (heatmapRef.current && data.length > 0 && containerRef.current) {
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;
      
      const dataPoints = data.map((metric, index) => ({
        x: Math.floor((index / Math.max(1, data.length - 1)) * (width - 20)) + 10,
        y: Math.floor(height / 2),
        value: metric.latency
      }));

      // Create a new data object instead of modifying existing one
      const heatmapData = {
        max: Math.max(...data.map(d => d.latency)),
        min: Math.min(...data.map(d => d.latency)),
        data: dataPoints
      };

      requestAnimationFrame(() => {
        if (heatmapRef.current) {
          heatmapRef.current.setData(heatmapData);
        }
      });
    }
  }, [data]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Latency Heatmap</h2>
      <div 
        ref={containerRef} 
        className="w-full h-48 bg-gray-50 rounded-lg"
        style={{ position: 'relative' }}
      ></div>
      <div className="mt-2 text-sm text-gray-500 text-center">
        Latency intensity over time (blue = low, red = high)
      </div>
    </div>
  );
};