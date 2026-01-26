import React from "react";
import { AppHeader } from "#components";
import { projectCards } from "#constants";
import { ExternalLink, Folder } from "lucide-react";

/**
 * iOS-style Projects Screen - Card-based layout
 */
const ProjectsScreen = ({ onClose }) => {
  const handleProjectClick = (project) => {
    if (project.link) {
      window.open(project.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <AppHeader title="Projects" onBack={onClose} />
      
      <div className="app-content hide-scrollbar px-4 pt-4 pb-24">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">My Work</h2>
          <p className="text-[--color-ios-gray] text-sm">
            Projects I've built and contributed to
          </p>
        </div>

        {/* Project Cards */}
        <div className="space-y-4">
          {projectCards.map((project) => (
            <button
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className="w-full text-left ios-card overflow-hidden active:scale-[0.98] transition-transform"
            >
              {/* Project Image */}
              <div 
                className="h-40 bg-cover bg-center relative"
                style={{ 
                  backgroundImage: `url(${project.image})`,
                  backgroundColor: project.color 
                }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* External Link Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 flex-center backdrop-blur-sm">
                  <ExternalLink className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Project Info */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="text-xs text-[--color-ios-gray] uppercase tracking-wide">
                    {project.subtitle}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-white/70">
                  {project.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* View More Link */}
        <div className="mt-6 text-center">
          <a 
            href="https://github.com/Sasanka14"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[--color-ios-blue]"
          >
            <Folder className="w-4 h-4" />
            <span>View all projects on GitHub</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectsScreen;
