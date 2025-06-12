"use client";
import { useEffect, useState } from "react";

type Metrics = {
  cpu_usage: number;
  memory_used: number;
  memory_total: number;
  disk_used: number;
  disk_total: number;
  temperature: number;
  uptime: number;
};

export default function MetricsPage() {
  const [metrics, setMetrics] = useState<Metrics>();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/metrics`)
      .then(res => res.json())
      .then(setMetrics);
  }, []);

  if (!metrics) return <p>Loading metrics...</p>;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Raspberry Pi Metrics</h1>
      <ul className="space-y-2">
        <li>CPU Usage: {metrics.cpu_usage.toFixed(2)}%</li>
        <li>Memory: {(metrics.memory_used/1e9).toFixed(2)} GB / {(metrics.memory_total/1e9).toFixed(2)} GB</li>
        <li>Disk: {(metrics.disk_used/1e9).toFixed(2)} GB / {(metrics.disk_total/1e9).toFixed(2)} GB</li>
        <li>Temperature: {metrics.temperature} °C</li>
        <li>Uptime: {Math.floor(metrics.uptime/3600)} hours</li>
      </ul>
    </main>
  );
}
