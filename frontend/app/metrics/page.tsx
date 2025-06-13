"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface Metrics {
  cpu_usage: number;
  memory_used: number;
  memory_total: number;
  disk_used: number;
  disk_total: number;
  temperature: number;
  uptime: number;
  net_in: number;
  net_out: number;
}

export default function MetricsPage() {
  const [data, setData] = useState<Metrics[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/metrics")
        .then(res => res.json())
        .then(json => setData(prev => [...prev.slice(-29), json]))
        .catch(console.error);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const latest = data.at(-1);

  return (
    <main className="min-h-screen bg-gradient-to-tr from-slate-100 to-slate-200 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">System Metrics</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <Card title="CPU Usage">{latest ? `${latest.cpu_usage.toFixed(2)}%` : "Loading..."}</Card>
        <Card title="Temperature">{latest ? `${latest.temperature.toFixed(1)}°C` : "Loading..."}</Card>
        <Card title="Memory Usage">
          {latest ? `${(latest.memory_used / 1e9).toFixed(2)} GB / ${(latest.memory_total / 1e9).toFixed(2)} GB` : "Loading..."}
        </Card>
        <Card title="Disk Usage">
          {latest ? `${(latest.disk_used / 1e9).toFixed(2)} GB / ${(latest.disk_total / 1e9).toFixed(2)} GB` : "Loading..."}
        </Card>
        <Card title="Network In">{latest ? `${(latest.net_in / 1e6).toFixed(2)} MB` : "Loading..."}</Card>
        <Card title="Network Out">{latest ? `${(latest.net_out / 1e6).toFixed(2)} MB` : "Loading..."}</Card>
        <Card title="Uptime">{latest ? `${(latest.uptime / 60).toFixed(0)} mins` : "Loading..."}</Card>
      </div>

      {data.length > 1 && (
        <div className="mt-10">
          <Line
            data={{
              labels: data.map((_, i) => i.toString()),
              datasets: [
                {
                  label: "CPU Usage (%)",
                  data: data.map(d => d.cpu_usage),
                  borderColor: "rgba(75,192,192,1)",
                  fill: false,
                },
              ],
            }}
          />
        </div>
      )}
    </main>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="text-gray-500 text-lg">{children}</div>
    </div>
  );
}
