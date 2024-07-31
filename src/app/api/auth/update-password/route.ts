import { prisma } from "@/libs/prisma"
import { NextResponse } from "next/server"
import { hashSync } from "bcrypt-ts";

export async function POST(request: Request){
    const {password, confirmPassword, username} = await request.json()

    if(password !== confirmPassword) throw new Error('Passwords do not match')

    const hashedPassword = await hashSync(password, 10);

    const userUpdated = await prisma.user.update({
        where: {
            username
        },
        data: {
            password: hashedPassword
        }
    })

    return NextResponse.json({status: 200, message: 'Password updated'})
}