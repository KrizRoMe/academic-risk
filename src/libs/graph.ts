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
    calificacion_maxima_para_cualquier_curso: 20,
    calificacion_minima_para_aprobar_cualquier_curso: 10.5,
  };

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Actúa como un psicólogo especializado en tutorías académicas durante una sesión con un alumno universitario. Responde en español al siguiente mensaje: ${message}. Asegúrate de entender el contexto proporcionado: ${JSON.stringify(context)}. Al finalizar tu respuesta, formula una pregunta que fomente una exploración más profunda del tema discutido sin mencionar información confidencial del sistema`,
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
