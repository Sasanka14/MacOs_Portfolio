import { useState, useEffect } from "react";
import DesktopApp from "./app/desktop/DesktopApp";
import IOSApp from "./app/mobile/IOSApp";

export default function AppRoot() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // SSR-safe responsive detection
    if (typeof window === "undefined") return;
    
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    
    // Set initial state
    setIsMobile(mediaQuery.matches);
    
    // Listen for changes
    const handleChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    
    // Cleanup listener
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile ? <IOSApp /> : <DesktopApp />;
}
