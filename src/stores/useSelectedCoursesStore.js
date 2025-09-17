import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSelectedCoursesStore = create(
  persist(
    (set) => ({
      selectedCourses: [],
      setSelectedCourses: (state) => set({ selectedCourses: state }),
    }),
    {
      name: "selected-courses-storage", // name for localStorage key
    }
  )
);
