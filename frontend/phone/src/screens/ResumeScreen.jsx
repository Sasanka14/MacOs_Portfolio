import React from "react";
import { AppHeader } from "#components";
import { FileText, ExternalLink, Download } from "lucide-react";

/**
 * iOS-style Resume Screen - File viewer style
 */
const ResumeScreen = ({ onClose }) => {
  const resumeUrl = "/files/resume.pdf"; // Update with actual resume path

  const handleViewResume = () => {
    window.open(resumeUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Sasanka_Resume.pdf";
    link.click();
  };

  return (
    <>
      <AppHeader title="Resume" onBack={onClose} />
      
      <div className="app-content hide-scrollbar px-4 pt-4 pb-24 flex flex-col items-center justify-center">
        {/* Resume Icon */}
        <div className="w-32 h-40 bg-white rounded-lg shadow-2xl mb-6 relative overflow-hidden">
          {/* PDF Visual */}
          <div className="absolute inset-0 flex flex-col">
            <div className="h-8 bg-[--color-ios-red] flex items-center px-3">
              <span className="text-white text-xs font-semibold">PDF</span>
            </div>
            <div className="flex-1 p-3 space-y-2">
              <div className="h-2 bg-gray-200 rounded w-full" />
              <div className="h-2 bg-gray-200 rounded w-4/5" />
              <div className="h-2 bg-gray-200 rounded w-3/5" />
              <div className="h-2 bg-gray-200 rounded w-full" />
              <div className="h-2 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
          
          {/* Corner fold */}
          <div className="absolute top-0 right-0 w-6 h-6 bg-gray-100" 
               style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }} />
        </div>

        {/* Resume Info */}
        <h2 className="text-xl font-semibold text-white mb-2">
          My Resume
        </h2>
        <p className="text-[--color-ios-gray] text-center mb-8 max-w-xs">
          View or download my latest resume with skills, experience, and education
        </p>

        {/* Action Buttons */}
        <div className="w-full max-w-xs space-y-3">
          <button
            onClick={handleViewResume}
            className="w-full py-4 rounded-xl bg-[--color-ios-blue] text-white font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <ExternalLink className="w-5 h-5" />
            View Resume
          </button>
          
          <button
            onClick={handleDownload}
            className="w-full py-4 rounded-xl bg-white/10 text-white font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </button>
        </div>

        {/* Quick Stats */}
        <div className="mt-10 grid grid-cols-3 gap-4 w-full max-w-xs">
          <div className="text-center">
            <p className="text-2xl font-bold text-[--color-ios-blue]">3+</p>
            <p className="text-xs text-[--color-ios-gray]">Projects</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[--color-ios-green]">15+</p>
            <p className="text-xs text-[--color-ios-gray]">Technologies</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[--color-ios-orange]">1+</p>
            <p className="text-xs text-[--color-ios-gray]">Years</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeScreen;
