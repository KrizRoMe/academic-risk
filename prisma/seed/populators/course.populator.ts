import { prisma } from "../utils/main.utils";
import { courseData } from "../../data/course.data";

export const coursePopulator = async () => {
  for (const course of courseData) {
    console.log("course", course);

    const { id, ...data } = course;

    const courseFound = await prisma.course.findUnique({
      where: { id },
    });

    if (!courseFound) {
      await prisma.course.create({ data });
    }
  }
};
