import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStudentDetailStore = create(
  persist(
    (set) => ({
      student: null,
      setStudent: (studentData) => set({ student: studentData }),
      clearStudent: () => set({ student: null }),
    }),
    {
      name: "student-detail", // localStorage key
    }
  )
);
