import { academicPeriodPopulator } from "./populators/academic-period.populator";
import { academicYearPopulator } from "./populators/academic-year.populator";
import { coursePopulator } from "./populators/course.populator";
import { gradePopulator } from "./populators/grade.populator";
import { riskCoursePopulator } from "./populators/risk-course.populator";
import { studentPopulator } from "./populators/student.populator";
import { teacherPopulator } from "./populators/teacher.populator";
import { userPopulator } from "./populators/user.populator";
import { prisma } from "./utils/main.utils";

class MainSeed {
  start = async () => {
    console.log("####----<><><><> Starting Seed --------------");

    const populatorList = this.get_populator_list();

    for (const populator of populatorList) {
      console.log(`####----Populating ${populator.name}`);
      await populator();
    }

    console.log("####----<><><><> Seed Finished --------------");
  };

  get_populator_list = () => {
    const populatorList = [
      academicYearPopulator,
      academicPeriodPopulator,
      studentPopulator,
      teacherPopulator,
      coursePopulator,
      gradePopulator,
      riskCoursePopulator,
      userPopulator,
    ];
    return populatorList;
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
