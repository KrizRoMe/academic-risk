import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    const studentList = await prisma.student.findMany();
    return NextResponse.json(studentList);
}