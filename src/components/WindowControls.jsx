import useWindowStore from "#store/window";
import React from "react";

const WindowControls = ({ target }) => {
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindowStore();

  return (
    <div id="window-controls">
      <button 
        className="close" 
        onClick={() => closeWindow(target)}
        aria-label="Close window"
        type="button"
      />
      <button 
        className="minimize" 
        onClick={() => minimizeWindow(target)}
        aria-label="Minimize window" 
        type="button"
      />
      <button 
        className="maximize" 
        onClick={() => maximizeWindow(target)}
        aria-label="Maximize window" 
        type="button"
      />
    </div>
  );
};

export default WindowControls;
