import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    const {interventionId} = await request.json()

    try {
        const chatMessageList = await prisma.chatMessage.findMany({
            where: {
                InterventionId: interventionId
            }
        });
        return NextResponse.json(chatMessageList);

    } catch (error) {
        console.error(error);
        return NextResponse.json({error});
    }
}