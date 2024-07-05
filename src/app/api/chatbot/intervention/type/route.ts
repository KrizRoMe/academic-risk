import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { InterventionType } from "@prisma/client";

export async function POST(request: Request) {
  const TYPE_KEYS_OBJECT: { [key in InterventionType]: string } = {
    AUTOEVALUATION: "Autoevaluación",
    STUDY_HABITS: "Hábitos de Estudio",
    ACADEMIC_GOALS: "Objetivos Académicos",
  };

  try {
    const { type, userId } = await request.json();

    const typeKey = Object.keys(TYPE_KEYS_OBJECT).find(
      (key) => TYPE_KEYS_OBJECT[key as InterventionType] === type,
    ) as InterventionType | undefined;

    if (!typeKey) {
      return NextResponse.json({ message: "Invalid intervention type" });
    }

    const intervention = await prisma.intervention.create({
      data: {
        type: typeKey,
        userId,
      },
    });

    const SCOPE_PROMPT_OPTIONS = {
      AUTOEVALUATION:
        "Hazme preguntas sobre autoevaluación académica simulando ser un experto en el tema. Recuerda seguir haciendo preguntas despeus de cada respuesta que des hasta que el usuario decida finalizar la conversación. Una pregunta a la vez.",
      STUDY_HABITS:
        "Hazme preguntas sobre hábitos de estudio simulando ser un experto en el tema. Recuerda seguir haciendo preguntas despeus de cada respuesta que des hasta que el usuario decida finalizar la conversación. Una pregunta a la vez.",
      ACADEMIC_GOALS:
        "Hazme preguntas sobre objetivos académicos simulando ser un experto en el tema. Recuerda seguir haciendo preguntas despeus de cada respuesta que des hasta que el usuario decida finalizar la conversación. Una pregunta a la vez.",
    };

    const scopePrompt = SCOPE_PROMPT_OPTIONS[typeKey];

    return NextResponse.json({ scopePrompt });
  } catch (error) {
    return NextResponse.json(error);
  }
}
