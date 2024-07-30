import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";


export async function POST(request: Request){
    const {name, surname, code, dni, username, password} = await request.json();
    const userWithoutFields = !name || !surname || !code || !dni || !username || !password;

    console.log(name, surname, code, dni, username, password);

    if (userWithoutFields)
        return NextResponse.json({message: "Please provide all fields"});

    try {
        const userCreated = await prisma.user.create({
            data: {
                username,
                password,
            }
        })
        const studentCreated = await prisma.student.create({
            data: {
                name,
                surname,
                code,
                dni,
            }
        });

        return NextResponse.json({message: "User registered successfully"});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Error registering user"});
    }
}