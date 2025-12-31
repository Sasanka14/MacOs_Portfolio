import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import useTheme from "../hooks/useTheme";

const ThemeMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, applyTheme } = useTheme();
  const menuRef = useRef(null);
  const iconRef = useRef(null);

  const themes = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Monitor },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        iconRef.current &&
        !iconRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleThemeChange = (selectedTheme) => {
    applyTheme(selectedTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Mode Icon Button */}
      <button
        ref={iconRef}
        onClick={() => setIsOpen(!isOpen)}
        className="icon-hover p-1 rounded-md transition-colors hover:bg-white/10"
        aria-label="Theme selector"
        type="button"
      >
        <img src="/icons/mode.svg" alt="theme"  />
      </button>

      {/* Theme Menu Popup */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-full mt-2 w-24 backdrop-blur-md rounded-lg shadow-2xl z-50 overflow-hidden flex flex-col"
          style={{
            backgroundColor: document.documentElement.classList.contains('dark') 
              ? 'rgba(30, 30, 30, 0.85)' 
              : 'rgba(245, 245, 247, 0.95)',
            border: document.documentElement.classList.contains('dark')
              ? '1px solid rgba(255, 255, 255, 0.15)'
              : '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: document.documentElement.classList.contains('dark')
              ? '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
              : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            right: '-8px',
          }}
        >
          <div className="py-0.5 flex flex-col">
            {themes.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleThemeChange(id)}
                className={`w-full px-1.5 py-1 flex items-center gap-1.5 text-xs transition-all duration-150 ${
                  theme === id
                    ? document.documentElement.classList.contains('dark')
                      ? 'bg-white/15 text-white shadow-inner'
                      : 'bg-blue-100 text-blue-900 shadow-inner'
                    : document.documentElement.classList.contains('dark')
                      ? 'text-white/80 hover:bg-white/10 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
                type="button"
              >
                <Icon className="w-3 h-3 shrink-0" />
                <span className="text-xs whitespace-nowrap">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeMenu;
