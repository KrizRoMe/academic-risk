import { prisma } from "@/libs/prisma";

export async function getRiskCourses() {
  try {
    const riskCourses = await prisma.riskCourse.findMany({
      select: {
        id: true,
        courseId: true,
        academicPeriodId: true,
        failures: true,
        updatedAt: true,
        createdAt: true,
        course: {
          select: {
            name: true,
          },
        },
        academicPeriod: {
          select: {
            semester: true,
            year: {
              select: {
                year: true,
              },
            },
          },
        },
      },
    });

    const flattenedRiskCourses = riskCourses.map((riskCourse) => ({
      ...riskCourse,
      semester: riskCourse.academicPeriod.semester,
      course: riskCourse.course.name,
    }));

    return flattenedRiskCourses;
  } catch (error) {
    throw new Error(`Database error! : ${error}`);
  }
}

export async function getRiskGradesByStudentId(studentId: number) {
  try {
    const grades = await prisma.grade.findMany({
      where: {
        studentId: studentId,
      },
      select: {
        courseId: true,
        academicPeriodId: true,
        value1: true,
        value2: true,
        value3: true,
        updatedAt: true,
        createdAt: true,
        course: {
          select: {
            name: true,
            code: true,
          },
        },
        academicPeriod: {
          select: {
            semester: true,
            year: {
              select: {
                year: true,
              },
            },
          },
        },
      },
    });

    const flattenedGrades = grades.map((grade) => {
      const average = (grade.value1 + grade.value2 + grade.value3) / 3;
      const failures = average < 10.5 ? 1 : 0;

    return {
        ...grade,
        failures: failures,
        semester: grade.academicPeriod.semester,
        course: grade.course.name,
        courseCode: grade.course.code,
      };
    });

    return flattenedGrades;
  } catch (error) {
    throw new Error(`Database error! : ${error}`);
  }
}