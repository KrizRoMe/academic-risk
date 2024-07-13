import { getCourses } from "@/app/services/course.service";
import { getGrades } from "@/app/services/grade.service";
import { getRiskCourses } from "@/app/services/riskcourse.service";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const getChatCompletion = async (message: string) => {
  const atCourses = await getCourses();
  const atRiskCourses = await getRiskCourses();
  const atNotes = await getGrades();

  const context = {
    courses: atCourses,
    grades: atNotes,
    coursesAtRisk: atRiskCourses,
  };

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Responde en español al siguiente mensaje: ${message} teniendo en cuenta este contexto: ${JSON.stringify(context)}`,
      },
    ],
    model: "llama3-8b-8192",
  });

  const responseContent = chatCompletion.choices[0].message.content;

  const responseWithLineBreak = responseContent?.replace(/\n/g, "<br />");
  const responseWithStrokethrough = responseWithLineBreak?.replace(
    /~(.*?)~/g,
    "<s>$1</s>",
  );

  return responseWithStrokethrough;
};
