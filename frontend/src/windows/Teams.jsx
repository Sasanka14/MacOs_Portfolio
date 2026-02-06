import WindowControls from "#components/WindowControls";
import { Search } from "lucide-react";
import React from "react";
import windowWrapper from "#hoc/WindowWrapper";
import { locations, WINDOW_CONFIG } from "#shared/constants";
import useWindowStore from "#shared/store/window";

const Teams = () => {
  const { openWindow } = useWindowStore();
  const teamsData = locations.teams;
  const [currentView, setCurrentView] = React.useState(null);

  const openItem = (item) => {
    // Validate item exists
    if (!item) {
      console.warn('Cannot open item: item is null or undefined', item);
      return;
    }

    if (item.fileType === 'pdf') return openWindow('resume', item);
    if (item.kind === 'folder') return setCurrentView(item);

    // Handle fig and url types with explicit href validation
    if (['fig', 'url'].includes(item.fileType)) {
      if (item.href) {
        const newWindow = window.open(item.href, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
        return;
      } else {
        console.warn(`Missing href for ${item.fileType} file: ${item.name}`, item);
        return;
      }
    }

    if (item.fileType === 'txt') return openWindow('txtfile', item);
    if (item.fileType === 'img') return openWindow('imgfile', item);
    if (item.fileType === 'video') {
      if (item.href) {
        const newWindow = window.open(item.href, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
        return;
      } else {
        console.warn(`Missing href for video file: ${item.name}`, item);
        return;
      }
    }

    // Defensive fallback: validate fileType and kind before concatenating
    const fileType = typeof item.fileType === 'string' ? item.fileType : 'unknown';
    const kind = typeof item.kind === 'string' ? item.kind : 'unknown';

    if (fileType === 'unknown' || kind === 'unknown') {
      console.warn(`Cannot open item with invalid fileType or kind. fileType: "${fileType}", kind: "${kind}", item:`, item);
      return;
    }

    // Validate concatenated key exists in WINDOW_CONFIG
    const windowKey = `${fileType}${kind}`;
    if (!WINDOW_CONFIG[windowKey]) {
      console.warn(`Window config not found for key "${windowKey}". fileType: "${fileType}", kind: "${kind}", item:`, item);
      return;
    }

    openWindow(windowKey, item);
  };

  const displayItems = currentView ? currentView.children : teamsData.children;
  const isInMemberView = currentView !== null;

  return (
    <>
      <div id="window-header">
        <WindowControls target="teams" />
        <h2>Teams</h2>
        <Search className="icon" />
      </div>

      <div className="bg-white dark:bg-gray-900 flex h-full flex-col">
        {/* Breadcrumb Navigation */}
        {isInMemberView && (
          <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center gap-2">
            <button
              onClick={() => setCurrentView(null)}
              className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
            >
              Teams
            </button>
            <span className="text-gray-400 dark:text-gray-600">/</span>
            <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{currentView?.name}</span>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {displayItems?.map((item) => (
              <div
                key={item.id}
                onClick={() => openItem(item)}
                className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg shadow-sm"
                />
                <p className="text-center text-sm font-medium truncate max-w-full dark:text-gray-300">
                  {item.name}
                </p>
              </div>
            ))}
          </div>

          {displayItems?.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-600">
              <p>No items to display</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const WrappedTeams = windowWrapper(Teams, "teams");
export default WrappedTeams;
