"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import InterventionList from "./InterventionList";
import { useChat } from "@/context/chatbot.context";
import { Intervention } from "@prisma/client";

function SidebarChat() {
  const { chats } = useChat();
  const [interventionList, setInterventionList] = useState<Intervention[]>([]);

  const getInterventionList = async () => {
    const response = await fetch("/api/chatbot/intervention", {
      method: "GET",
    });
    const interventionList = await response.json();
    setInterventionList(interventionList);
  };

  useEffect(() => {
    getInterventionList();
  }, [chats]);


  return (
    <div className="hidden h-full flex-col xl:flex xl:w-1/4">
      <div className="sticky border-b border-stroke px-6 py-7.5 dark:border-strokedark">
        <h3 className="text-lg font-medium text-black dark:text-white 2xl:text-xl">
          Intervenciones
          <span className="rounded-md border-[.5px] border-stroke bg-gray-2 px-2 py-0.5 text-base font-medium text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-white 2xl:ml-4">
            {interventionList.length}
          </span>
        </h3>
      </div>
      <div className="flex max-h-full flex-col overflow-auto p-5">
        <InterventionList />
      </div>
    </div>
  );
}

export default SidebarChat;
