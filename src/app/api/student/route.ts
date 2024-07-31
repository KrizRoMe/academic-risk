import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    const studentList = await prisma.student.findMany();
    return NextResponse.json(studentList);
}

export async function POST(request: Request){
    const {code} = await request.json();

    try {
        const studentFound = await prisma.student.findFirst({
            where: {code}
        });

        console.log(studentFound);

        return NextResponse.json(studentFound);

    } catch (error) {
        console.error(error);
        return NextResponse.json({status: 400, message: 'Student not found'});
    }
}