"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

interface Metrics {
  cpu_usage: number;
  load1: number;
  load5: number;
  load15: number;
  memory_used: number;
  memory_total: number;
  disk_used: number;
  disk_total: number;
  temperature: number;
  uptime: number;
  net_in: number;
  net_out: number;
  active_tcp: number;
  process_count: number;
}

export default function MetricsPage() {
  const [data, setData] = useState<Metrics[]>([]);

  const fetchMetrics = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/metrics`);
      setData(prev => [...prev.slice(-29), res.data]);
    } catch (error) {
      console.error("Failed to fetch metrics", error);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold text-center">System Metrics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="CPU Usage">{data.at(-1)?.cpu_usage.toFixed(2)}%</Card>
        <Card title="Temperature">{data.at(-1)?.temperature.toFixed(1)}°C</Card>
        <Card title="Memory Usage">{(data.at(-1)?.memory_used / 1e9).toFixed(2)} GB / {(data.at(-1)?.memory_total / 1e9).toFixed(2)} GB</Card>
        <Card title="Disk Usage">{(data.at(-1)?.disk_used / 1e9).toFixed(2)} GB / {(data.at(-1)?.disk_total / 1e9).toFixed(2)} GB</Card>
        <Card title="Network In">{(data.at(-1)?.net_in / 1e6).toFixed(2)} MB</Card>
        <Card title="Network Out">{(data.at(-1)?.net_out / 1e6).toFixed(2)} MB</Card>
        <Card title="Load Average">{data.at(-1)?.load1.toFixed(2)}</Card>
        <Card title="Active TCP">{data.at(-1)?.active_tcp}</Card>
        <Card title="Processes">{data.at(-1)?.process_count}</Card>
      </div>

      <h2 className="text-2xl font-semibold mt-8">CPU Usage History</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={(v, i) => i} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cpu_usage" stroke="#8884d8" />
          <Line type="monotone" dataKey="load1" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <h3 className="font-semibold mb-2">{title}</h3>
    <div className="text-xl">{children}</div>
  </div>
);
