import React, { useState } from "react";
import "./ScheduleMeetModal.css";
import counsellors from "@/jsons/counselors.json";
import { useBookingStore } from "@/stores/useBookingStore";
import { useStudentDetailStore } from "@/stores/useStudentDetailStore";
import { useAllStudentsDetailStore } from "@/stores/useAllStudentsDetailStore";
import { useSelectedCoursesStore } from "@/stores/useSelectedCoursesStore";
export default function ScheduleMeetModal({ setOpen }) {
  const [selectedCounsellor, setSelectedCounsellor] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const { bookings, setBookings } = useBookingStore((s) => s);
  const { student, setStudent } = useStudentDetailStore((state) => state);
  const { students, setStudents } = useAllStudentsDetailStore((state) => state);
  const { setSelectedCourses, selectedCourses } = useSelectedCoursesStore((s) => s);

  const handleSubmit = () => {
    if (selectedCourses?.length == 0) {
      alert(`You cannot book without selecting courses`);
      return;
    }
    const aadhar = localStorage.getItem("aadharOrEMMIS");

    const newBooking = {
      booked_by: aadhar,
      counselor: selectedCounsellor,
      slot: selectedSlot,
      meeting: "start",
    };
    // check if this user already booked
    const existingIndex = bookings.findIndex((b) => b.booked_by === aadhar);

    let updatedBookings;
    if (existingIndex !== -1) {
      // replace existing booking
      updatedBookings = [...bookings];
      updatedBookings[existingIndex] = newBooking;
    } else {
      // add new booking
      updatedBookings = [...bookings, newBooking];
    }

    setBookings(updatedBookings);
    alert(`Meeting scheduled with ${selectedCounsellor} at ${selectedSlot}`);
    setOpen(false);

    //updating all student details
    const existingStudentIndex = students.findIndex((s) => s.aadharOrEMMIS === aadhar);

    let updatedStudents;

    if (existingStudentIndex !== -1) {
      // Student exists, update their record
      updatedStudents = students.map((s) => (s.aadharOrEMMIS === aadhar ? { ...s, selected_courses: selectedCourses, ...student } : s));
    } else {
      // Student doesn't exist, add them
      updatedStudents = [...students, { ...student, aadharOrEMMIS: aadhar, selected_courses: selectedCourses }];
    }

    setStudents(updatedStudents);
  };
  // Filter out already booked slots for the selected counsellor
  const selectedCounsellorData = counsellors.find((c) => c.name === selectedCounsellor);

  const bookedSlots = bookings.filter((b) => b.counselor === selectedCounsellor).map((b) => b.slot);

  const availableSlots = selectedCounsellorData?.slots.filter((slot) => !bookedSlots.includes(slot)) || [];

  return (
    <div className="meet-modal">
      <h4>Schedule a Call with Counsellor</h4>
      <div className="form-group mb-3">
        <label>Select Counsellor</label>
        <select
          className="form-control"
          value={selectedCounsellor}
          onChange={(e) => {
            setSelectedCounsellor(e.target.value);
            setSelectedSlot("");
          }}
        >
          <option value="">-- Select --</option>
          {counsellors.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCounsellor && (
        <div className="form-group">
          <label>Available Slots</label>
          <div className="slot-container">
            {availableSlots.length === 0 && <div className="text-muted">No slots available</div>}
            {availableSlots.map((slot) => (
              <div key={slot} className={`slot-capsule ${selectedSlot === slot ? "active" : ""}`} onClick={() => setSelectedSlot(slot)}>
                {slot}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedSlot && (
        <button className="btn btn-danger mt-4 fw-bold" onClick={handleSubmit}>
          Confirm Slot
        </button>
      )}
    </div>
  );
}
