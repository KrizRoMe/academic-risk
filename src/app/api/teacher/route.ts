import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const teacherList = await prisma.teacher.findMany();
    return NextResponse.json(teacherList);
  } catch (error) {
    return NextResponse.json(error);
  }
}
