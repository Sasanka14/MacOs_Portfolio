import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#shared/store/window";
import React from "react";

const Image = () => {
  const imgWindow = useWindowStore((state) => state.windows?.imgfile);
  const data = imgWindow?.data;

  if (!data) {
    return null;
  }

  const { name = 'Untitled Image', imageUrl } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{name}</h2>
      </div>

      <div className="bg-white p-5 h-full flex flex-col items-center justify-center overflow-auto">
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={name} 
            className="max-w-full max-h-full object-contain rounded"
          />
        )}
      </div>
    </>
  );
};

const ImageWindow = windowWrapper(Image, "imgfile");

export default ImageWindow;
