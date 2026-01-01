import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Navbar, Welcome, Dock, Home, ThemeProvider, SearchPalette } from '#components'
import { Draggable } from "gsap/Draggable";
import { Terminal, Safari, Resume, Finder, Text, Image, Contact, Teams, Photos } from "#windows";
import React, { useState, useEffect } from "react";
gsap.registerPlugin(Draggable);

gsap.registerPlugin(useGSAP);

const App = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
