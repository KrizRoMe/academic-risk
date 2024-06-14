import { prisma } from "@/libs/prisma";
import { academicPeriodData } from "../../data/academic-period.data";

export const academicPeriodPopulator = async () => {
  for (const academicPeriod of academicPeriodData) {
    const { id } = academicPeriod;
    const academicPeriodFound = await prisma.academicPeriod.findUnique({
      where: { id },
    });

    if (!academicPeriodFound) {
      await prisma.academicPeriod.create({ data: academicPeriod });
    }
  }
};
