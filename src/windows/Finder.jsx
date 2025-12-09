import WindowControls from "#components/WindowControls";
import { Search } from "lucide-react";
import React from "react";
import windowWrapper from "#hoc/WindowWrapper";
import { locations } from "#constants";
import useLocationStore from "#store/location";
import clsx from "clsx";
import useWindowStore from "#store/window";
const Finder = () => {
  const {openWindow} = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  const openItem = (item) => {
    // Validate item exists
    if (!item) {
      console.warn('Cannot open item: item is null or undefined', item);
      return;
    }

    if (item.fileType === 'pdf') return openWindow('resume');
    if (item.kind === 'folder') return setActiveLocation(item);
    
    // Handle fig and url types with explicit href validation
    if (['fig', 'url'].includes(item.fileType)) {
      if (item.href) {
        const newWindow = window.open(item.href, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
        return;
      } else {
        console.warn(`Missing href for ${item.fileType} file: ${item.name}`, item);
        return; // Early return to avoid fallback
      }
    }
    
    if (item.fileType === 'txt') return openWindow('txtfile', item);
    if (item.fileType === 'img') return openWindow('imgfile', item);

    // Defensive fallback: validate fileType and kind before concatenating
    const fileType = typeof item.fileType === 'string' ? item.fileType : 'unknown';
    const kind = typeof item.kind === 'string' ? item.kind : 'unknown';

    if (fileType === 'unknown' || kind === 'unknown') {
      console.warn(`Cannot open item with invalid fileType or kind. fileType: "${fileType}", kind: "${kind}", item:`, item);
      return;
    }

    openWindow(`${fileType}${kind}`, item);
  };

  const renderList = (name, items) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              item.id === activeLocation.id ? "active" : "not-active"
            )}
          >
            <img src={item.icon} alt={item.name} className="w-4" />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          {renderList("favorites", Object.values(locations))}
          {renderList("works", locations.work.children)}
        </div>
         <ul className="content">
        {activeLocation?.children?.map((item)=>(
            <li key={item.id} className={item.position} onClick={()=> openItem(item)}>
                <img src={item.icon} alt={item.name} />
                <p>{item.name}</p>
            </li>
        ))}
      </ul>
      </div>

    </>
  );
};

const FinderWindow = windowWrapper(Finder, "finder");

export default FinderWindow;
