import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const windowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const windowState = windows[windowKey];
    
    if (!windowState) {
      console.error(`Window "${windowKey}" not found in store`);
      return null;
    }
    
    const { isOpen, zIndex } = windowState;
    const ref = useRef(null);

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
          duration: 0.5,
          ease: "power3.out",
        }
      );
    }, [isOpen]);

    useGSAP(() => {
      const element = ref.current;
      if (!element || !isOpen) return;

      const [instance] = Draggable.create(element, {
        onPress: () => focusWindow(windowKey),
      });
      return()=>instance.kill();
    }, [isOpen]);

    useLayoutEffect(() => {
      const element = ref.current;
      if (!element) return;
      element.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
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
