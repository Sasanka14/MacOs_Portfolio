import React, { useEffect, useState } from 'react';
import useTheme from '#hooks/useTheme';

const ThemeProvider = ({ children }) => {
  const { mounted } = useTheme();
  const [renderReady, setRenderReady] = useState(false);

  useEffect(() => {
    // Mark as ready to render after theme is applied
    if (mounted) {
      setRenderReady(true);
    }
  }, [mounted]);

  // Don't render until theme is applied to prevent flash
  if (!renderReady) {
    return null;
  }

  return <>{children}</>;
};

export default ThemeProvider;
