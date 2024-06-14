import { prisma } from "@/libs/prisma";
import { studentData } from "../../data/student.data";

export const studentPopulator = async () => {
  for (const student of studentData) {
    const { id } = student;
    const studentFound = await prisma.student.findUnique({
      where: { id },
    });

    if (!studentFound) {
      await prisma.student.create({ data: student });
    }
  }
};
