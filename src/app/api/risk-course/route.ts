import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const riskCourseList = await prisma.riskCourse.findMany();
    return NextResponse.json(riskCourseList);
  } catch (error) {
    return NextResponse.json(error);
  }
}
