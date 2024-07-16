import WhatsappClient from "@/app/services/whatsapp-client.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { phone, message } = await request.json();
    console.log({ phone, message });

    const formattedPhone = `${phone}@c.us`;

    await WhatsappClient.sendMessage(formattedPhone, message);

    return NextResponse.json({ message: "Message sent" });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
