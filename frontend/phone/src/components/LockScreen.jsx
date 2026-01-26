import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { 
  Flashlight, 
  Camera, 
  SkipBack, 
  SkipForward, 
  Pause,
  Play,
  Headphones,
  Battery,
  QrCode
} from "lucide-react";
import gsap from "gsap";

/**
 * iOS 17-style Lock Screen component
 * Features depth effect time, widgets, and swipe to unlock
 */
const LockScreen = ({ onUnlock }) => {
  const [time, setTime] = useState(dayjs());
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format time with leading zeros
  const hours = time.format("HH");
  const minutes = time.format("mm");
  const dateStr = time.format("ddd MMM D");

  // Swipe up to unlock
  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    currentY.current = e.touches[0].clientY;
    const diff = startY.current - currentY.current;
    
    if (diff > 0 && containerRef.current) {
      const opacity = Math.max(0, 1 - diff / 300);
      const translateY = Math.min(0, -diff * 0.5);
      containerRef.current.style.opacity = opacity;
      containerRef.current.style.transform = `translateY(${translateY}px)`;
    }
  };

  const handleTouchEnd = () => {
    const diff = startY.current - currentY.current;
    
    if (diff > 100) {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -100,
        duration: 0.3,
        ease: "power2.out",
        onComplete: onUnlock,
      });
    } else {
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Mouse events for desktop testing
  const handleMouseDown = (e) => {
    startY.current = e.clientY;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    currentY.current = e.clientY;
    const diff = startY.current - currentY.current;
    
    if (diff > 0 && containerRef.current) {
      const opacity = Math.max(0, 1 - diff / 300);
      const translateY = Math.min(0, -diff * 0.5);
      containerRef.current.style.opacity = opacity;
      containerRef.current.style.transform = `translateY(${translateY}px)`;
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    
    const diff = startY.current - currentY.current;
    
    if (diff > 100) {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -100,
        duration: 0.3,
        ease: "power2.out",
        onComplete: onUnlock,
      });
    } else {
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="lock-screen-ios animate-fade-in cursor-grab active:cursor-grabbing"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
    >
      {/* Date Display - Top */}
      <div className="lock-date">
        {dateStr}
      </div>

      {/* Large Time Display with Depth Effect */}
      <div className="lock-time-container">
        <div className="lock-time">
          <span className="lock-time-digit">{hours[0]}</span>
          <span className="lock-time-digit">{hours[1]}</span>
          <span className="lock-time-colon">:</span>
          <span className="lock-time-digit">{minutes[0]}</span>
          <span className="lock-time-digit">{minutes[1]}</span>
        </div>
      </div>

      {/* Widgets Area */}
      <div className="lock-widgets">
        {/* Now Playing Widget */}
        <div className="now-playing-widget">
          <div className="now-playing-header">
            <div className="now-playing-artwork">
              <img 
                src="/images/sasanka.jpg" 
                alt="Album Art"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="now-playing-info">
              <p className="now-playing-title">Welcome to my Portfolio</p>
              <p className="now-playing-artist">Sasanka • Developer</p>
            </div>
            <div className="now-playing-waveform">
              <div className="waveform-bar" style={{ height: '60%' }} />
              <div className="waveform-bar" style={{ height: '100%' }} />
              <div className="waveform-bar" style={{ height: '40%' }} />
              <div className="waveform-bar" style={{ height: '80%' }} />
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="now-playing-progress">
            <span className="progress-time">1:37</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '40%' }} />
            </div>
            <span className="progress-time">-2:28</span>
          </div>

          {/* Controls */}
          <div className="now-playing-controls">
            <button className="control-btn">
              <SkipBack className="w-7 h-7 text-white" fill="white" />
            </button>
            <button 
              className="control-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(!isPlaying);
              }}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" fill="white" />
              ) : (
                <Play className="w-8 h-8 text-white" fill="white" />
              )}
            </button>
            <button className="control-btn">
              <SkipForward className="w-7 h-7 text-white" fill="white" />
            </button>
            <button className="control-btn ml-2">
              <Headphones className="w-6 h-6 text-white/60" />
            </button>
          </div>
        </div>

        {/* Bottom Widgets Row */}
        <div className="lock-bottom-widgets">
          {/* Battery Widget */}
          <div className="battery-widget">
            <div className="battery-icon">
              <Battery className="w-5 h-5 text-white" />
              <span className="battery-percent">87%</span>
            </div>
            <p className="battery-device">Sasanka's Portfolio</p>
            <div className="battery-bar">
              <div className="battery-fill" style={{ width: '87%' }} />
            </div>
          </div>

          {/* Quick App 1 - GitHub */}
          <a 
            href="https://github.com/Sasanka14" 
            target="_blank" 
            rel="noopener noreferrer"
            className="quick-widget"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src="/icons/github.svg" 
              alt="GitHub" 
              className="w-8 h-8 invert"
            />
          </a>

          {/* Quick App 2 - QR/LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/sasankawrites/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="quick-widget"
            onClick={(e) => e.stopPropagation()}
          >
            <QrCode className="w-8 h-8 text-white" />
            <span className="quick-widget-label">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="lock-bottom-actions">
        <button className="lock-action-btn" onClick={(e) => e.stopPropagation()}>
          <Flashlight className="w-6 h-6 text-white" />
        </button>
        
        <div className="home-indicator" />
        
        <button className="lock-action-btn" onClick={(e) => e.stopPropagation()}>
          <Camera className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default LockScreen;
