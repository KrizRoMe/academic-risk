import { prisma } from "../utils/main.utils";
import { gradeData } from "../../data/grade.data";

export const gradePopulator = async () => {
  for (const grade of gradeData) {
    const course = await prisma.course.findFirst({
      where: { code: grade.courseCode },
    });
    const student = await prisma.student.findFirst({
      where: { code: grade.studentCode },
    });
    const academicPeriod = await prisma.academicPeriod.findFirst({
      where: {
        yearId: 1,
        semester: 1,
      },
    });

    if (!course) {
      throw new Error("Course not found");
    }
    if (!student) {
      throw new Error("Student not found");
    }
    if (!academicPeriod) {
      throw new Error("Academic period not found");
    }

    const gradeFound = await prisma.grade.findFirst({
      where: {
        studentId: student.id,
        courseId: course.id,
        academicPeriodId: academicPeriod.id,
      },
    });

    if (!gradeFound) {
      await prisma.grade.create({
        data: {
          value: grade.value,
          studentId: student.id,
          courseId: course.id,
          academicPeriodId: academicPeriod.id,
        },
      });
    }
  }
};
