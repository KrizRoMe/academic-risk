import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const getChatCompletion = async (message: string) => {
  const chatCompletion = await groq.chat.completions.create({
    messages: [{ role: "user", content: message }],
    model: "llama3-8b-8192",
  });

  return chatCompletion.choices[0].message.content;
};
