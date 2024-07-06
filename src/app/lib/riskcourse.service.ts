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

    // Flatten the semester, year and course name in the result
    const flattenedRiskCourses = riskCourses.map(riskCourse => ({
      ...riskCourse,
      semester: riskCourse.academicPeriod.semester,
      year: riskCourse.academicPeriod.year.year,
      course: riskCourse.course.name,
    }));

    return flattenedRiskCourses;
  } catch (error) {
    throw new Error(`Database error! : ${error}`);
  }
}