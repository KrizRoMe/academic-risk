import { prisma } from "@/libs/prisma";
import { courseData } from "../../data/course.data";

export const coursePopulator = async () => {
  for (const course of courseData) {
    const { id } = course;
    const courseFound = await prisma.course.findUnique({
      where: { id },
    });

    if (!courseFound) {
      await prisma.course.create({ data: course });
    }
  }
};
