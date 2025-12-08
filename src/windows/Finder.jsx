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
    if (item.fileType === 'pdf') return openWindow('resume');
    if (item.kind === 'folder') return setActiveLocation(item);
    
    // Handle fig and url types with explicit href validation
    if (['fig', 'url'].includes(item.fileType)) {
      if (item.href) {
        return window.open(item.href, "_blank");
      } else {
        console.warn(`Missing href for ${item.fileType} file: ${item.name}`);
        return; // Early return to avoid fallback
      }
    }
    
    if (item.fileType === 'txt') return openWindow('txtfile', item);
    if (item.fileType === 'img') return openWindow('imgfile', item);

    openWindow(`${item.fileType}${item.kind}`, item);
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
