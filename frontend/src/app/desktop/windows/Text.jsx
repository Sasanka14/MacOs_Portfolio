import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#shared/store/window";
import React from "react";

const Text = () => {
  const textWindow = useWindowStore((state) => state.windows?.txtfile);
  const data = textWindow?.data;

  if (!data) {
    return null;
  }

  const { name, image, subtitle, description } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
      </div>

      <div className="bg-white dark:bg-gray-900 p-5 space-y-6">
        {image && (
          <div className="w-full">
            <img 
              src={image} 
              alt={name} 
              className="w-full max-h-[50vh] rounded"
            />
          </div>
        )}

        {subtitle && (
          <h3 className="text-lg font-semibold dark:text-gray-100">{subtitle}</h3>
        )}

        {description && Array.isArray(description) && (
          <div className="space-y-4">
            {description.map((paragraph, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-3 text-base">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const TextWindow = windowWrapper(Text, "txtfile");

export default TextWindow;
