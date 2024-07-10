import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const courseList = await prisma.course.findMany(
      {
        select: {
          // Select all other fields of the course
          id: true,
          name: true,
          code: true,
          teacherId: true,
          semester: true,
          // Select only name from the teacher
          teacher: {
            select: {
              name: true,
            },
          },
        },
      }
    );

    console.log(courseList);
    
    return NextResponse.json(courseList);
  } catch (error) {
    return NextResponse.json(error);
  }
}
