import { getChatCompletion } from "@/libs/graph";
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { userMessage, intervention, isUser } = await request.json();

    if (!intervention || !userMessage)
      return NextResponse.json({ message: "No Intervention and User message provided" });

    try {
      await prisma.chatMessage.create({
        data: {
          content: userMessage,
          is_user_sender: isUser,
          InterventionId: intervention?.id
        }
      })
    } catch (error) {
      console.log(error)
    }


    const chatCompletion = await getChatCompletion(userMessage, intervention?.id);

    try {
      await prisma.chatMessage.create({
        data: {
          content: chatCompletion,
          is_user_sender: false,
          InterventionId: intervention.id
        }
      })
    } catch (error) {
      console.log(error)
    }

    return NextResponse.json(chatCompletion);
  } catch (error) {
    return NextResponse.json(error);
  }
}
