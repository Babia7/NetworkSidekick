import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { NetworkMetrics } from '../types/network';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MetricsChartProps {
  data: NetworkMetrics[];
  title: string;
}

export const MetricsChart: React.FC<MetricsChartProps> = ({ data, title }) => {
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const chartData = {
    labels: data.map(d => format(d.timestamp, 'HH:mm:ss')),
    datasets: [
      {
        label: 'Latency (ms)',
        data: data.map(d => d.latency),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Packet Loss (%)',
        data: data.map(d => d.packetLoss),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Jitter (ms)',
        data: data.map(d => d.jitter),
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1,
      },
    ],
  };

  return <Line options={options} data={chartData} />;
};