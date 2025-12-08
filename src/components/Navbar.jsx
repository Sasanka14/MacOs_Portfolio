{/* External Imports*/}
import dayjs from "dayjs";

{/* Internal Imports*/}
import { navIcons, navLinks, locations } from "#constants";
import React from "react";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";


const Navbar = () => {
  const {openWindow} = useWindowStore();
  const {setActiveLocation} = useLocationStore();
  
  const handleNavClick = (type, href) => {
    if (href) {
      return window.open(href, "_blank");
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
        <img src="/images/logo.svg" alt="Logo" />
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
                        <img src={img} className="icon-hover" alt={'icon-${id}'} />
                    </li>
                ))}
            </ul>

            <time>{dayjs().format("ddd D MMM  HH:mm")}</time>
        </div>
    </nav>
  );
};

export default Navbar;
