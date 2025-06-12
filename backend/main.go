package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os/exec"
	"runtime"
	"time"

	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/disk"
	"github.com/shirou/gopsutil/v3/mem"
	"github.com/shirou/gopsutil/v3/host"
)

type Metrics struct {
	CPUUsage     float64 `json:"cpu_usage"`
	MemoryUsed   uint64  `json:"memory_used"`
	MemoryTotal  uint64  `json:"memory_total"`
	DiskUsed     uint64  `json:"disk_used"`
	DiskTotal    uint64  `json:"disk_total"`
	Temperature  float64 `json:"temperature"`
	Uptime       uint64  `json:"uptime"`
}

func getMetrics() Metrics {
	cpuPercents, _ := cpu.Percent(time.Second, false)
	vmem, _ := mem.VirtualMemory()
	diskStat, _ := disk.Usage("/")
	hostInfo, _ := host.Info()

	temp := readCPUTemperature()

	return Metrics{
		CPUUsage:     cpuPercents[0],
		MemoryUsed:   vmem.Used,
		MemoryTotal:  vmem.Total,
		DiskUsed:     diskStat.Used,
		DiskTotal:    diskStat.Total,
		Temperature:  temp,
		Uptime:       hostInfo.Uptime,
	}
}

func readCPUTemperature() float64 {
	out, err := exec.Command("cat", "/sys/class/thermal/thermal_zone0/temp").Output()
	if err != nil {
		return 0.0
	}
	var tempMilli int
	_, err = fmt.Sscanf(string(out), "%d", &tempMilli)
	if err != nil {
		return 0.0
	}
	return float64(tempMilli) / 1000.0
}

func metricsHandler(w http.ResponseWriter, r *http.Request) {
	metrics := getMetrics()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(metrics)
}

func main() {
	http.HandleFunc("/api/metrics", metricsHandler)

	log.Println("Backend API running on :8081")
	log.Fatal(http.ListenAndServe(":8081", nil))
}
