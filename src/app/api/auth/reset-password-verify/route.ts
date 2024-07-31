import { prisma } from "@/libs/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request){
    const {verificationCode, username} = await request.json()


    const userFound = await prisma.user.findFirst({
        where: {username, verificationCode: Number(verificationCode)}
    })

    if(!userFound) return NextResponse.json({status: 400, message: 'Invalid verification code'})

    return NextResponse.json({status: 200, message: 'Verification code is correct'})
}