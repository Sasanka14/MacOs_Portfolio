import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Navbar, Welcome, Dock, Home, ThemeProvider, SearchPalette, LoadingScreen } from '#components'
import { Draggable } from "gsap/Draggable";
import { Terminal, Safari, Resume, Finder, Text, Image, Contact, Teams, Photos } from "#windows";
import React, { useState, useEffect } from "react";

// Register GSAP plugins
gsap.registerPlugin(Draggable);
gsap.registerPlugin(useGSAP);

/**
 * Root application component for the macOS-inspired portfolio.
 * Manages global state for loading screen and search palette, and renders all window components.
 * 
 * @component
 * @returns {JSX.Element} The complete portfolio application
 * 
 * @example
 * <App />
 */
const App = () => {
  /** @type {[boolean, Function]} State for controlling the search palette visibility */
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  /** @type {[boolean, Function]} State for controlling the loading screen visibility */
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Effect: Handles the initial loading screen display.
   * Waits for the page to be fully loaded, then shows a minimum 1-second loading duration.
   */
  useEffect(() => {
    /** @type {number|undefined} Timer ID for the loading delay */
    let timerId;

    /**
     * Handler called when the page load event fires.
     * Sets a timeout to ensure minimum loading screen duration.
     */
    const handleLoad = () => {
      // Ensure minimum loading screen duration for visual polish (~1 second)
      timerId = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(timerId);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  /**
   * Effect: Centralized global keyboard shortcut handler.
   * Listens for Cmd/Ctrl + Space to toggle the search palette.
   */
  useEffect(() => {
    /**
     * Handles global keydown events for keyboard shortcuts.
     * @param {KeyboardEvent} e - The keyboard event
     */
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <ThemeProvider>
      <LoadingScreen isLoading={isLoading} onLoadingComplete={() => setIsLoading(false)} />
      <main>
        <SearchPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <Navbar onSearchOpen={() => setIsSearchOpen(true)} />
        <Welcome />
        <Dock/>
        <Home/>

        <Terminal/>
        <Safari/>
        <Resume/>
        <Finder/>
        <Text/>
        <Image/>
        <Contact/>
        <Teams/>
        <Photos/>
      </main>
    </ThemeProvider>
  )
}

export default App
