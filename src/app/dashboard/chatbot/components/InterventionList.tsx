"use client"

import { useChat } from "@/context/chatbot.context";
import { Intervention } from "@prisma/client";
import { useEffect, useState } from "react";

enum InterventionType {
  AUTOEVALUATION = "Autoevaluación",
  STUDY_HABITS = "Hábitos de Estudio",
  ACADEMIC_GOALS = "Objetivos Académicos",
}

function InterventionList() {
  const [interventionList, setInterventionList] = useState<Intervention[]>([]);
  const [selectedIntervention, setSelectedIntervention] = useState<Intervention | null>(null);

  const {chats, setIntervention} = useChat();

  const getInterventions = async () => {
    const response = await fetch("/api/chatbot/intervention", {
      method: "GET",
    });
    const data = await response.json();
    setInterventionList(data);
  }

  const getFormattedDate = (date: Date) => {
    const newDate = new Date(date);
    const day = String(newDate.getDate()).padStart(2, '0');
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const year = newDate.getFullYear();
    const hours = String(newDate.getHours()).padStart(2, '0');
    const minutes = String(newDate.getMinutes()).padStart(2, '0');
    const seconds = String(newDate.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const sortedInterventionList = interventionList.sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  const handleInterventionClick = (intervention: Intervention) => {
    setSelectedIntervention(intervention);
    setIntervention(intervention);
  };


  useEffect(() => {
    getInterventions();
  }, [chats]);

  return (
    <div className="no-scrollbar max-h-full space-y-2.5 overflow-auto">
      {sortedInterventionList.map((intervention: Intervention, index) => (
        <div
          key={index}
          className={`flex cursor-pointer items-center rounded px-4 py-2 hover:bg-gray-2 dark:hover:bg-strokedark ${selectedIntervention?.id === intervention.id && "bg-gray-2 dark:bg-strokedark"}`}
          onClick={() => handleInterventionClick(intervention)}
        >
          <div className="w-full">
            <h5 className="text-sm font-medium text-black dark:text-white">
              {InterventionType[intervention.type]}
            </h5>
            <p className="text-sm">{getFormattedDate(intervention.updatedAt)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InterventionList;
