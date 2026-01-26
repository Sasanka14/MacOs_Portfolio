import React from "react";
import { ChevronLeft } from "lucide-react";
import AboutScreen from "#screens/AboutScreen";
import ProjectsScreen from "#screens/ProjectsScreen";
import SkillsScreen from "#screens/SkillsScreen";
import GalleryScreen from "#screens/GalleryScreen";
import BlogScreen from "#screens/BlogScreen";
import ContactScreen from "#screens/ContactScreen";
import ResumeScreen from "#screens/ResumeScreen";

/**
 * App View container - renders the appropriate app screen
 */
const AppView = ({ appId, onClose }) => {
  const appScreens = {
    about: AboutScreen,
    projects: ProjectsScreen,
    skills: SkillsScreen,
    gallery: GalleryScreen,
    blog: BlogScreen,
    contact: ContactScreen,
    resume: ResumeScreen,
  };

  const AppScreen = appScreens[appId];

  if (!AppScreen) {
    return (
      <div className="app-screen flex-center animate-scale-in">
        <div className="text-white text-center">
          <p className="text-xl mb-4">App not found</p>
          <button 
            onClick={onClose}
            className="text-[--color-ios-blue]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-screen animate-scale-in flex flex-col">
      <AppScreen onClose={onClose} />
      
      {/* Home Indicator */}
      <div 
        className="absolute bottom-2 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={onClose}
      >
        <div className="home-indicator bg-white/50" />
      </div>
    </div>
  );
};

// Reusable App Header component
export const AppHeader = ({ title, onBack, rightAction }) => (
  <div className="app-header">
    <button onClick={onBack} className="app-back-button">
      <ChevronLeft className="w-5 h-5" />
      <span>Back</span>
    </button>
    <h1 className="app-header-title">{title}</h1>
    <div className="w-16 flex justify-end">
      {rightAction}
    </div>
  </div>
);

export default AppView;
