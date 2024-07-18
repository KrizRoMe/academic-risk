// import WhatsappClient from "@/app/services/whatsapp-client.service";
import { getRiskCourses } from "@/app/services/riskcourse.service";
import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();
    const atRiskCourses = await getRiskCourses();

    const riskCoursesFormatted = atRiskCourses.map((risCourse) => {
      return `* ${risCourse.course}`;
    });

    const message = `Espero que se encuentre bien. Me gustaría informarle sobre el desempeño académico de su hijo/a . Actualmente, el estudiante Cristopher Romero Medrano, esta en riesgo académico en los siguientes cursos: \n\n ${riskCoursesFormatted.join(
      "\n",
    )} \n\n Por favor, comuníquese con el tutor académico de su hijo/a para obtener más información y apoyo. Gracias.`;

    // Logic to send message using Twilio
    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(twilioAccountSid, twilioAuthToken);

    const twilioMessage = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    // Logic to send message using WhatsappClient
    // const formattedPhone = `${phone}@c.us`;
    // await WhatsappClient.sendMessage(formattedPhone, message);

    return NextResponse.json({ twilioMessage });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
