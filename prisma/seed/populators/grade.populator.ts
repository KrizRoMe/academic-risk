import { prisma } from "@/libs/prisma";
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
        yearId: grade.academicPeriod.year,
        semester: grade.academicPeriod.semester,
      },
    });

    if (!course || !student || !academicPeriod) {
      throw new Error("Course, student or academic period not found");
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
