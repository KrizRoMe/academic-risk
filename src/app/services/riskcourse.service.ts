import { prisma } from "@/libs/prisma";

export async function getRiskCourses() {
  try {
    const riskCourses = await prisma.riskCourse.findMany({
      select: {
        id: true,
        courseId: true,
        academicPeriodId: true,
        failures: true,
        updatedAt: true,
        createdAt: true,
        course: {
          select: {
            name: true,
          },
        },
        academicPeriod: {
          select: {
            semester: true,
            year: {
              select: {
                year: true,
              },
            },
          },
        },
      },
    });

    const flattenedRiskCourses = riskCourses.map((riskCourse) => ({
      ...riskCourse,
      semester: riskCourse.academicPeriod.semester,
      course: riskCourse.course.name,
    }));

    return flattenedRiskCourses;
  } catch (error) {
    throw new Error(`Database error! : ${error}`);
  }
}
type RiskItem = {
  id: number;
  courseId: number;
  academicPeriodId: number;
  value1: number;
  value2: number;
  value3: number;
  updatedAt: Date;
  createdAt: Date;
  course: string;
  courseCode: string;
  semester: number;
  failures: number;
}

export async function getRiskGradesByStudentId(studentCode: string) {

  try {

    const student = await prisma.student.findUnique({
      where: {
        code: studentCode,
      },
    });

    // Si el estudiante no existe, lanzar un error
    if (!student) {
      throw new Error(`No student found with code: ${studentCode}`);
    }

    const grades = await prisma.grade.findMany({
      where: {
        studentId: student.id,
      },
      select: {
        courseId: true,
        academicPeriodId: true,
        value1: true,
        value2: true,
        value3: true,
        updatedAt: true,
        createdAt: true,
        course: {
          select: {
            name: true,
            code: true,
          },
        },
        academicPeriod: {
          select: {
            semester: true,
            year: {
              select: {
                year: true,
              },
            },
          },
        },
      },
    });

    const flattenedGrades = grades.map((grade) => {
      const average = (grade.value1 + grade.value2 + grade.value3) / 3;
      const failures = average < 10.5 ? 1 : 0;

      return {
        ...grade,
        failures: failures,
        semester: grade.academicPeriod.semester,
        course: grade.course.name,
        courseCode: grade.course.code,
      };
    });

    const groupedByCourseCode = flattenedGrades.reduce((acc: Record<string, any>, item) => {
      if (!acc[item.courseCode]) {
        acc[item.courseCode] = { ...item };
      } else {
        acc[item.courseCode].failures += item.failures;
      }
      return acc;
    }, {});

    const groupedRisk = Object.values(groupedByCourseCode);

    const riskWithId = groupedRisk.map((item, index) => ({
      id: index + 1,
      ...item,
    }));

    const filteredRiskWithId: RiskItem[] = riskWithId.filter((item) => item.failures >= 2);

    return filteredRiskWithId;
  } catch (error) {
    throw new Error(`Database error! : ${error}`);
  }
}