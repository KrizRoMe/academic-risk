"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import InterventionList from "./InterventionList";
import { useChat } from "@/context/chatbot.context";
import { Intervention } from "@prisma/client";
import Link from "next/link";

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
      <a
        href="/dashboard/chatbot/"
        className="inline-flex items-center justify-center gap-2.5 rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-6 xl:px-10 mx-8 mt-4"
      >
        <span>
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-message-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 9h8" /><path d="M8 13h6" /><path d="M12.01 18.594l-4.01 2.406v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5.5" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
        </span>
        Nueva Intervención
      </a>
      <div className="flex max-h-full flex-col overflow-auto p-5">
        <InterventionList />
      </div>
    </div>
  );
}

export default SidebarChat;
