import useWindowStore from "#store/window";
import React from "react";

const WindowControls = ({ target }) => {
  const { closeWindow } = useWindowStore();

  return (
    <div id="window-controls">
      <button 
        className="close" 
        onClick={() => closeWindow(target)}
        aria-label="Close window"
        type="button"
      />
      <button className="minimize" aria-label="Minimize window" type="button" disabled />
      <button className="maximize" aria-label="Maximize window" type="button" disabled />
    </div>
  );
};

export default WindowControls;
