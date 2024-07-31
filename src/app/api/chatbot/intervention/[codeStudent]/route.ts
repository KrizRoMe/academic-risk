import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req: Request, { params }: { params: { codeStudent: string } }): Promise<NextResponse> {
  const { codeStudent } = params;

  try {
    const student = await prisma.user.findUnique({
      where: {
        username: codeStudent,
      },
    });

    if (!student) {
      return NextResponse.json({ error: `No user found with username: ${codeStudent}` });
    }

    const interventions = await prisma.intervention.findMany({
      where: {
        type: 'MOOD_STATE',
        userId: student.id,
      },
      include: {
        messages: {
          where: {
            is_user_sender: true,
          },
        },
      },
    });

    if (!interventions.length) {
      return NextResponse.json({ error: `No interventions found for user with username: ${codeStudent}` });
    }

    const emotions: { [key: string]: string[] } = {
      'alegria': ['alegre', 'contento', 'feliz'],
      'tristeza': ['triste', 'deprimido', 'desanimado'],
      'enojo': ['enojado', 'furioso', 'irritado'],
      'miedo': ['miedo', 'temeroso', 'asustado'],
      'cansancio': ['cansado', 'agotado', 'fatigado']
    };

    const emotionCount: { [key: string]: number } = Object.keys(emotions).reduce((acc, emotion) => ({ ...acc, [emotion]: 0 }), {});

    interventions.forEach(intervention => {
      const mentionedEmotions = new Set();
      intervention.messages.forEach(message => {
        Object.keys(emotions).forEach(emotion => {
          if (emotions[emotion].some(e => message.content.includes(e)) && !mentionedEmotions.has(emotion)) {
            emotionCount[emotion]++;
            mentionedEmotions.add(emotion);
          }
        });
      });
    });

    return NextResponse.json({ interventions, emotionCount });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' });
    }
  }
}