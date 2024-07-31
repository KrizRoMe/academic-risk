import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";


export async function POST(request: Request){
    const {name, surname, code, dni, username, phone, password} = await request.json();
    const userWithoutFields = !name || !surname || !code || !dni || !username || !phone || !password;

    if (userWithoutFields)
        throw new Error("Missing fields");

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
                phone
            }
        });

        return NextResponse.json({message: "User registered successfully"});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Error registering user"});
    }
}