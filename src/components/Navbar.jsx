{/* External Imports*/}
import dayjs from "dayjs";

{/* Internal Imports*/}
import { navIcons, navLinks, locations } from "#constants";
import React, { useState, useEffect } from "react";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";
import ThemeMenu from "./ThemeMenu";
import UserMenu from "./UserMenu";


const Navbar = ({ onSearchOpen }) => {
  const {openWindow} = useWindowStore();
  const {setActiveLocation} = useLocationStore();
  
  const handleNavClick = (type, href) => {
    if (href) {
      const newWindow = window.open(href, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
      return;
    }
    if (type === 'about') {
      setActiveLocation(locations.about);
      return openWindow('finder');
    }
    if (type === 'finder') {
      setActiveLocation(locations.work);
      return openWindow('finder');
    }
    openWindow(type);
  };

  return (
    <nav>
        {/* Left Side */}
      <div>
        <img src="/images/logo.svg" alt="Logo" className="dark:invert" />
        <p className="font-bold">SasankaWrites</p>

        <ul>
          {navLinks.map(({id , name, type, href}) => (
            <li key={id} onClick={()=> handleNavClick(type, href)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
        {/* Right Side */}
        <div>
            <ul>
                {navIcons.map(({id,img, alt}) => (
                    <li key={id}>
                        {id === 4 ? (
                          <ThemeMenu />
                        ) : id === 3 ? (
                          <UserMenu />
                        ) : id === 2 ? (
                          <img
                            src={img}
                            className="icon-hover cursor-pointer"
                            alt={`icon-${id}`}
                            onClick={() => onSearchOpen()}
                          />
                        ) : (
                          <img src={img} className="icon-hover" alt={`icon-${id}`} />
                        )}
                    </li>
                ))}
            </ul>

            <time>{dayjs().format("ddd D MMM  HH:mm")}</time>
        </div>
    </nav>
  );
};

export default Navbar;
