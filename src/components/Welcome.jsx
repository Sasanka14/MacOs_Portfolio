import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Cloud, CloudRain, Sun, Wind, CloudSnow, CloudDrizzle, Eye } from "lucide-react";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `"wght" ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return () => {;}

  const letter = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `"wght" ${weight}`,
    });
  };

  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letter.forEach((l) => {
      const { left: lLeft, width: w } = l.getBoundingClientRect();
      const distance = Math.abs(mouseX - (lLeft - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 2000);

      animateLetter(l, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave =() => {
    letter.forEach((letter)=> animateLetter(letter,base,0.3))
  }
  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return() =>{
    container.removeEventListener("mousemove", handleMouseMove);
     container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth(currentDate) }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => null);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const today = new Date();
  const isCurrentMonth = today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-gray-100 w-64 shadow-lg border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          className="px-2 py-1 hover:bg-white/10 rounded text-xs"
        >
          ←
        </button>
        <h3 className="text-sm font-semibold">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          className="px-2 py-1 hover:bg-white/10 rounded text-xs"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs text-center mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="font-semibold text-gray-300">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map((_, i) => (
          <div key={`empty-${i}`} className="h-6" />
        ))}
        {days.map(day => (
          <div
            key={day}
            className={`h-6 flex items-center justify-center rounded text-xs cursor-pointer transition-colors ${
              isCurrentMonth && day === today.getDate()
                ? "bg-blue-500 font-bold"
                : "hover:bg-white/10"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 text-xs">
        <p className="text-gray-300">Today: <span className="font-semibold">{today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span></p>
      </div>
    </div>
  );
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Navi Mumbai");

  // Map OpenWeatherMap condition codes to Lucide icons
  const getWeatherIcon = (condition) => {
    if (!condition) return <Sun className="w-12 h-12 text-yellow-300" />;
    
    const code = condition.toLowerCase();
    if (code.includes("clear") || code.includes("sunny")) {
      return <Sun className="w-12 h-12 text-yellow-300" />;
    } else if (code.includes("cloud")) {
      return <Cloud className="w-12 h-12 text-gray-300" />;
    } else if (code.includes("rain")) {
      return <CloudRain className="w-12 h-12 text-blue-300" />;
    } else if (code.includes("drizzle")) {
      return <CloudDrizzle className="w-12 h-12 text-blue-200" />;
    } else if (code.includes("snow")) {
      return <CloudSnow className="w-12 h-12 text-white" />;
    }
    return <Cloud className="w-12 h-12 text-gray-300" />;
  };

  const getSmallWeatherIcon = (condition) => {
    if (!condition) return <Cloud className="w-4 h-4 mx-auto opacity-70" />;
    
    const code = condition.toLowerCase();
    if (code.includes("clear") || code.includes("sunny")) {
      return <Sun className="w-4 h-4 mx-auto opacity-70 text-yellow-300" />;
    } else if (code.includes("cloud")) {
      return <Cloud className="w-4 h-4 mx-auto opacity-70" />;
    } else if (code.includes("rain")) {
      return <CloudRain className="w-4 h-4 mx-auto opacity-70" />;
    } else if (code.includes("drizzle")) {
      return <CloudDrizzle className="w-4 h-4 mx-auto opacity-70" />;
    } else if (code.includes("snow")) {
      return <CloudSnow className="w-4 h-4 mx-auto opacity-70" />;
    }
    return <Cloud className="w-4 h-4 mx-auto opacity-70" />;
  };

  const fetchWeatherByCoordinates = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);

      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      if (!apiKey) {
        console.warn("⚠️ Weather API key not configured. Set VITE_WEATHER_API_KEY in .env.local");
        throw new Error("Weather API key not configured");
      }

      console.log("🔄 Fetching weather for coordinates:", { lat, lon });

      // Fetch current weather and forecast
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("❌ Weather API error:", response.status, errorData);
        throw new Error(`API Error: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      console.log("✅ Weather data received:", data);
      
      // Extract current weather (first forecast entry)
      const current = data.list[0];
      const high = Math.max(...data.list.slice(0, 8).map(d => d.main.temp_max));
      const low = Math.min(...data.list.slice(0, 8).map(d => d.main.temp_min));

      setWeather({
        temp: Math.round(current.main.temp),
        condition: current.weather[0].main,
        high: Math.round(high),
        low: Math.round(low),
      });

      // Extract hourly forecast (next 6 hours)
      const hourly = data.list.slice(0, 6).map((item) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        condition: item.weather[0].main,
        temp: Math.round(item.main.temp),
      }));

      setHourlyForecast(hourly);
      setCity(data.city.name);
      console.log("✅ Weather widget loaded for:", data.city.name);
    } catch (err) {
      console.error("❌ Weather fetch error:", err);
      setError(err.message);
      // Fallback to default city
      fetchWeatherByCity("Navi Mumbai");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (cityName) => {
    try {
      setLoading(true);
      setError(null);

      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      if (!apiKey) {
        console.warn("⚠️ Weather API key not configured. Set VITE_WEATHER_API_KEY in .env.local");
        throw new Error("Weather API key not configured");
      }

      console.log("🔄 Fetching weather for city:", cityName);

      // Get coordinates for city
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
      );

      if (!geoResponse.ok) {
        const errorData = await geoResponse.json().catch(() => ({}));
        console.error("❌ Geo API error:", geoResponse.status, errorData);
        throw new Error("City not found");
      }

      const geoData = await geoResponse.json();
      if (geoData.length === 0) {
        throw new Error("City not found");
      }

      const { lat, lon, name } = geoData[0];
      setCity(name);
      console.log("📍 City location found:", { name, lat, lon });

      // Fetch weather using coordinates
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );

      if (!weatherResponse.ok) {
        const errorData = await weatherResponse.json().catch(() => ({}));
        console.error("❌ Weather API error:", weatherResponse.status, errorData);
        throw new Error(`API Error: ${errorData.message || weatherResponse.statusText}`);
      }

      const data = await weatherResponse.json();
      console.log("✅ Weather data received:", data);
      
      // Extract current weather
      const current = data.list[0];
      const high = Math.max(...data.list.slice(0, 8).map(d => d.main.temp_max));
      const low = Math.min(...data.list.slice(0, 8).map(d => d.main.temp_min));

      setWeather({
        temp: Math.round(current.main.temp),
        condition: current.weather[0].main,
        high: Math.round(high),
        low: Math.round(low),
      });

      // Extract hourly forecast
      const hourly = data.list.slice(0, 6).map((item) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        condition: item.weather[0].main,
        temp: Math.round(item.main.temp),
      }));

      setHourlyForecast(hourly);
      console.log("✅ Weather widget loaded for:", name);
    } catch (err) {
      console.error("❌ Weather fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initialize: Try geolocation, fallback to Navi Mumbai
  useEffect(() => {
    const initializeWeather = async () => {
      console.log("🌤️ Initializing weather widget...");
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      
      if (!apiKey) {
        console.error("❌ VITE_WEATHER_API_KEY is not set!");
        console.error("   Add to .env.local: VITE_WEATHER_API_KEY=your_key_here");
        setError("API key not configured");
        setLoading(false);
        return;
      }
      
      console.log("✅ API Key detected (length:", apiKey.length, ")");

      if (navigator.geolocation) {
        console.log("📍 Requesting geolocation...");
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("✅ Geolocation granted:", position.coords);
            fetchWeatherByCoordinates(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (err) => {
            console.log("⚠️ Geolocation denied/failed:", err.message);
            // Geolocation denied or failed, use default city
            fetchWeatherByCity("Navi Mumbai");
          }
        );
      } else {
        console.log("⚠️ Geolocation not available, using default city");
        // Geolocation not available, use default city
        fetchWeatherByCity("Navi Mumbai");
      }
    };

    initializeWeather();

    // Refresh weather every 30 minutes
    const interval = setInterval(initializeWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-gray-100 w-64 shadow-lg border border-white/20 animate-pulse">
        <div className="h-5 bg-gray-400/30 rounded w-24 mb-3" />
        <div className="h-12 bg-gray-400/30 rounded w-20 mb-2" />
        <div className="h-4 bg-gray-400/30 rounded w-16 mb-4" />
        <div className="grid grid-cols-6 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-400/30 rounded" />
          ))}
        </div>
      </div>
    );
  }

  // Show error state with fallback
  if (error && !weather) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-gray-100 w-64 shadow-lg border border-white/20">
        <h3 className="text-sm font-semibold mb-2">Weather</h3>
        <p className="text-xs text-gray-400">Unable to fetch weather data</p>
      </div>
    );
  }

  // Render weather widget with real data
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-gray-100 w-64 shadow-lg border border-white/20">
      <h3 className="text-sm font-semibold mb-3">{city}</h3>
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-4xl font-bold">{weather?.temp ?? "—"}°</div>
          <p className="text-xs text-gray-300">{weather?.condition ?? "—"}</p>
          <p className="text-xs text-gray-400 mt-1">H:{weather?.high ?? "—"}° L:{weather?.low ?? "—"}°</p>
        </div>
        {getWeatherIcon(weather?.condition)}
      </div>

      <div className="grid grid-cols-6 gap-2 text-xs text-center">
        {hourlyForecast.length > 0 ? (
          hourlyForecast.map((hour, i) => (
            <div key={i} className="space-y-1">
              <div className="text-gray-400">{hour.time}</div>
              {getSmallWeatherIcon(hour.condition)}
              <div className="text-gray-300 text-xs">{hour.temp}°</div>
            </div>
          ))
        ) : (
          [...Array(6)].map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="text-gray-400">—</div>
              <Cloud className="w-4 h-4 mx-auto opacity-70" />
              <div className="text-gray-300 text-xs">—°</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      subtitleCleanup?.();
      titleCleanup?.();
    };
  }, []);

  return (
    <section id="welcome" className="relative">

      {/* Center Content */}
      <div className="flex flex-col justify-center items-center h-full">
        <p ref={subtitleRef}>
          {renderText(
            "Hey, I'm Sasanka! Welcome to my",
            "text-3xl font-georama",
            150
          )}
        </p>
        <h1 ref={titleRef} className="mt-7">
          {renderText("portfolio", "text-9xl italic font-georama")}
        </h1>
      </div>

      {/* Right Sidebar - Weather */}
      <div className="absolute left-8 -top-90 max-lg:hidden">
        <WeatherWidget />
      </div>

      <div className="small-screen">
        <p>This Portfolio is Designed for Desktops / Tablets Screen only!!!!</p>
      </div>
    </section>
  );
};

export default Welcome;
