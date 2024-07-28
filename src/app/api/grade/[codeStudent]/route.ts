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

    const gradeList = await prisma.grade.findMany({
      where: {
        studentId: student.id,
      },
    });

    const sum = gradeList.reduce((acc, grade) => acc + grade.value1 + grade.value2 + grade.value3, 0);
    const average = sum / (gradeList.length * 3);

    return NextResponse.json({ gradeList, average });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' });
    }
  }
}