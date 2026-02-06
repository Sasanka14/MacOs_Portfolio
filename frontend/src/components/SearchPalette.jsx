import React, { useEffect, useRef } from 'react';
import { Search, Command, Folder, File } from 'lucide-react';
import useSearch from '#hooks/useSearch';
import useWindowStore from '#shared/store/window';
import useLocationStore from '#shared/store/location';
import { locations } from '#shared/constants';

const SearchPalette = ({ isOpen, onClose }) => {
  const { query, setQuery, results, selectedIndex, setSelectedIndex, handleKeyDown, activeScope } = useSearch();
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const { openWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();

  // Auto-focus input when palette opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle Escape key to close palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Handle result selection
  const handleSelect = (result) => {
    if (result.type === 'app') {
      openWindow(result.appId);
    } else if (result.type === 'folder') {
      // For nested folders, set the parent location and pass folder data
      if (result.isRootFolder) {
        // Top-level folder (work, about, archive, etc.)
        setActiveLocation(locations[result.folderType]);
      } else {
        // Nested folder - set parent location and pass folder object
        setActiveLocation(locations[result.folderType], result.folderObject);
      }
      openWindow('finder');
    } else if (result.type === 'file') {
      // Handle file opening based on type
      console.log('Opening file:', result.label, 'Type:', result.fileType, 'Data:', result.file);
      
      if (result.fileType === 'txt') {
        // For nested files, pass full file data
        openWindow('txtfile', result.file);
      } else if (result.fileType === 'img') {
        openWindow('imgfile', result.file);
      } else if (result.fileType === 'url') {
        if (result.file.href) {
          window.open(result.file.href, '_blank', 'noopener,noreferrer');
        }
      } else if (result.fileType === 'pdf') {
        if (result.file.href) {
          window.open(result.file.href, '_blank', 'noopener,noreferrer');
        }
      }
    } else if (result.type === 'nav') {
      if (result.href) {
        window.open(result.href, '_blank', 'noopener,noreferrer');
      } else if (result.navType === 'about') {
        setActiveLocation(locations.about);
        openWindow('finder');
      } else if (result.navType === 'finder') {
        setActiveLocation(locations.work);
        openWindow('finder');
      } else {
        openWindow(result.navType);
      }
    } else if (result.type === 'command') {
      if (result.action === 'setTheme') {
        window.dispatchEvent(
          new CustomEvent('themeChange', { detail: { theme: result.theme } })
        );
      }
    } else if (result.type === 'calculation') {
      navigator.clipboard.writeText(result.value.toString());
    }
    
    onClose();
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    }
    handleKeyDown(e);
  };

  // Close on background click
  const handleBackgroundClick = (e) => {
    if (e.target === containerRef.current) {
      onClose();
    }
  };

  // Get icon for result type
  const getResultIcon = (result) => {
    if (result.type === 'folder') {
      return <Folder className="w-4 h-4" />;
    } else if (result.type === 'file') {
      return <File className="w-4 h-4" />;
    } else if (result.type === 'calculation') {
      return <span className="text-sm font-semibold">=</span>;
    } else if (result.type === 'app' && result.icon) {
      return <img src={`/${result.icon}`} alt="" className="w-5 h-5" />;
    }
    return <Search className="w-4 h-4 opacity-50" />;
  };

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      onClick={handleBackgroundClick}
      className="fixed inset-0 z-9999 flex items-start justify-center pt-20 backdrop-blur-sm search-palette-overlay"
      style={{
        backgroundColor: document.documentElement.classList.contains('dark')
          ? 'rgba(0, 0, 0, 0.4)'
          : 'rgba(0, 0, 0, 0.2)',
      }}
    >
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl search-palette-container"
        style={{
          backgroundColor: document.documentElement.classList.contains('dark')
            ? 'rgba(30, 30, 30, 0.8)'
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          border: document.documentElement.classList.contains('dark')
            ? '1px solid rgba(255, 255, 255, 0.15)'
            : '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: document.documentElement.classList.contains('dark')
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Search Input */}
        <div
          className="p-4 border-b"
          style={{
            borderColor: document.documentElement.classList.contains('dark')
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="flex items-center gap-3">
            <Search
              className="w-5 h-5"
              style={{
                color: document.documentElement.classList.contains('dark')
                  ? '#9ca3af'
                  : '#6b7280',
              }}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Search folders, files, or type: open projects, find gallery in projects..."
              className="flex-1 bg-transparent outline-none text-lg"
              style={{
                color: document.documentElement.classList.contains('dark')
                  ? '#f3f4f6'
                  : '#1f2937',
              }}
            />
            <kbd
              className="px-2 py-1 rounded text-xs font-medium"
              style={{
                backgroundColor: document.documentElement.classList.contains('dark')
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.05)',
                color: document.documentElement.classList.contains('dark')
                  ? '#d1d5db'
                  : '#6b7280',
              }}
            >
              esc
            </kbd>
          </div>

          {/* Scope Indicator */}
          {activeScope && (
            <div
              className="mt-2 text-xs font-medium px-2 py-1 rounded"
              style={{
                color: document.documentElement.classList.contains('dark')
                  ? '#60a5fa'
                  : '#2563eb',
              }}
            >
              {activeScope}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <div
              className="py-12 text-center"
              style={{
                color: document.documentElement.classList.contains('dark')
                  ? '#9ca3af'
                  : '#9ca3af',
              }}
            >
              <p>{query.trim() ? 'No results found' : 'Start typing to search...'}</p>
            </div>
          ) : (
            results.map((result, index) => (
              <button
                key={result.id}
                onClick={() => handleSelect(result)}
                onMouseEnter={() => setSelectedIndex(index)}
                className="w-full px-4 py-3 flex items-center gap-3 transition-all duration-150 border-t search-result-item text-left"
                style={{
                  backgroundColor:
                    index === selectedIndex
                      ? document.documentElement.classList.contains('dark')
                        ? 'rgba(255, 255, 255, 0.15)'
                        : 'rgba(59, 130, 246, 0.15)'
                      : 'transparent',
                  borderColor: document.documentElement.classList.contains('dark')
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.05)',
                  color: document.documentElement.classList.contains('dark')
                    ? '#f3f4f6'
                    : '#1f2937',
                }}
              >
                {/* Icon */}
                <div className="shrink-0 w-8 h-8 rounded flex items-center justify-center opacity-60">
                  {getResultIcon(result)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{result.label}</div>
                  <div
                    className="text-xs opacity-60 truncate"
                    style={{
                      color: document.documentElement.classList.contains('dark')
                        ? '#d1d5db'
                        : '#6b7280',
                    }}
                  >
                    {result.description || result.path}
                  </div>
                </div>

                {/* Shortcut hint */}
                {index === selectedIndex && (
                  <kbd
                    className="shrink-0 px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: document.documentElement.classList.contains('dark')
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(0, 0, 0, 0.1)',
                      color: document.documentElement.classList.contains('dark')
                        ? '#d1d5db'
                        : '#6b7280',
                    }}
                  >
                    ⏎
                  </kbd>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPalette;
