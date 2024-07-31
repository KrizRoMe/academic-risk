import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { codeStudent: string } }): Promise<NextResponse> {
    const { codeStudent } = params;

    try {
        const studentFound = await prisma.student.findUnique({
            where: { code: codeStudent}
        });
        return NextResponse.json(studentFound);

    } catch (error) {
        console.error(error);
        return NextResponse.json({status: 400, message: 'Student not found'});
    }

}

export async function PUT(request: Request, { params }: { params: { codeStudent: string } }): Promise<NextResponse> {
    const { codeStudent } = params;
    const { name, surname, dni, phone } = await request.json();

    try {
        const studentUpdated = await prisma.student.update({
            where: { code: codeStudent },
            data: { name, surname, dni, phone }
        });
        return NextResponse.json(studentUpdated);

    } catch (error) {
        console.error(error);
        return NextResponse.json({status: 400, message: 'Student not found'});
    }

}