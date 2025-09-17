import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBookingStore = create(
  persist(
    (set) => ({
      bookings: [],
      setBookings: (state) => set({ bookings: state }),
    }),
    {
      name: "booking", // name for localStorage key
    }
  )
);
