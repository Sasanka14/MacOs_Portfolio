import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Signal, Wifi, Battery } from "lucide-react";

/**
 * iOS-style Status Bar component
 * Displays time, cellular signal, wifi, and battery status
 */
const StatusBar = () => {
  const [time, setTime] = useState(dayjs().format("HH:mm"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format("HH:mm"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="status-bar">
      {/* Left - Time */}
      <div className="status-bar-time">
        {time}
      </div>

      {/* Center - Dynamic Island */}
      <div className="dynamic-island" />

      {/* Right - Icons */}
      <div className="status-bar-icons">
        <Signal className="w-4 h-4 text-white" strokeWidth={2.5} />
        <Wifi className="w-4 h-4 text-white" strokeWidth={2.5} />
        <div className="flex items-center gap-0.5">
          <Battery className="w-6 h-4 text-white" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
