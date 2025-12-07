import { WindowControls } from "#components";
import windowWrapper from "#hoc/WindowWrapper";
import { Download } from "lucide-react";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Resume = () => {
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const handleLoadError = (err) => {
    setLoading(false);
    setError(err?.message || "Failed to load PDF");
  };

  return (
    <>
      {/* Window Header */}
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>

        <a
          href="files/resume.pdf"
          download
          className="cursor-pointer"
          title="Download resume"
        >
          <Download className="icon" />
        </a>
      </div>

      {/* Content */}
      <div className="p-4">
        {loading && (
          <div className="text-sm text-gray-500">
            Loading PDF…
          </div>
        )}

        {error && (
          <div className="text-sm text-red-600">
            Failed to load PDF: {error}
          </div>
        )}

        {!error && (
          <Document
            file="files/resume.pdf"
            onLoadSuccess={handleLoadSuccess}
            onLoadError={handleLoadError}
          >
            <Page
              pageNumber={1}
              renderTextLayer
              renderAnnotationLayer
            />
          </Document>
        )}
      </div>
    </>
  );
};

const ResumeWindow = windowWrapper(Resume, "resume");
export default ResumeWindow;
