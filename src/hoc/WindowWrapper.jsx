import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const windowWrapper = (Component, windowKey, options = {}) => {
  const { enableDrag = true } = options;
  
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const windowState = windows?.[windowKey] ?? {
      isOpen: false,
      zIndex: 1000,
      isMinimized: false,
      isMaximized: false,
      data: null,
    };
    
    const { isOpen, zIndex, isMinimized, isMaximized } = windowState;
    const ref = useRef(null);

    useLayoutEffect(() => {
      const element = ref.current;
      if (!element) return;
      
      // Hide window when minimized
      if (isMinimized) {
        element.style.display = "none";
      } else {
        element.style.display = isOpen ? "block" : "none";
      }
      
      // Handle maximize/unmaximize
      if (isMaximized) {
        element.classList.add("window-maximized");
      } else {
        element.classList.remove("window-maximized");
      }
    }, [isOpen, isMaximized, isMinimized]);

    useGSAP(() => {
      const element = ref.current;
      if (!element || !isOpen) return;

      gsap.fromTo(
        element,
        {
          scale: 0.8,
          opacity: 0,
          y: 40,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }, [isOpen]);

    useGSAP(() => {
      const element = ref.current;
      if (!element || !isOpen || isMinimized || isMaximized || !enableDrag) return;

      const header = element.querySelector("#window-header");
      if (!header) {
        const [instance] = Draggable.create(element, {
          onPress: () => focusWindow(windowKey),
          ignore: "input, textarea, button, a, .icon, .search",
        });
        return () => instance.kill();
      }

      const [instance] = Draggable.create(element, {
        trigger: header,
        onPress: () => focusWindow(windowKey),
      });
      return () => instance.kill();
    }, [isOpen, isMinimized, isMaximized, focusWindow, enableDrag]);

    return (
      <section 
        id={windowKey} 
        ref={ref} 
        style={{ 
          zIndex,
          overflow: 'hidden',
          willChange: 'transform, opacity',
        }} 
        className="absolute"
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default windowWrapper;
