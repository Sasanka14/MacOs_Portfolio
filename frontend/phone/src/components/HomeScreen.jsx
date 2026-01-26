import React, { useRef, useState } from "react";
import { iosApps, iosDockApps } from "#constants";
import gsap from "gsap";
import dayjs from "dayjs";
import { 
  Search, 
  Coffee, 
  Cloud, 
  MapPin,
  Smartphone,
  Watch,
  Headphones,
  Speaker,
  Heart,
  Activity
} from "lucide-react";

/**
 * iOS-style Home Screen component with widgets and swipeable pages
 */
const HomeScreen = ({ onOpenApp, onLock }) => {
  const appRefs = useRef({});
  const [currentDate] = useState(dayjs());
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef(null);
  const startX = useRef(0);
  const currentX = useRef(0);

  const handleAppClick = (app) => {
    if (app.isExternal && app.href) {
      window.open(app.href, "_blank", "noopener,noreferrer");
      return;
    }

    const appEl = appRefs.current[app.id];
    if (appEl) {
      gsap.to(appEl, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => onOpenApp(app.id),
      });
    } else {
      onOpenApp(app.id);
    }
  };

  // Swipe handlers for page navigation
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    currentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = startX.current - currentX.current;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentPage < 1) {
        // Swipe left - go to next page
        setCurrentPage(1);
      } else if (diff < 0 && currentPage > 0) {
        // Swipe right - go to previous page
        setCurrentPage(0);
      }
    }
  };

  // Mouse events for desktop testing
  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    currentX.current = e.clientX;
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    
    const diff = startX.current - currentX.current;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentPage < 1) {
        setCurrentPage(1);
      } else if (diff < 0 && currentPage > 0) {
        setCurrentPage(0);
      }
    }
  };

  // Calendar helpers
  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.startOf('month').day();
  const today = currentDate.date();
  const dayNames = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  const monthName = currentDate.format('MMMM').toUpperCase();
  const dayName = currentDate.format('ddd').toUpperCase();

  // Generate calendar days
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Schedule items for Page 2
  const scheduleItems = [
    { title: "Projects", time: "09:30–10:00", color: "#8B9A7D" },
    { title: "Skills Review", time: "12:00–12:30", color: "#8B9A7D" },
    { title: "Coffee Break", time: "14:30–15:00", color: "#8B9A7D" },
  ];

  // Battery devices for Page 2
  const batteryDevices = [
    { icon: Smartphone, percent: 87, charging: false },
    { icon: Watch, percent: 69, charging: true },
    { icon: Speaker, percent: 97, charging: false },
    { icon: Headphones, percent: 100, charging: true },
  ];

  return (
    <div className="home-screen-ios">
      {/* Pages Container */}
      <div 
        ref={containerRef}
        className="home-pages-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        <div 
          className="home-pages"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {/* Page 1 - Main Apps */}
          <div className="home-page">
            <div className="home-content hide-scrollbar">
              {/* Top Row - Calendar Widget + Small Apps */}
              <div className="widget-row">
                {/* Calendar Widget (Large) */}
                <div className="calendar-widget">
                  <div className="calendar-left">
                    <span className="calendar-day-name">{dayName}</span>
                    <span className="calendar-day-number">{today}</span>
                  </div>
                  <div className="calendar-right">
                    <span className="calendar-month">{monthName}</span>
                    <div className="calendar-header">
                      {dayNames.map((day, i) => (
                        <span key={i} className="calendar-header-day">{day}</span>
                      ))}
                    </div>
                    <div className="calendar-grid">
                      {calendarDays.map((day, i) => (
                        <span 
                          key={i} 
                          className={`calendar-day ${day === today ? 'calendar-today' : ''} ${!day ? 'calendar-empty' : ''}`}
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Widget Row - Large Image Widget + 2x2 Apps */}
              <div className="widget-row">
                {/* Large Photo Widget */}
                <button
                  ref={(el) => (appRefs.current['about'] = el)}
                  className="photo-widget"
                  onClick={() => handleAppClick({ id: 'about' })}
                >
                  <img 
                    src="/images/sasanka.jpg" 
                    alt="Profile"
                    className="photo-widget-img"
                  />
                  <span className="photo-widget-label">About Me</span>
                </button>

                {/* 2x2 App Grid */}
                <div className="app-grid-2x2">
                  <button
                    ref={(el) => (appRefs.current['projects'] = el)}
                    className="app-icon-medium"
                    onClick={() => handleAppClick({ id: 'projects' })}
                  >
                    <div className="app-icon-medium-inner">
                      <img src="/images/finder.png" alt="Projects" />
                    </div>
                    <span>Projects</span>
                  </button>
                  <button
                    ref={(el) => (appRefs.current['skills'] = el)}
                    className="app-icon-medium"
                    onClick={() => handleAppClick({ id: 'skills' })}
                  >
                    <div className="app-icon-medium-inner">
                      <img src="/images/terminal.png" alt="Skills" />
                    </div>
                    <span>Skills</span>
                  </button>
                  <button
                    ref={(el) => (appRefs.current['blog'] = el)}
                    className="app-icon-medium"
                    onClick={() => handleAppClick({ id: 'blog' })}
                  >
                    <div className="app-icon-medium-inner">
                      <img src="/images/safari.png" alt="Blog" />
                    </div>
                    <span>Articles</span>
                  </button>
                  <button
                    ref={(el) => (appRefs.current['resume'] = el)}
                    className="app-icon-medium"
                    onClick={() => handleAppClick({ id: 'resume' })}
                  >
                    <div className="app-icon-medium-inner">
                      <img src="/icons/file.svg" alt="Resume" className="invert-icon" />
                    </div>
                    <span>Resume</span>
                  </button>
                </div>
              </div>

              {/* Small Apps Row + Music Widget */}
              <div className="widget-row">
                {/* Small Apps Column */}
                <div className="app-column-small">
                  <button
                    ref={(el) => (appRefs.current['gallery'] = el)}
                    className="app-icon-small"
                    onClick={() => handleAppClick({ id: 'gallery' })}
                  >
                    <div className="app-icon-small-inner">
                      <img src="/images/photos.png" alt="Gallery" />
                    </div>
                    <span>Gallery</span>
                  </button>
                  <button
                    ref={(el) => (appRefs.current['contact'] = el)}
                    className="app-icon-small"
                    onClick={() => handleAppClick({ id: 'contact' })}
                  >
                    <div className="app-icon-small-inner">
                      <img src="/images/contact.png" alt="Contact" />
                    </div>
                    <span>Contact</span>
                  </button>
                </div>

                {/* Music/GitHub Widget */}
                <div className="music-widget">
                  <div className="music-widget-content">
                    <img 
                      src="/images/sasanka2.jpeg" 
                      alt="Album"
                      className="music-widget-art"
                    />
                    <div className="music-widget-info">
                      <p className="music-widget-title">Portfolio</p>
                      <p className="music-widget-artist">Sasanka</p>
                      <div className="music-widget-wave">
                        <span></span><span></span><span></span><span></span>
                      </div>
                    </div>
                  </div>
                  <div className="music-widget-icon">
                    <img src="/icons/github.svg" alt="GitHub" className="invert" />
                  </div>
                  <a 
                    href="https://github.com/Sasanka14"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="music-widget-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub
                  </a>
                </div>
              </div>

              {/* Social Links Row */}
              <div className="widget-row social-row">
                <a 
                  href="https://www.linkedin.com/in/sasankawrites/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                >
                  <img src="/icons/linkedin.svg" alt="LinkedIn" />
                </a>
                <a 
                  href="https://www.instagram.com/sashank.codes_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                >
                  <img src="/icons/insta.svg" alt="Instagram" />
                </a>
                <a 
                  href="https://github.com/Sasanka14"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                >
                  <img src="/icons/github.svg" alt="GitHub" className="invert" />
                </a>
                <a 
                  href="https://sasanka14.github.io/MERN-Stack-Blog-Website/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                >
                  <img src="/icons/atom.svg" alt="Blog" />
                </a>
              </div>
            </div>
          </div>

          {/* Page 2 - Widgets */}
          <div className="home-page">
            <div className="home-content hide-scrollbar">
              {/* Top Row - Reminder + Weather */}
              <div className="widget-row">
                {/* Reminder Widget */}
                <div className="reminder-widget">
                  <div className="reminder-icon">
                    <Coffee className="w-6 h-6 text-amber-700" />
                  </div>
                  <div className="reminder-checkbox"></div>
                  <p className="reminder-time">09:30–10:00</p>
                  <p className="reminder-duration">(30 min)</p>
                  <p className="reminder-title">Coffee Break</p>
                </div>

                {/* Weather Widget */}
                <div className="weather-widget">
                  <div className="weather-location">
                    <MapPin className="w-3 h-3" />
                    <span>India</span>
                  </div>
                  <div className="weather-temp">28°</div>
                  <div className="weather-details">
                    <Cloud className="w-4 h-4" />
                    <span>Sunny</span>
                  </div>
                  <div className="weather-range">H:32° L:24°</div>
                </div>
              </div>

              {/* Schedule Widget */}
              <div className="widget-row">
                <div className="schedule-widget">
                  <div className="schedule-left">
                    <span className="schedule-day">{dayName}</span>
                    <span className="schedule-date">{today}</span>
                  </div>
                  <div className="schedule-right">
                    <span className="schedule-label">TODAY</span>
                    {scheduleItems.map((item, i) => (
                      <div key={i} className="schedule-item" style={{ borderLeftColor: item.color }}>
                        <p className="schedule-item-title">{item.title}</p>
                        <p className="schedule-item-time">{item.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Battery Widget */}
              <div className="widget-row">
                <div className="battery-widget-large">
                  {batteryDevices.map((device, i) => (
                    <div key={i} className="battery-device">
                      <div className="battery-ring">
                        <svg viewBox="0 0 36 36" className="battery-ring-svg">
                          <path
                            className="battery-ring-bg"
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="battery-ring-fill"
                            strokeDasharray={`${device.percent}, 100`}
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <device.icon className="battery-device-icon" />
                        {device.charging && (
                          <span className="battery-charging">⚡</span>
                        )}
                      </div>
                      <span className="battery-device-percent">{device.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Row - Activity + Stats */}
              <div className="widget-row">
                {/* Activity Rings Widget */}
                <div className="activity-widget">
                  <div className="activity-icon">
                    <Activity className="w-6 h-6 text-pink-500" />
                  </div>
                  <div className="activity-rings">
                    <svg viewBox="0 0 36 36" className="activity-ring red">
                      <circle cx="18" cy="18" r="15" />
                    </svg>
                    <svg viewBox="0 0 36 36" className="activity-ring green">
                      <circle cx="18" cy="18" r="11" />
                    </svg>
                    <svg viewBox="0 0 36 36" className="activity-ring blue">
                      <circle cx="18" cy="18" r="7" />
                    </svg>
                  </div>
                  <div className="activity-stats">
                    <p><span className="text-red-500">3+</span> Projects</p>
                    <p><span className="text-green-500">15+</span> Skills</p>
                    <p><span className="text-blue-500">1+</span> Years</p>
                  </div>
                </div>

                {/* Heart/Stats Widget */}
                <div className="stats-widget">
                  <div className="stats-header">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    <span className="stats-value">Available</span>
                    <span className="stats-time">Now</span>
                  </div>
                  <div className="stats-chart">
                    <div className="stats-bar" style={{ height: '60%' }}></div>
                    <div className="stats-bar" style={{ height: '80%' }}></div>
                    <div className="stats-bar" style={{ height: '40%' }}></div>
                    <div className="stats-bar" style={{ height: '90%' }}></div>
                    <div className="stats-bar" style={{ height: '70%' }}></div>
                    <div className="stats-bar active" style={{ height: '85%' }}></div>
                  </div>
                  <div className="stats-labels">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Indicator */}
      <div className="page-indicator">
        <div className={`page-dot ${currentPage === 0 ? 'active' : ''}`} onClick={() => setCurrentPage(0)} />
        <div className={`page-dot ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)} />
      </div>

      {/* Search Bar */}
      <div className="home-search">
        <div className="home-search-bar">
          <Search className="w-4 h-4 text-white/50" />
          <span>Search</span>
        </div>
      </div>

      {/* Dock */}
      <div className="ios-dock">
        {iosDockApps.map((app) => (
          <button
            key={app.id}
            ref={(el) => (appRefs.current[`dock-${app.id}`] = el)}
            className="dock-icon"
            onClick={() => handleAppClick(app)}
          >
            <img 
              src={app.icon} 
              alt={app.name}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
