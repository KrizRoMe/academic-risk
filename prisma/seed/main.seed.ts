import { academicPeriodPopulator } from "./populators/academic-period.populator";
import { academicYearPopulator } from "./populators/academic-year.populator";
import { coursePopulator } from "./populators/course.populator";
import { gradePopulator } from "./populators/grade.populator";
import { riskCoursePopulator } from "./populators/risk-course.populator";
import { studentPopulator } from "./populators/student.populator";
import { prisma } from "@/libs/prisma";

class MainSeed {
  start = async () => {
    console.log("####----<><><><> Starting Seed <><><><>----####");

    const populator_list = this.get_populator_list();

    for (const populator of populator_list) {
      await populator();
    }

    console.log("####----<><><><> Seed Finished <><><><>----####");
  };

  get_populator_list = () => {
    const populator_list = [
      academicYearPopulator,
      academicPeriodPopulator,
      studentPopulator,
      coursePopulator,
      gradePopulator,
      riskCoursePopulator,
    ];
    return populator_list;
  };
}

const mainSeed = new MainSeed();

mainSeed
  .start()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
