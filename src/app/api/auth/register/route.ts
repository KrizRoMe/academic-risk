import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";


export async function POST(request: Request){
    const {name, username, password, dni} = await request.json();

    if (!name || !username || !password)
        return NextResponse.json({message: "Please provide all fields"});

    try {
        const userCreated = await prisma.user.create({
            data: {
                username,
                password
            }
        })
        const studentCreated = await prisma.student.create({
            data: {
                name,
                code:username,
                dni
            }
        });

        console.log(userCreated, studentCreated);
    } catch (error) {
        console.log(error);
    }

    return NextResponse.json({message: "User registered successfully"});
}