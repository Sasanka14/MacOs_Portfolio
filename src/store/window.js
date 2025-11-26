import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";

const useWindowStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) =>
      set((state) => {
        if (!state.windows[windowKey]) return;
        const win = state.windows[windowKey];
        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        win.isMinimized = false;
        win.isMaximized = false;
        state.nextZIndex++;
      }),
    closeWindow: (windowKey) =>
      set((state) => {
        if (!state.windows[windowKey]) return;
        const win = state.windows[windowKey];
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
        win.isMinimized = false;
        win.isMaximized = false;
      }),
    minimizeWindow: (windowKey) =>
      set((state) => {
        if (!state.windows[windowKey]) return;
        const win = state.windows[windowKey];
        win.isMinimized = !win.isMinimized;
      }),
    maximizeWindow: (windowKey) =>
      set((state) => {
        if (!state.windows[windowKey]) return;
        const win = state.windows[windowKey];
        win.isMaximized = !win.isMaximized;
        // Auto-unminimize when maximizing
        if (win.isMaximized && win.isMinimized) {
          win.isMinimized = false;
        }
      }),
    focusWindow: (windowKey) =>
      set((state) => {
        if (!state.windows[windowKey]) return;
        const win = state.windows[windowKey];
        win.zIndex = state.nextZIndex++;
        if (win.isMinimized) {
          win.isMinimized = false;
        }
      }),
  })),
);

export default useWindowStore;