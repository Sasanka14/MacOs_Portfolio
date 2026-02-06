import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "#shared/constants";

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create(immer((set)=> ({
    activeLocation: DEFAULT_LOCATION,

    setActiveLocation: (location) => set((state) => {
        state.activeLocation = location;
    }),

    resetLocation: () => set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
    })

})))

export default useLocationStore;