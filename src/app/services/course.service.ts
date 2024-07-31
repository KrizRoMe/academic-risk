import { prisma } from "@/libs/prisma";

export async function getCourses() {
  try {
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        teacherId: true,
        semester: true,
        year: true,
        teacher: {
          select: {
            name: true,
          },
        },
      },
    });

    const flattenedCourses = courses.map((course) => ({
      ...course,
      teacher: course.teacher.name,
    }));

    return flattenedCourses;
  } catch (error) {
    throw new Error(`Database error!`);
  }
}

export async function getCoursesByStudentId(studentCode: string) {
  try {
    const student = await prisma.student.findUnique({
      where: {
        code: studentCode,
      },
    });

    if (!student) {
      throw new Error(`No student found with code: ${studentCode}`);
    }

    const grades = await prisma.grade.findMany({
      where: {
        studentId: student.id,
      },
      select: {
        course: {
          select: {
            id: true,
            name: true,
            code: true,
            teacherId: true,
            semester: true,
            year: true,
            teacher: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const courses = grades.map((grade) => grade.course);
    const uniqueCourses = Array.from(new Set(courses.map((course) => course.id))).map((id) => 
      courses.find((course) => course.id === id)
    );
    const flattenedCourses = uniqueCourses.map((course) => ({
      ...course,
      teacher: course?.teacher.name,
    }));

    return flattenedCourses;
  } catch (error) {
    throw new Error(`Database error!`);
  }
}