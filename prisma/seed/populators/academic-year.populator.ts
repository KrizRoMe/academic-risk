import { prisma } from "../utils/main.utils";
import { academicYearData } from "../../data/academic-year.data";

export const academicYearPopulator = async () => {
  for (const academicYear of academicYearData) {
    const { id, ...data } = academicYear;

    const academicYearFound = await prisma.academicYear.findUnique({
      where: { id },
    });

    if (!academicYearFound) {
      await prisma.academicYear.create({ data });
    }
  }
};
