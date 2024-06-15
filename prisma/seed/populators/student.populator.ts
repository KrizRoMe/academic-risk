import { prisma } from "../utils/main.utils";
import { studentData } from "../../data/student.data";

export const studentPopulator = async () => {
  for (const student of studentData) {
    const { id, ...data } = student;

    const studentFound = await prisma.student.findUnique({
      where: { id },
    });

    if (!studentFound) {
      await prisma.student.create({ data });
    }
  }
};
