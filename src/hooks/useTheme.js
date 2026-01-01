import { useState, useEffect } from 'react';

const useTheme = () => {
  // Initialize state from localStorage immediately (synchronous)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'system';
    }
    return 'system';
  });

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'system';
      
      if (savedTheme === 'dark') {
        return true;
      } else if (savedTheme === 'light') {
        return false;
      } else {
        // System mode
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    }
    return false;
  });

  const [mounted, setMounted] = useState(false);

  // Apply theme function
  const applyTheme = (selectedTheme) => {
    // Save to localStorage
    localStorage.setItem('theme', selectedTheme);

    let shouldBeDark = false;

    if (selectedTheme === 'light') {
      // Force light mode
      shouldBeDark = false;
      document.documentElement.classList.remove('dark');
    } else if (selectedTheme === 'dark') {
      // Force dark mode
      shouldBeDark = true;
      document.documentElement.classList.add('dark');
    } else if (selectedTheme === 'system') {
      // Follow system preference
      shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', shouldBeDark);
    }

    setTheme(selectedTheme);
    setIsDark(shouldBeDark);
  };

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system';
    applyTheme(savedTheme);
    setMounted(true);
  }, []);

  // Listen for system theme changes (only when in System mode)
  useEffect(() => {
    // Only set up listener if theme is 'system' and component is mounted
    if (theme !== 'system' || !mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      const isDarkMode = e.matches;
      setIsDark(isDarkMode);
      document.documentElement.classList.toggle('dark', isDarkMode);
    };

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme, mounted]);

  // Listen for theme change events from SearchPalette
  useEffect(() => {
    const handleThemeChange = (e) => {
      applyTheme(e.detail.theme);
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  return {
    theme,
    isDark,
    applyTheme,
    mounted,
  };
};

export default useTheme;

