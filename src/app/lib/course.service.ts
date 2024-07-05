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
        teacher: {
          select: {
            name: true,
          },
        },
      },
    });

    // Flatten the teacher name in the result
    const flattenedCourses = courses.map(course => ({
      ...course,
      teacher: course.teacher.name,
    }));

    return flattenedCourses;
  } catch (error) {
    throw new Error(`Database error!`);
  }
}