import { useSession } from "next-auth/react";
import InterventionTypeCard from "./InterventionTypeCard";
import { useChat } from "@/context/chatbot.context";
import { useEffect, useRef, useState } from "react";

enum InterventionType {
  AUTOEVALUATION = "Autoevaluación",
  STUDY_HABITS = "Hábitos de Estudio",
  ACADEMIC_GOALS = "Objetivos Académicos",
  MOOD_STATE = "Estado de Ánimo",
}

function InterventionTypeList() {
  const { data: session, status }: any = useSession();
  const { chats, addMessage, setIntervention } = useChat();
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

    const { scopePrompt, intervention } = await response.json();
    await handleSubmitChatbot(scopePrompt, intervention);

    SetIsShowInterventionTypeList(false);
    setIntervention(intervention);
  };

  const handleSubmitChatbot = async (
    userMessage: string,
    intervention: any,
  ) => {
    const isUser = false;
    const response = await fetch("/api/chatbot", {
      method: "POST",
      body: JSON.stringify({ userMessage, intervention, isUser }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    addMessage(data, isUser);
  };

  useEffect(() => {
    if (chats.length === 0) {
      SetIsShowInterventionTypeList(true);
    } else {
      SetIsShowInterventionTypeList(false);
    }
  }, [chats]);

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
