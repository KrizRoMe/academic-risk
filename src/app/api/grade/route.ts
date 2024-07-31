import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const gradeList = await prisma.grade.findMany();
    return NextResponse.json(gradeList);
  } catch (error) {
    return NextResponse.json(error);
  }
}

