import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAllStudentsDetailStore = create(
  persist(
    (set) => ({
      students: [],
      setStudents: (studentData) => set({ students: studentData }),
      clearStudents: () => set({ student: null }),
    }),
    {
      name: "all-student-detail", // localStorage key
    }
  )
);
