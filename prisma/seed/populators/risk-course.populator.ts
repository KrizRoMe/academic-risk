import { prisma } from "../utils/main.utils";
import { riskCourseData } from "../../data/risk-course.data";

export const riskCoursePopulator = async () => {
  for (const riskCourse of riskCourseData) {
    const { id, ...data } = riskCourse;

    const riskCourseFound = await prisma.riskCourse.findUnique({
      where: { id },
    });

    if (!riskCourseFound) {
      await prisma.riskCourse.create({ data });
    }
  }
};
