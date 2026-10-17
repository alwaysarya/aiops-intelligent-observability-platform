export class TrafficSimulator {
  constructor() {
    this.interval = null;
    this.listeners = [];
    this.logCount = 12450;
    this.anomalyCount = 3;
  }

  start() {
    if (this.interval) return;
    
    this.interval = setInterval(() => {
      this.logCount += Math.floor(Math.random() * 10) + 1;
      
      let newAnomaly = false;
      if (Math.random() > 0.92) {
        this.anomalyCount += 1;
        newAnomaly = true;
      }

      this.listeners.forEach(fn => fn({
        logs: this.logCount,
        anomalies: this.anomalyCount,
        newAnomaly,
        cpu: Math.floor(Math.random() * 20) + 30,
        memory: Math.floor(Math.random() * 15) + 60,
        latency: Math.floor(Math.random() * 30) + 10
      }));
    }, 2000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(fn => fn !== callback);
    };
  }
}

export const simulator = new TrafficSimulator();
