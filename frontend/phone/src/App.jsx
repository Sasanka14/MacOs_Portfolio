import React, { useState } from "react";
import { 
  LockScreen, 
  HomeScreen, 
  StatusBar,
  AppView 
} from "#components";

/**
 * Root application component for the iOS-inspired mobile portfolio.
 * Manages screen navigation between lock screen, home screen, and apps.
 * 
 * @component
 * @returns {JSX.Element} The complete mobile portfolio application
 */
const App = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [activeApp, setActiveApp] = useState(null);

  const handleUnlock = () => {
    setIsLocked(false);
  };

  const handleOpenApp = (appId) => {
    setActiveApp(appId);
  };

  const handleCloseApp = () => {
    setActiveApp(null);
  };

  const handleLock = () => {
    setIsLocked(true);
    setActiveApp(null);
  };

  return (
    <div className="w-full h-full bg-black overflow-hidden relative">
      {/* Wallpaper Background - Different for lock screen and home */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
        style={{ 
          backgroundImage: isLocked 
            ? "url('/images/lockscreen.jpg')" 
            : "url('/images/homescreen.jpg')",
          backgroundColor: "#1a1a2e"
        }}
      />

      {/* Status Bar - Always visible */}
      <StatusBar />

      {/* Lock Screen */}
      {isLocked && (
        <LockScreen onUnlock={handleUnlock} />
      )}

      {/* Home Screen */}
      {!isLocked && !activeApp && (
        <HomeScreen onOpenApp={handleOpenApp} onLock={handleLock} />
      )}

      {/* Active App */}
      {activeApp && (
        <AppView appId={activeApp} onClose={handleCloseApp} />
      )}
    </div>
  );
};

export default App;
