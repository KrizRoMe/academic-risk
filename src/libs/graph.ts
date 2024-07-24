import { getCourses } from "@/app/services/course.service";
import { getGrades } from "@/app/services/grade.service";
import { getRiskCourses } from "@/app/services/riskcourse.service";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "./prisma";

export const getChatCompletion = async (message: string, interventionId: number) => {
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

  // @ts-ignore
  const genAI = new GoogleGenerativeAI(process.env.GEMINY_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const historyChatIntervention = await getHistoryChatIntervention(interventionId);

  const content = `Actúa como un psicologo especialista en tutorías académicas durante una sesión con un alumno universitario. Responde en español al siguiente mensaje: ${message}. Asegúrate de entender el contexto proporcionado: ${JSON.stringify(context)}. Al finalizar tu respuesta, formula una pregunta que fomente una exploración más profunda del tema discutido sin mencionar información confidencial del sistema. Considera que los cursos en riesgo se consideran aquellos con una calificación menor a 10.5, sigue el hilo de esta conversacion: ${JSON.stringify(historyChatIntervention)}.`;

  const result = await model.generateContent(content)
  const response = result?.response
  const responseContent = response.text()

  const responseWithLineBreak = responseContent?.replace(/\n/g, "<br />");
  const responseWithStrokethrough = responseWithLineBreak?.replace(
    /~(.*?)~/g,
    "<s>$1</s>",
  );

  return responseWithStrokethrough;
};

const getHistoryChatIntervention = async (interventionId: number) => {
  const historyChatIntervention = await prisma.chatMessage.findMany({
    where: {
      InterventionId: interventionId,
    },
  });
  return historyChatIntervention;
}

