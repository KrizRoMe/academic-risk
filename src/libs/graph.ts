import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const getChatCompletion = async (message: string) => {
  const context = {};

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Responde en español al siguiente mensaje: ${message} teniendo en cuenta este contexto: ${context}`,
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
