import { prisma } from "../utils/main.utils";
import { academicPeriodData } from "../../data/academic-period.data";

export const academicPeriodPopulator = async () => {
  for (const academicPeriod of academicPeriodData) {
    const { id, ...data } = academicPeriod;
    const academicPeriodFound = await prisma.academicPeriod.findUnique({
      where: { id },
    });

    if (!academicPeriodFound) {
      await prisma.academicPeriod.create({ data });
    }
  }
};
