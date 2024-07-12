import { prisma } from "@/libs/prisma";
export async function getGrades() {
  try {
    const grades = await prisma.grade.findMany({
      select: {
        id: true,
        value1: true,
        value2: true,
        value3: true,
        studentId: true,
        courseId: true,
        academicPeriodId: true,
        createdAt: true,
        updatedAt: true,
        student: {
          select: {
            name: true,
            surname: true,
          },
        },
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

    const flattenedGrades = grades.map((grade) => ({
      ...grade,
      semester: grade.academicPeriod.semester,
      year: grade.academicPeriod.year.year,
      student: grade.student.name + " " + grade.student.surname,
      course: grade.course.name,
      promedio: (grade.value1 + grade.value2 + grade.value3) / 3,
    }));

    return flattenedGrades;
  } catch (error) {
    throw new Error(`Database error!`);
  }
}
