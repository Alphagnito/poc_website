import { useAllStudentsDetailStore } from "@/stores/useAllStudentsDetailStore";
import { useBookingStore } from "@/stores/useBookingStore";
import { useEffect, useState } from "react";

function ReportFormModal({ singleBooking, setOpen }) {
  const { students, setStudents } = useAllStudentsDetailStore((s) => s);
  const { bookings, setBookings } = useBookingStore((s) => s);
  console.log(bookings, singleBooking);
  const student = students.find((s) => s.aadharOrEMMIS === singleBooking?.booked_by);
  const [suggestedCourses, setSuggestedCourses] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student) return alert("Student not found");

    const updatedStudents = students.map((s) => (s.aadharOrEMMIS === singleBooking?.booked_by ? { ...s, suggested_courses: suggestedCourses } : s));
    setStudents(updatedStudents);

    // 2. Remove this booking from appointments
    // const filteredBookings = bookings.filter((app) => app.booked_by !== singleBooking?.booked_by);
    // setBookings(filteredBookings);

    alert("Report submitted successfully!");
    setOpen(false);
  };
  useEffect(() => {
    if (student?.suggested_courses) {
      setSuggestedCourses(student?.suggested_courses);
    }
  }, [student]);
  if (!student) {
    return <div className="text-danger p-4">No student data found for Aadhar: {singleBooking?.booked_by}</div>;
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="border rounded p-4 shadow-sm bg-light">
        <div className="mb-3">
          <label className="form-label">Student Name</label>
          <input type="text" className="form-control" value={student.name} disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Roll Number</label>
          <input type="text" className="form-control" value={student.rollNumber} disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Interested Course</label>
          <div style={{ background: "#e7e7e7", padding: "4px 10px", borderRadius: "4px" }}>
            {student?.selected_courses?.map((d, i) => (
              <span key={i}>{d} , </span>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Suggested Courses</label>
          <textarea className="form-control" rows={4} placeholder="Eg: BCA, B.Sc. Computer Science, Diploma in IT..." value={suggestedCourses} onChange={(e) => setSuggestedCourses(e.target.value)}></textarea>
        </div>
        <button type="submit" className="btn btn-success fw-bold px-4">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ReportFormModal;
