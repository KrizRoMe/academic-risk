import { prisma } from "@/libs/prisma";

export async function getTeachers() {
  try {
    const teachers = await prisma.teacher.findMany({
      select: {
        id: true,
        name: true,
        lastname: true,
        dni: true,
        },
    });

    return teachers;
  } catch (error) {
    throw new Error(`Database error!`);
  }
}
