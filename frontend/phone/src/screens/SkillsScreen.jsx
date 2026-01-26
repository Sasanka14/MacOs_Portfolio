import React from "react";
import { AppHeader } from "#components";
import { techStack } from "#constants";
import { Check, Code, Database, Smartphone, Palette, Server, GitBranch } from "lucide-react";

/**
 * iOS-style Skills Screen - Settings app style list
 */
const SkillsScreen = ({ onClose }) => {
  const categoryIcons = {
    Frontend: Code,
    Mobile: Smartphone,
    Styling: Palette,
    Backend: Server,
    Database: Database,
    "Dev Tools": GitBranch,
  };

  const categoryColors = {
    Frontend: "#007AFF",
    Mobile: "#5856D6",
    Styling: "#FF2D55",
    Backend: "#34C759",
    Database: "#FF9500",
    "Dev Tools": "#8E8E93",
  };

  return (
    <>
      <AppHeader title="Skills" onBack={onClose} />
      
      <div className="app-content hide-scrollbar px-4 pt-4 pb-24">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">Tech Stack</h2>
          <p className="text-[--color-ios-gray] text-sm">
            Technologies I work with
          </p>
        </div>

        {/* Skills by Category */}
        {techStack.map((category) => {
          const Icon = categoryIcons[category.category] || Code;
          const color = categoryColors[category.category] || "#007AFF";

          return (
            <div key={category.category} className="mb-6">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-3 px-1">
                <div 
                  className="w-8 h-8 rounded-lg flex-center"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {category.category}
                </h3>
              </div>

              {/* Skills List */}
              <div className="ios-card">
                {category.items.map((skill, index) => (
                  <div key={skill} className="ios-list-item">
                    <div className="ios-list-item-content">
                      <p className="ios-list-item-title">{skill}</p>
                    </div>
                    <Check className="w-5 h-5 text-[--color-ios-green]" />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Footer Stats */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[--color-ios-green]/20">
            <Check className="w-4 h-4 text-[--color-ios-green]" />
            <span className="text-[--color-ios-green] text-sm font-medium">
              {techStack.reduce((acc, cat) => acc + cat.items.length, 0)} technologies
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillsScreen;
