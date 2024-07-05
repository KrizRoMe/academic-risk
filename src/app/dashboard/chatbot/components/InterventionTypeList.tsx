import { useSession } from "next-auth/react";
import InterventionTypeCard from "./InterventionTypeCard";
import { useChat } from "@/context/chatbot.context";
import { useRef, useState } from "react";

enum InterventionType {
  AUTOEVALUATION = "Autoevaluación",
  STUDY_HABITS = "Hábitos de Estudio",
  ACADEMIC_GOALS = "Objetivos Académicos",
}

function InterventionTypeList() {
  const { data: session, status }: any = useSession();
  const { addMessage } = useChat();
  const [isShowInterventionTypeList, SetIsShowInterventionTypeList] =
    useState<boolean>(true);

  const interventionTypeList = Object.values(InterventionType);

  const handleInterventionTypeSelect = async (type: InterventionType) => {
    const userId = session.user.id;

    const response = await fetch("/api/chatbot/intervention/type", {
      method: "POST",
      body: JSON.stringify({ type, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { scopePrompt } = await response.json();
    await handleSubmitChatbot(scopePrompt);

    SetIsShowInterventionTypeList(false);
  };

  const handleSubmitChatbot = async (userMessage: string) => {
    const response = await fetch("/api/chatbot", {
      method: "POST",
      body: JSON.stringify({ userMessage }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    addMessage(data, false);
  };

  return (
    <>
      {isShowInterventionTypeList && (
        <div className="flex flex-wrap justify-center gap-2">
          {interventionTypeList.map((interventionType) => (
            <InterventionTypeCard
              key={interventionType}
              type={interventionType}
              onSelect={() => {
                handleInterventionTypeSelect(interventionType);
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default InterventionTypeList;
