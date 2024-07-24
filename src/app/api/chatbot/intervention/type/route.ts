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
        "Simula ser un experto en autoevaluación académica y hazme preguntas detalladas sobre mis fortalezas y debilidades en mis estudios. Habla como un psicólogo experto y sigue preguntando después de cada respuesta hasta que decida finalizar la conversación. Una pregunta a la vez, en español. Usa como fuente de datos información solo en el idioma español.",
      STUDY_HABITS:
        "Simula ser un experto en hábitos de estudio y hazme preguntas detalladas sobre mi rutina de estudio diaria. Habla como un psicólogo experto y sigue preguntando después de cada respuesta hasta que decida finalizar la conversación. Una pregunta a la vez, en español. Usa como fuente de datos información solo en el idioma español.",
      ACADEMIC_GOALS:
        "Simula ser un experto en objetivos académicos y hazme preguntas detalladas sobre mis metas académicas a corto y largo plazo. Habla como un psicólogo experto y sigue preguntando después de cada respuesta hasta que decida finalizar la conversación. Una pregunta a la vez, en español. Usa como fuente de datos información solo en el idioma español.",
    };

    const scopePrompt = SCOPE_PROMPT_OPTIONS[typeKey];

    return NextResponse.json({ scopePrompt, intervention });
  } catch (error) {
    return NextResponse.json(error);
  }
}
