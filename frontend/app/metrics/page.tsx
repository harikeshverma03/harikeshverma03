// frontend/app/metrics/page.tsx

"use client"
import { useEffect, useState } from "react"

export default function Metrics() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/metrics")
      .then(res => res.json())
      .then(setData)
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Raspberry Pi Metrics</h1>
      {data ? (
        <div className="space-y-2">
          <p>CPU Usage: {data.cpu_usage}%</p>
          <p>Memory: {(data.memory_used / 1024 / 1024).toFixed(2)}MB / {(data.memory_total / 1024 / 1024).toFixed(2)}MB</p>
          <p>Disk: {(data.disk_used / 1024 / 1024 / 1024).toFixed(2)}GB / {(data.disk_total / 1024 / 1024 / 1024).toFixed(2)}GB</p>
          <p>Temperature: {data.temperature}°C</p>
          <p>Uptime: {data.uptime} seconds</p>
        </div>
      ) : (
        <p>Loading metrics...</p>
      )}
    </div>
  )
}
