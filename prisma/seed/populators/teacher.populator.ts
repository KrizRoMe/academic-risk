import { prisma } from "../utils/main.utils";
import { teacherData } from "../../data/teacher.data";

export const teacherPopulator = async () => {
  for (const teacher of teacherData) {
    const { id, ...data } = teacher;

    const teacherFound = await prisma.teacher.findUnique({
      where: { id },
    });

    if (!teacherFound) {
      await prisma.teacher.create({ data });
    }
  }
};