import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req: Request, { params }: { params: { codeStudent: string } }): Promise<NextResponse> {
  const { codeStudent } = params;

  try {
    const student = await prisma.student.findUnique({
      where: {
        code: codeStudent,
      },
    });

    if (!student) {
      return NextResponse.json({ error: `No student found with code: ${codeStudent}` });
    }

    const grades = await prisma.grade.findMany({
      where: {
        studentId: student.id,
      },
      select: {
        courseId: true,
        value1: true,
        value2: true,
        value3: true,
        course: {
          select: {
            code: true,
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

    const riskCoursesCount = groupedRisk.filter((item: any) => item.failures >= 2).length;

    return NextResponse.json({ riskCoursesCount });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' });
    }
  }
}