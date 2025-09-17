import { useStudentDetailStore } from "@/stores/useStudentDetailStore";
import benefits from "@/jsons/benefits.json";

export default function getStudentBenefits() {
  const { student, setStudent } = useStudentDetailStore((state) => state);
  const {
    caste,
    totalFamilyIncome,
    "12th": { subjects },
    firstGraduate,
    pwdStatus,
  } = student;
  const averageMark = Object.values(subjects).reduce((a, b) => a + b, 0) / Object.keys(subjects).length;

  const eligibleBenefits = benefits.filter((benefit) => {
    const {
      eligibility: { caste: allowedCaste, maxIncome, minMarks, firstGraduate: fg, pwdStatus: pwd },
    } = benefit;

    return (
      (!allowedCaste || allowedCaste.includes(caste)) &&
      (!maxIncome || totalFamilyIncome <= maxIncome) &&
      (!minMarks || averageMark >= minMarks) &&
      (fg === undefined || fg === firstGraduate) &&
      (pwd === undefined || pwd === pwdStatus)
    );
  });
  return eligibleBenefits;
}
