import { dockApps } from "#constants";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useCallback } from "react";
import { Tooltip } from "react-tooltip";

const Dock = () => {
  const { openWindow, closeWindow, minimizeWindow, focusWindow, windows } = useWindowStore();
  const dockRef = useRef(null);

  const toggleApp = useCallback(
    (app) => {
      if (!app?.canOpen) return;

      const winState = windows?.[app.id];
      if (!winState) return;

      // If minimized, unminimize it
      if (winState.isMinimized) {
        focusWindow(app.id);
      }
      // If already open and not minimized, close it
      else if (winState.isOpen) {
        closeWindow(app.id);
      }
      // Otherwise, open it
      else {
        openWindow(app.id);
      }

      // If you need the latest state immediately use:
      // console.log(useWindowStore.getState().windows);
    },
    [windows, openWindow, closeWindow, minimizeWindow, focusWindow]
  );

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const iconContainers = dock.querySelectorAll(".dock-icon-container");

    const animateIcons = (mouseX) => {
      const { left } = dock.getBoundingClientRect();

      iconContainers.forEach((container) => {
        const icon = container.querySelector(".dock-icon");
        const indicator = container.querySelector(".dock-indicator");
        const { left: containerLeft, width } = container.getBoundingClientRect();
        const center = containerLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 2.5) / 20000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });

        if (indicator) {
          gsap.to(indicator, {
            scale: 1.2 + 0.3 * intensity,
            y: -15 * intensity,
            duration: 0.2,
            ease: "power1.out",
          });
        }
      });
    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();
      animateIcons(e.clientX - left);
    };

    const resetIcons = () =>
      iconContainers.forEach((container) => {
        const icon = container.querySelector(".dock-icon");
        const indicator = container.querySelector(".dock-indicator");

        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        });

        if (indicator) {
          gsap.to(indicator, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power1.out",
          });
        }
      });

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => {
          const isMinimized = windows?.[id]?.isMinimized ?? false;
          
          return (
            <div key={id} className="dock-icon-container relative flex justify-center">
              <button
                type="button"
                className="dock-icon"
                aria-label={name}
                data-tooltip-id="dock-tooltip"
                data-tooltip-content={name}
                data-tooltip-delay-show={150}
                disabled={!canOpen}
                onClick={() => toggleApp({ id, canOpen })}
              >
                <img
                  src={`/images/${icon}`}
                  alt={name}
                  loading="lazy"
                  className={canOpen ? "" : "opacity-60"}
                />
              </button>
              {isMinimized && <div className="dock-indicator" />}
            </div>
          );
        })}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
