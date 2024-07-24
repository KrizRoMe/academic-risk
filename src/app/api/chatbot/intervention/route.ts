import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
    const interventionList = await prisma.intervention.findMany();

  return NextResponse.json(interventionList);
}