import { prisma } from "@/libs/prisma";

export async function getStudents() {
  try {
    const students = await prisma.student.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
        code: true,
        dni: true,
        },
    });

    return students;
  } catch (error) {
    throw new Error(`Database error!`);
  }
}
