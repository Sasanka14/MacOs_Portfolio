import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Cloud, CloudRain, Sun, Wind } from "lucide-react";

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
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-gray-100 w-64 shadow-lg border border-white/20">
      <h3 className="text-sm font-semibold mb-3">Navi Mumbai</h3>
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-4xl font-bold">19°</div>
          <p className="text-xs text-gray-300">Clear</p>
          <p className="text-xs text-gray-400 mt-1">H:33° L:15°</p>
        </div>
        <Sun className="w-12 h-12 text-yellow-300" />
      </div>

      <div className="grid grid-cols-6 gap-2 text-xs text-center">
        {["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM"].map((time, i) => (
          <div key={time} className="space-y-1">
            <div className="text-gray-400">{time}</div>
            <Cloud className="w-4 h-4 mx-auto opacity-70" />
            <div className="text-gray-300 text-xs">{19 - i}°</div>
          </div>
        ))}
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
