import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Navbar, Welcome, Dock, Home, ThemeProvider, SearchPalette, LoadingScreen } from '#components'
import { Draggable } from "gsap/Draggable";
import { Terminal, Safari, Resume, Finder, Text, Image, Contact, Teams, Photos } from "#windows";
import React, { useState, useEffect } from "react";
gsap.registerPlugin(Draggable);

gsap.registerPlugin(useGSAP);

const App = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle loading screen - wait for page to be fully loaded
  useEffect(() => {
    let timerId;

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

  // Centralized global keyboard shortcut handler
  useEffect(() => {
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
