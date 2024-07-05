import { getChatCompletion } from "@/libs/graph";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { userMessage } = await request.json();

    if (!userMessage)
      NextResponse.json({ userMessage: "No userMessage provided" });

    const chatCompletion = await getChatCompletion(userMessage);

    return NextResponse.json(chatCompletion);
  } catch (error) {
    return NextResponse.json(error);
  }
}
