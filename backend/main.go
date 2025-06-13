package main

import (
    "encoding/json"
    "log"
    "net/http"
    "os/exec"
    "strconv"
    "strings"
    "time"

    "github.com/shirou/gopsutil/v3/cpu"
    "github.com/shirou/gopsutil/v3/disk"
    "github.com/shirou/gopsutil/v3/host"
    "github.com/shirou/gopsutil/v3/load"
    "github.com/shirou/gopsutil/v3/mem"
    "github.com/shirou/gopsutil/v3/net"
)

type Metrics struct {
    CPUUsage       float64 `json:"cpu_usage"`
    Load1          float64 `json:"load1"`
    Load5          float64 `json:"load5"`
    Load15         float64 `json:"load15"`
    MemoryUsed     uint64  `json:"memory_used"`
    MemoryTotal    uint64  `json:"memory_total"`
    DiskUsed       uint64  `json:"disk_used"`
    DiskTotal      uint64  `json:"disk_total"`
    Temperature    float64 `json:"temperature"`
    Uptime         uint64  `json:"uptime"`
    NetIn          uint64  `json:"net_in"`
    NetOut         uint64  `json:"net_out"`
    ActiveTCP      int     `json:"active_tcp"`
    ProcessCount   int     `json:"process_count"`
}

func getTemperature() float64 {
    out, err := exec.Command("vcgencmd", "measure_temp").Output()
    if err != nil {
        return 0.0
    }
    tempStr := strings.TrimPrefix(string(out), "temp=")
    tempStr = strings.TrimSuffix(tempStr, "'C\n")
    temp, err := strconv.ParseFloat(tempStr, 64)
    if err != nil {
        return 0.0
    }
    return temp
}

func getActiveTCP() int {
    connections, err := net.Connections("tcp")
    if err != nil {
        return 0
    }
    return len(connections)
}

func getProcessCount() int {
    out, err := exec.Command("ps", "-e").Output()
    if err != nil {
        return 0
    }
    lines := strings.Split(string(out), "\n")
    return len(lines) - 1
}

func metricsHandler(w http.ResponseWriter, r *http.Request) {
    cpuPercents, _ := cpu.Percent(0, false)
    cpuUsage := cpuPercents[0]

    vmStat, _ := mem.VirtualMemory()
    diskStat, _ := disk.Usage("/")
    loadStat, _ := load.Avg()
    hostStat, _ := host.Info()
    netStat, _ := net.IOCounters(false)

    metrics := Metrics{
        CPUUsage:     cpuUsage,
        Load1:        loadStat.Load1,
        Load5:        loadStat.Load5,
        Load15:       loadStat.Load15,
        MemoryUsed:   vmStat.Used,
        MemoryTotal:  vmStat.Total,
        DiskUsed:     diskStat.Used,
        DiskTotal:    diskStat.Total,
        Temperature:  getTemperature(),
        Uptime:       hostStat.Uptime,
        NetIn:        netStat[0].BytesRecv,
        NetOut:       netStat[0].BytesSent,
        ActiveTCP:    getActiveTCP(),
        ProcessCount: getProcessCount(),
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(metrics)
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/api/metrics", metricsHandler)

    srv := &http.Server{
        Addr:         ":8081",
        Handler:      mux,
        ReadTimeout:  10 * time.Second,
        WriteTimeout: 10 * time.Second,
    }

    log.Println("Listening on :8081")
    log.Fatal(srv.ListenAndServe())
}
