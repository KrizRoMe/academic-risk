import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server"
import twilio from "twilio";

export async function POST(request: Request){
    const {username} = await request.json()
    const verificationCode = Math.floor(Math.random() * 9000) + 1000;

    try {
        const userFound = await prisma.user.update({
            where: {
                username
            },
            data: {
                verificationCode
            }
        })
    } catch (error) {
        console.error(error);
        throw new Error('Error updating verification code')
    }

    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

    try {
        const studentFound = await prisma.student.findFirst({
            where: {
                code: username
            }
        })

        if(!studentFound) throw new Error('Student not found')

        const {phone} = studentFound
        const phoneNumber = `+51${phone}`

        const client = twilio(twilioAccountSid, twilioAuthToken);
        const twilioMessage = await client.messages.create({
          body: `AcademicRisk - Your verification code is ${verificationCode}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phoneNumber,
        });

        return NextResponse.json({status: 200, message: 'Verification code sent'})

      } catch (error) {
        console.error(error);
        throw new Error('Error sending verification code')
      }
}