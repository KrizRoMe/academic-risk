import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const courseList = await prisma.course.findMany();
    return NextResponse.json(courseList);
  } catch (error) {
    return NextResponse.json(error);
  }
}
